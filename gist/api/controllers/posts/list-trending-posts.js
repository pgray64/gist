module.exports = {


  friendlyName: 'List trending posts',


  description: '',


  inputs: {
    page: {
      required: true,
      type: 'number'
    }
  },


  exits: {
    success: {
      description: 'Trending posts retrieved'
    },
  },


  fn: async function ({page}) {

    if (page < 0) {
      return [];
    }
    let {posts, hasMore} = await sails.helpers.listPosts.with({page, type: 'trending'});
    return {
      posts,
      hasMore
    };

  }


};
