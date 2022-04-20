module.exports = {


  friendlyName: 'List user posts',


  description: '',


  inputs: {
    userId: {
      type: 'number',
      required: true
    },
    page: {
      type: 'number',
      required: true,
      description: '0-indexed page number for results'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({userId, page}) {
    const perPage = sails.config.custom.userListPostsPerPage;
    let rawPosts = await Post.find({
      select: ['title', 'textContent', 'imageContent', 'contentType', 'slug', 'rebloggedPost'],
      where: {
        user: userId,
      },
      limit: perPage + 1,
      sort: 'id desc',
      skip: page * perPage
    }, {rebloggedPost: true})
    let hasMore = rawPosts.length > perPage;
    rawPosts = rawPosts.slice(0, perPage);
    let posts = rawPosts.map(function(p) {
      return {
        id: p.id,
        title: p.title,
        textContent: p.textContent,
        imageContent: p.imageContent,
        contentType: p.contentType,
        slug: p.slug,
        rebloggedPost: p.rebloggedPost ? {
          id: p.rebloggedPost.id,
          title: p.rebloggedPost.title,
          textContent: p.rebloggedPost.textContent,
          imageContent: p.rebloggedPost.imageContent,
          contentType: p.rebloggedPost.contentType,
          slug: p.rebloggedPost.slug,
          user: p.user
        } : undefined
      };
    });
    return {posts, hasMore};
  }


};

