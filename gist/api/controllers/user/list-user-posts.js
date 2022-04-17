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
    const perPage = sails.config.custom.userListPostsPerPage;
    let posts = await Post.find({
      select: ['title', 'textContent', 'imageContent', 'contentType'],
      where: {
        user: userId,
      },
      limit: perPage + 1,
      sort: 'id desc',
      skip: page * perPage
    })
    let hasMore = posts.length > perPage
    return {
      posts: posts.slice(0, perPage),
      hasMore
    };
  }


};
