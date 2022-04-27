module.exports = {


  friendlyName: 'Delete post comment',


  description: 'Delete a comment from a post',


  inputs: {
    commentId: {
      type: 'number',
      required: true
    }
  },


  exits: {

  },


  fn: async function ({commentId}) {

    await PostComment.destroy({id: commentId, user: this.req.me.id});

  }


};
