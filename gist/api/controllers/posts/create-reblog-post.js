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
  },


  fn: async function ({postId}, exits) {

    if (postId < 0) {
      throw 'badRequest';
    }
    // Can't reblog your own post or a reblog of your own post
    let posts = await Post.find({
      select: ['slug', 'title', 'contentType', 'rebloggedPost', 'user'],
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
    let newFields = {
      user: this.req.me.id,
      title: post.title,
      contentType: 'reblog',
      slug,
      rebloggedPost: rebloggedPostId
    };
    let newPost = await Post.create(newFields).fetch();
    return exits.success({postId: newPost.id, slug, rebloggedPost: post.id});
  }


};