module.exports = {


  friendlyName: 'Add post comment',


  description: '',


  inputs: {
    postId : {
      type: 'number',
      required: true
    },
    textContent: {
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {
      description: 'Comment created'
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


  fn: async function ({postId, textContent}, exits) {
    if (postId < 0) {
      throw 'badRequest';
    }
    if (this.req.me.emailStatus !== 'confirmed') {
      throw 'emailNotVerified';
    }
    let newFields = {
      user: this.req.me.id,
      post: postId,
      textContent
    };
    let newComment = await PostComment.create(newFields).fetch();
    return exits.success({commentId: newComment.id});
  }


};
