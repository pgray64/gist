module.exports = {


  friendlyName: 'Is email or IP banned',


  description: '',


  inputs: {
    emailAddress: {
      type: 'string',
      required: true
    },
    ipAddress: {
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({emailAddress, ipAddress}) {
    let baseEmail = sails.helpers.getBaseEmail.with({emailAddress});
    if ((await BannedEmailAddress.count({emailAddress: baseEmail}) > 0)) {
      return true;
    }
    let ipBans = await BannedIP.find({ipAddress});
    if (ipBans.length === 0) {
      return false;
    }
    let ipBan = ipBans[0];

    if (ipBan.expiresAt === 0) {
      return true;
    }
    return ipBans[0].expiresAt >= Date.now();
  }


};

