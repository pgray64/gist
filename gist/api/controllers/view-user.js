module.exports = {


  friendlyName: 'View user',


  description: 'Display "User" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/user'
    },
    notFound: {
      viewTemplatePath: '404'
    }

  },


  fn: async function () {
    let username = this.req.param('username') || '';
    username = username.toLowerCase();
    let usernameIsValid = await sails.helpers.validateUsername(username);
    if (!usernameIsValid) {
      throw 'notFound';
    }
    let user = await User.findOne({select: ['displayUsername', 'username'], where: {username}});
    if (!user) {
      throw 'notFound';
    }
    const perPage = sails.config.custom.userListPostsPerPage;
    let {posts, hasMore} = await sails.helpers.listPosts.with({userId: user.id, page: 0, type: 'user'});

    // If logged in, see if we are following this user
    let isFollowing = false;
    if (this.req.me && this.req.me.id) {
      let me = await User.findOne({
        where: {id: this.req.me.id},
        select: []
      }).populate('followed', {
        where: {id: user.id}
      });
      isFollowing = me.followed.length > 0;
    }
    // Respond with view.
    return {
      user,
      posts,
      imageBaseUrl: sails.config.custom.userContentS3EdgeUrl,
      pageSize: perPage,
      hasMore,
      isFollowing
    };

  }


};
