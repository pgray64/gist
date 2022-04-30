module.exports = {


  friendlyName: 'List followed users',


  description: 'List the users that current user follows',


  inputs: {
    page: {
      type: 'number',
      required: true
    }
  },


  exits: {

  },


  fn: async function ({page}) {
    const perPage = sails.config.custom.followedUsersPerPage;
    let limitClause = perPage + 1;
    let offsetClause = page * perPage;
    let user = await User.findOne({
      where: {id: this.req.me.id},
      select: []
    }).populate('followed', {
      limit: limitClause,
      skip: offsetClause,
      sort: 'id desc'
    });
    let rawFollowed = user.followed;
    let hasMore = rawFollowed.length > perPage;
    rawFollowed = rawFollowed.slice(0, perPage);
    let followed = rawFollowed.map(function(f) {
      return {
        id: f.id,
        displayUsername: f.displayUsername,
        username: f.username
      };
    });
    return {
      followedUsers: followed,
      hasMore
    };
  }


};
