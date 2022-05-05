module.exports = {


  friendlyName: 'Get base email',


  description: 'Get base email, removing things like appended pluses and casing that all resolve to same email account',


  inputs: {
    emailAddress: {
      type: 'string',
      required: true
    }
  },
  sync: true,


  exits: {

    success: {
      outputFriendlyName: 'Base email',
    },
    invalidEmail: {
      description: 'Provided email is invalid',
    }

  },


  fn: function ({emailAddress}) {

    let emailLower = emailAddress.toLowerCase().trim();
    let parts = emailLower.split('@');
    if (parts.length < 2) {
      return emailLower;
    }
    let domain = parts[1];
    let left = parts[0].replace(/\./g,'');
    let leftParts = left.split('+');
    if (leftParts.length < 1) {
      return emailLower;
    }
    return leftParts[0] + '@' + domain;

  }


};

