module.exports = {


  friendlyName: 'View confirm external link',


  description: 'Display "Confirm external link" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/confirm-external-link'
    }

  },


  fn: async function () {
    let url = decodeURIComponent(this.req.query.to || '');
    let urlLower = url.toLowerCase();
    let urlValid = url && sails.helpers.validateUrl.with({url});
    // Respond with view.
    return {
      url: urlValid ? url : '',
      urlValid
    };

  }


};
