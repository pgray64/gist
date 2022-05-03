module.exports = {


  friendlyName: 'List User Posts',


  description: 'Get posts for user.',


  inputs: {
    userId: {
      required: true,
      type: 'number'
    },
    page: {
      required: true,
      type: 'number'
    }
  },


  exits: {
    success: {
      description: 'User posts retrieved'
    },
  },


  fn: async function ({userId, page}) {

    if (userId < 0 || page < 0) {
      return [];
    }
    let {posts, hasMore} = await sails.helpers.posts.listPosts.with({userId, page, type: 'user'});
    return {
      posts,
      hasMore
    };
  }


};
