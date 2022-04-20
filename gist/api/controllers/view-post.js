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
    let slug = this.req.param('slug');
    if (!id || id < 1 || !slug) {
      throw 'notFound';
    }
    let post = await Post.findOne({
      where: {id, slug},
      select: ['title', 'textContent', 'imageContent', 'contentType', 'createdAt', 'user']
    }).populate('user');
    if (!post) {
      throw 'notFound';
    }
    let imageUrl;
    let canReblog = false;
    if (post.contentType === 'image') {
      let path = require('path');
      imageUrl = path.join(sails.config.custom.userContentS3EdgeUrl, post.imageContent);
    }
    if (post.contentType !== 'reblog' && this.req.me && this.req.me.id) {
      let existingReblog = await Post.find({
        select: [],
        where: {rebloggedPost: id, user: this.req.me.id}
      });
      canReblog = existingReblog.length < 1;
    }
    return {
      id,
      title: post.title,
      textContent: post.textContent,
      imageUrl: imageUrl,
      contentType: post.contentType,
      createdAt: post.createdAt,
      userId: post.user.id,
      username: post.user.displayUsername,
      canReblog
    };

  }
};
