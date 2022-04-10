module.exports = {


  friendlyName: 'View create post',


  description: 'Display "Create post" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/posts/create-post'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
