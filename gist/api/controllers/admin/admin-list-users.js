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
      select: ['emailAddress', 'emailStatus', 'fullName', 'isSuperAdmin', 'displayUsername', 'isBanned' ],
      sort: 'id desc',
      limit: 50
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
