module.exports = {


  friendlyName: 'Is email banned',


  description: '',


  inputs: {
    emailAddress: {
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({emailAddress}) {
    let baseEmail = sails.helpers.getBaseEmail.with({emailAddress});
    if ((await BannedEmailAddress.count({emailAddress: baseEmail}) > 0)) {
      return true;
    }
    return false;
  }


};

