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
    let post = await Post.findOne({
      where: {id: postId, user: {'!=': this.req.me.id}}
    });
    if (!post) {
      throw 'notFound';
    }
    // We rely on unique constraint: UQ_post_user_rebloggedPost to prevent double reblogging
    let slug = post.slug;
    let newFields = {
      user: this.req.me.id,
      title: post.title,
      contentType: 'reblog',
      slug,
      rebloggedPost: post.id
    };
    let newPost = await Post.create(newFields).fetch();
    return exits.success({postId: newPost.id, slug, rebloggedPost: post.id});
  }


};
