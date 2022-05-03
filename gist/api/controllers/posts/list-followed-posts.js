module.exports = {


  friendlyName: 'List posts from users followed by current user',


  description: '',


  inputs: {
    page: {
      required: true,
      type: 'number'
    }
  },


  exits: {
    success: {
      description: 'Posts retrieved'
    },
  },


  fn: async function ({page}) {

    if (page < 0) {
      return [];
    }
    let {posts, hasMore} = await sails.helpers.posts.listPosts.with({userId: this.req.me.id, page, type: 'followedByUser'});
    return {
      posts,
      hasMore
    };

  }
};
