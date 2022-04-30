module.exports = {


  friendlyName: 'View followed users',


  description: 'Display "Followed users" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/users/followed-users'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
