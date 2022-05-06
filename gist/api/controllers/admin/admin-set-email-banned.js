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
    },
    success: {
      statusCode: 200,
      description: 'Email banned successfully or was already banned'
    }
  },


  fn: async function ({emailAddress, isBanned}) {

    if (!emailAddress) {
      throw 'badRequest';
    }
    let baseEmail = sails.helpers.getBaseEmail.with({emailAddress});
    if (isBanned) {
      try {
        await BannedEmailAddress.create({emailAddress: baseEmail});
      } catch (e) {
        if (e.code === 'E_UNIQUE') {
          return;
        } else {
          throw e;
        }
      }



    } else {
      await BannedEmailAddress.destroy({emailAddress: baseEmail});
    }
  }


};
