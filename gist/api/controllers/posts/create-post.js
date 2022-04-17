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
    let newFields = {
      user: this.req.me.id,
      title,
      textContent,
      contentType: 'text',
      slug
    };
    let newPost = await Post.create(newFields).fetch();
    return exits.success({postId: newPost.id, slug})
  }


};
