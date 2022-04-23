module.exports = {


  friendlyName: 'List posts',


  description: '',


  inputs: {
    userId: {
      type: 'number',
    },
    page: {
      type: 'number',
      required: true,
      description: '0-indexed page number for results'
    },
    type: {
      type: 'string',
      isIn: ['user', 'trending'],
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },
    badArguments: {
      description: 'Specify a userId if for type=user'
    }

  },


  fn: async function ({userId, page, type}) {
    const perPage = sails.config.custom.userListPostsPerPage;
    let whereClause;
    let sortClause;
    if (type === 'user') {
      whereClause = {user: userId};
      sortClause = 'id desc';
    } else {
      whereClause = undefined;
      sortClause = 'hotScore desc';
    }
    let rawPosts = await Post.find({
      select: ['title', 'textContent', 'imageContent', 'contentType', 'slug', 'rebloggedPost', 'hotScore'],
      where: whereClause,
      limit: perPage + 1,
      sort: sortClause,
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

