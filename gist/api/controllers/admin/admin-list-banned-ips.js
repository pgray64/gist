module.exports = {


  friendlyName: 'Admin list banned ips',


  description: '',


  inputs: {
    filter: {
      type: 'string'
    }
  },


  exits: {

  },


  fn: async function ({filter}) {

    let query = {
      select: ['ipAddress', 'createdAt', 'expiresAt' ],
      sort: 'id desc',
      limit: 12
    };
    if (filter) {
      query.where = { ipAddress: { contains: filter.toLowerCase()}};
    }
    let ipAddresses = await BannedIP.find(query);
    return {
      ipAddresses
    }

  }


};
