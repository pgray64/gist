module.exports = {


  friendlyName: 'Admin set ip banned',


  description: '',


  inputs: {
    ipAddress: {
      type: 'string',
      required: true
    },
    isBanned: {
      type: 'boolean',
      required: true
    },
    durationDays: {
      type: 'number',
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


  fn: async function ({ipAddress, isBanned, durationDays}) {

    if (!ipAddress) {
      throw 'badRequest';
    }
    await BannedIP.destroy({ipAddress});
    if (isBanned) {
      let expiresAt = durationDays > 0 ? (Date.now() + 1000 * 60 * 60 * 24 * durationDays) : 0;
      try {
        await BannedIP.create({ipAddress, expiresAt})
      } catch (e) {
        if (e.code === 'E_UNIQUE') {
          return;
        } else {
          throw e;
        }
      }
;
    }
  }


};
