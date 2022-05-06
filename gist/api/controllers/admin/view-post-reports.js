module.exports = {


  friendlyName: 'View post reports',


  description: 'Display "Post reports" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/admin/post-reports'
    }

  },


  fn: async function () {
    let id = parseInt(this.req.param('id'));
    if (!id || id < 1) {
      throw 'notFound';
    }
    let post = await Post.findOne({where: {id}}).populate('user');
    return {
      post
    };

  }


};
