module.exports = {


  friendlyName: 'Admin list banned emails',


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
      select: ['emailAddress', 'createdAt' ],
      sort: 'id desc',
      limit: 50
    };
    if (filter) {
      query.where = { emailAddress: { contains: filter.toLowerCase()}};
    }
    let emails = await BannedEmailAddress.find(query);
    return {
      emails
    }

  }


};
