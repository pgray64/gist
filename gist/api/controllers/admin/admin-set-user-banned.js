module.exports = {


  friendlyName: 'Admin set user banned',


  description: '',


  inputs: {
    userId: {
      type: 'number',
      required: true
    },
    isBanned: {
      type: 'boolean',
      required: true
    }
  },


  exits: {

  },


  fn: async function ({userId, isBanned}) {

    await User.updateOne({id: userId}).set({isBanned});

  }


};
