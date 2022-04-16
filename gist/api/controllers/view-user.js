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
    let user = await User.findOne({select: ['displayUsername'], where: {username}});
    if (!user) {
      throw 'notFound';
    }
    let posts = await Post.find({
      select: ['title', 'textContent', 'imageContent', 'contentType'],
      where: {
        user: user.id,
      },
      limit: sails.config.custom.userListPostsPerPage,
      sort: 'id desc'
    })
    // Respond with view.
    return {
      user,
      posts,
      imageBaseUrl: sails.config.custom.userContentS3EdgeUrl
    };

  }


};
