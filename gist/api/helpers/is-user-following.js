module.exports = {


  friendlyName: 'Is user following',


  description: 'Is current user following specified user',


  inputs: {
    currentUser: {
      type: 'number',
      required: true
    },
    otherUser: {
      type: 'number',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({currentUser, otherUser}) {
    let me = await User.findOne({
      where: {id: currentUser},
      select: []
    }).populate('followed', {
      where: {id: otherUser}
    });
    return me.followed.length > 0;
  }


};

