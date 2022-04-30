module.exports = {


  friendlyName: 'View home',


  description: 'Display "Home" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/admin/home'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
