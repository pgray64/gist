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
    let path = require('path');
    let id = parseInt(this.req.param('id'));
    let slug = this.req.param('slug');
    if (!id || id < 1 || !slug) {
      throw 'notFound';
    }
    let post = await Post.findOne({
      where: {id, slug, deletedAt: null},
      select: ['title', 'textContent', 'imageContent', 'contentType', 'createdAt', 'user', 'rebloggedPost', 'ip']
    }, {user: true});
    if (!post) {
      throw 'notFound';
    }
    let imageUrl;

    let isReblog = post.contentType === 'reblog';
    let rawRebloggedPost;
    if (isReblog) {
      rawRebloggedPost = await Post.findOne({
        where: {id: post.rebloggedPost},
        select: ['title', 'textContent', 'imageContent', 'contentType', 'createdAt', 'user', 'slug', 'deletedAt', 'ip']
      }, {user: true});
    }
    if (post.contentType === 'image') {
      imageUrl = path.join(sails.config.custom.userContentS3EdgeUrl, post.imageContent);
    }

    let canReblog = true; // Not logged-in user can click reblog, but will be redirected to login
    let canComment = (!this.req.me || !this.req.me.id) || this.req.me.emailStatus === 'confirmed'; // same for comments
    let isFollowing = false;

    if (this.req.me && this.req.me.id) {
      // If logged in, see if we are following this user
      isFollowing = await sails.helpers.isUserFollowing.with({currentUser: this.req.me.id, otherUser: post.user.id});
      // Can't reblog your own post or a reblog of your own post
      if (post.user.id === this.req.me.id || (post.rebloggedPost && post.rebloggedPost.user === this.req.me.id) ||
        this.req.me.emailStatus !== 'confirmed') {
        canReblog = false;
      }
      if (canReblog) {
        // Can only reblog a post once, including reblogs of that post
        let reblogIds = isReblog ? post.rebloggedPost.id : id;
        let existingReblogs = await Post.find({
          select: [],
          where: {rebloggedPost: reblogIds, user: this.req.me.id}
        });
        canReblog = existingReblogs.length === 0;
      }
    }
    let rebloggedPost = null;
    if (isReblog) {
      rebloggedPost = {
        id: rawRebloggedPost.id,
        slug: rawRebloggedPost.slug,
        title: rawRebloggedPost.title,
        isDeleted: rawRebloggedPost.deletedAt,
        textContent: rawRebloggedPost.deletedAt ? '' : rawRebloggedPost.textContent,
        imageUrl: rawRebloggedPost.deletedAt ? '' : path.join(sails.config.custom.userContentS3EdgeUrl, rawRebloggedPost.imageContent),
        contentType: rawRebloggedPost.contentType,
        createdAt: rawRebloggedPost.createdAt,
        userId: rawRebloggedPost.user.id,
        username: rawRebloggedPost.user.displayUsername,
        ip: (this.req.me && this.req.me.isSuperAdmin) ? rawRebloggedPost.ip : null
      }
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
      canReblog,
      rebloggedPost,
      canComment,
      isFollowing,
      ip: (this.req.me && this.req.me.isSuperAdmin) ? post.ip : null
    };

  }
};
