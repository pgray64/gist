module.exports = {


  friendlyName: 'Validate username',


  description: '',
  sync: true,

  inputs: {
    username: {
      type: 'string'
    }
  },


  exits: {

    success: {
      description: 'Whether or not username is valid',
    },

  },


  fn: function ({username}, exits) {
    let isValid = username &&
      username.length >= sails.config.custom.usernameMinLength &&
      username.length <= sails.config.custom.usernameMaxLength &&
      /^[0-9a-zA-Z]+$/.test(username);
    if (!isValid) {
      return exits.success(false);
    }
    let usernameLowerCase = username.toLowerCase();
    let isAllowed = !sails.config.custom.disallowedUsernames[usernameLowerCase] &&
      usernameLowerCase.indexOf('gist') < 0;
    return exits.success(isAllowed);
  }


};

