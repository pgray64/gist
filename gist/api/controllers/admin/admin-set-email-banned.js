module.exports = {


  friendlyName: 'Admin set email banned',


  description: '',


  inputs: {
    emailAddress: {
      type: 'string',
      required: true
    },
    isBanned: {
      type: 'boolean',
      required: true
    }
  },


  exits: {
    badRequest: {
      statusCode: 400,
      description: 'Bad request'
    }
  },


  fn: async function ({emailAddress, isBanned}) {

    if (!emailAddress) {
      throw 'badRequest';
    }
    let baseEmail = sails.helpers.getBaseEmail.with({emailAddress});
    if (isBanned) {

      await BannedEmailAddress.create({emailAddress: baseEmail});


    } else {
      await BannedEmailAddress.destroy({emailAddress: baseEmail});
    }
  }


};
