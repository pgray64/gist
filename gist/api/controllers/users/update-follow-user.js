module.exports = {


  friendlyName: 'Update follow user',


  description: '',


  inputs: {
    userId: {
      required: true,
      type: 'number'
    },
    isFollowing: {
      required: true,
      type: 'boolean'
    }
  },


  exits: {
    badRequest: {
      statusCode: 400,
      description: 'Bad request'
    },
  },


  fn: async function ({userId, isFollowing}) {
    // We let the FKs prevent double following or following non-existent user
    if (userId === this.req.me.id) {
      throw 'badRequest'
    }
    if (isFollowing) {
      await User.addToCollection(this.req.me.id, 'followed', userId);
    } else {
      await User.removeFromCollection(this.req.me.id, 'followed', userId);
    }
  }


};
