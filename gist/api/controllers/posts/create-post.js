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

    maxTextSizeExceeded: {
      statusCode: 400,
      description: 'Text content is too long.'
    },
    badRequest: {
      statusCode: 400,
      description: 'Bad request'
    },
    emailNotVerified: {
      statusCode: 403,
      description: 'Email is not verified.'
    },
    tooSoon: {
      status: 429,
      description: 'Posting rate limit exceeded'
    }
  },


  fn: async function ({title, textContent}, exits) {
    if (this.req.me.emailStatus !== 'confirmed') {
      throw 'emailNotVerified';
    }
    // We check this before and after sanitization on purpose. Don't want to waste CPU cycles
    // parsing massive html doc
    if (textContent.length > sails.config.custom.userMaxPostTextLength) {
      throw 'maxTextSizeExceeded';
    }
    let slug = sails.helpers.posts.createPostSlug.with({title});
    let hotScore = sails.helpers.posts.getHotScore.with({currentScore: -1});

    let untilCanPost = await sails.helpers.posts.userCanPost.with({userId: this.req.me.id});
    if (untilCanPost > 0) {
      return exits.tooSoon({waitTime: untilCanPost});
    }

    //************** Danger Zone ******************
    //* Must store white-list sanitized textContent
    //*********************************************
    let sanitizedTextContent = sails.helpers.sanitizeHtml.with({unsafeHtml: textContent});
    if (sanitizedTextContent.length > sails.config.custom.userMaxPostTextLength) {
      throw 'maxTextSizeExceeded';
    }
    let newFields = {
      user: this.req.me.id,
      title,
      textContent: sanitizedTextContent,
      contentType: 'text',
      slug,
      hotScore,
      ip: this.req.ip
    };
    let newPost = await Post.create(newFields).fetch();
    return exits.success({postId: newPost.id, slug});
  }


};
