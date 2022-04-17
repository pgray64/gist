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
  },


  fn: async function ({postId, textContent}, exits) {

    let newFields = {
      user: this.req.me.id,
      post: postId,
      textContent
    };
    let newComment = await PostComment.create(newFields).fetch();
    return exits.success({commentId: newComment.id});
  }


};
