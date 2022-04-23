module.exports = {


  friendlyName: 'View trending',


  description: 'Display "Trending" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/posts/trending'
    }

  },


  fn: async function () {

    // Respond with view.
    return {
      imageBaseUrl: sails.config.custom.userContentS3EdgeUrl,
    };

  }


};
