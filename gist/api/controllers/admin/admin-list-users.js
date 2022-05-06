module.exports = {


  friendlyName: 'Admin list users',


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
      select: ['emailAddress', 'emailStatus', 'fullName', 'isSuperAdmin', 'displayUsername', 'isBanned', 'tosAcceptedByIp' ],
      sort: 'id desc',
      limit: 12
    };
    if (filter) {
     query.where = { username: { contains: filter.toLowerCase()}};
    }
    let users = await User.find(query);
    return {
      users
    }
  }


};
