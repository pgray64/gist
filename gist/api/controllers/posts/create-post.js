module.exports = {


  friendlyName: 'Create post',


  description: 'Create a text post',


  inputs: {
    title: {
      required: true,
      type: 'string'
    },
    textContent: {
      required: true,
      type: 'string'
    }
  },


  exits: {
    success: {
      description: 'Post created'
    },
    uploadFailed : {
      statusCode: 500,
      description: 'File upload failed.'
    },
    maxFileSizeExceeded: {
      statusCode: 400,
      description: 'File is too large to upload.'
    },
    fileTypeNotAllowed: {
      statusCode: 400,
      description: 'File type is not allowed.'
    },
    badRequest: {
      statusCode: 400,
      description: 'Bad request'
    },
    emailNotVerified: {
      statusCode: 403,
      description: 'Email is not verified'
    }
  },


  fn: async function ({title, textContent}, exits) {
    if (this.req.me.emailStatus !== 'confirmed') {
      throw 'emailNotVerified';
    }
    let slug = await sails.helpers.createPostSlug.with({title});
    let hotScore = await sails.helpers.getHotScore.with({currentScore: -1});

    //************** Danger Zone ******************
    //* Must store white-list sanitized textContent
    //*********************************************
    let sanitizedTextContent = await sails.helpers.sanitizeHtml.with({unsafeHtml: textContent});

    let newFields = {
      user: this.req.me.id,
      title,
      textContent: sanitizedTextContent,
      contentType: 'text',
      slug,
      hotScore
    };
    let newPost = await Post.create(newFields).fetch();
    return exits.success({postId: newPost.id, slug});
  }


};
