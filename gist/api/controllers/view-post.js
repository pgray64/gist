module.exports = {


  friendlyName: 'View post',


  description: 'Display "Post" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/post'
    },
    notFound: {
      viewTemplatePath: '404'
    }
  },


  fn: async function () {
    let id = parseInt(this.req.param('id'));
    if (!id || id < 1) {
      throw 'notFound';
    }
    let post = await Post.findOne({
      where: {id},
      select: ['title', 'textContent', 'imageContent', 'contentType', 'createdAt', 'user']
    }).populate('user');
    if (!post) {
      throw 'notFound';
    }
    return {
      id,
      title: post.title,
      textContent: post.textContent,
      imageContent: post.imageContent,
      contentType: post.contentType,
      createdAt: post.createdAt,
      userId: post.user.id,
      username: post.user.displayUsername
    };

  }
};
