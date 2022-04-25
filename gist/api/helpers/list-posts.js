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
      isIn: ['user', 'trending', 'followedByUser'],
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },
    badArguments: {
      description: 'Specify a userId if for type=user or type=followedByUser'
    }

  },


  fn: async function ({userId, page, type}) {
    const perPage = sails.config.custom.userListPostsPerPage;

    let whereClause;
    let sortClause;
    let limitClause = perPage + 1;
    let offsetClause = page * perPage;
    let selectClause =  ['title', 'textContent', 'imageContent', 'contentType', 'slug', 'rebloggedPost', 'hotScore'];
    if (type === 'user' || type === 'followedByUser') {
      if (!userId) {
        throw 'badArguments';
      }
      whereClause = {user: userId};
      sortClause = 'id desc';
    } else if (type === 'trending') {
      whereClause = undefined;
      sortClause = 'hotScore desc';
    }
    let rawPosts;
    if (type === 'followedByUser') {
      let result =  await sails.sendNativeQuery('select p.id from user_followed__user_followed_user ufu inner join post p on p.user = ufu.user_followed_user where ufu.user_followed=$1 order by p.id desc limit $2 offset $3',
        [userId, limitClause, offsetClause]);
      let postIds = result.rows.map(r => r.id);
      rawPosts = await Post.find({where: { id: postIds }, select: selectClause, limit: limitClause,
        sort: sortClause,
        skip: offsetClause}, {rebloggedPost: true});

    } else {
      rawPosts = await Post.find({
        select: selectClause,
        where: whereClause,
        limit: limitClause,
        sort: sortClause,
        skip: offsetClause
      }, {rebloggedPost: true})
    }

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

