module.exports = {


  friendlyName: 'Admin clear post reports',


  description: 'Admin clear the report count for a specified post',


  inputs: {
    postId: {
      type: 'number',
      required: true
    }
  },


  exits: {

  },


  fn: async function ({postId}) {

    await Post.update({id: postId}).update({reportCount: 0});

  }


};
