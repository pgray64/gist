module.exports = {


  friendlyName: 'Create reblog post',


  description: 'Create a post that is a reblog of another post',


  inputs: {
    postId: {
      type: 'string',
      required: true
    }
  },


  exits: {
    badRequest: {
      statusCode: 400,
      description: 'Bad request'
    },
    notFound: {
      statusCode: 404,
      description: 'Not found'
    },
    emailNotVerified: {
      statusCode: 403,
      description: 'Email is not verified'
    }
  },


  fn: async function ({postId}, exits) {

    if (postId < 0) {
      throw 'badRequest';
    }
    if (this.req.me.emailStatus !== 'confirmed') {
      throw 'emailNotVerified';
    }
    // Can't reblog your own post or a reblog of your own post
    let posts = await Post.find({
      select: ['slug', 'title', 'contentType', 'rebloggedPost', 'user',],
      where: {id: postId}
    }).populate('rebloggedPost');
    if (posts.length === 0) {
      throw 'notFound';
    }
    let post = posts[0];

    if (!post.user || post.user === this.req.me.id || (post.rebloggedPost && post.rebloggedPost.user === this.req.me.id)) {
      throw 'badRequest';
    }
    // We rely on unique constraint: UQ_post_user_rebloggedPost to prevent double reblogging
    let slug = post.slug;
    let rebloggedPostId = post.contentType === 'reblog' ? post.rebloggedPost.id : post.id;
    let rebloggedHotScore = sails.helpers.posts.getHotScore.with({currentScore: -1});
    let newFields = {
      user: this.req.me.id,
      title: post.title,
      contentType: 'reblog',
      slug,
      rebloggedPost: rebloggedPostId,
      hotScore: rebloggedHotScore,
      ip: this.req.ip
    };
    let newPost = await Post.create(newFields).fetch();

    // Add to reblogged post's hot score.
    let rebloggedPost = await Post.findOne({
      select: ['hotScore'],
      where: {id: rebloggedPostId}
    });
    let originalPostHotScore = sails.helpers.posts.getHotScore.with({currentScore: rebloggedPost.hotScore});
    await Post.update({id: rebloggedPostId}).set({hotScore: originalPostHotScore});
    return exits.success({postId: newPost.id, slug});
  }


};
