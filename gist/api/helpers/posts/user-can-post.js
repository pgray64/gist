const minuteMs = 1000 * 60;
const hourMs = 1000 * 60 * 60;
module.exports = {


  friendlyName: 'User can post',


  description: 'Return amount of time until user can make a content post',


  inputs: {
    userId: {
      type: 'number',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({userId}) {
    let postsPerHour = sails.config.custom.userPostsPerHour;
    let posts = await Post.find({ where:{user: userId}, select: ['createdAt'], sort: 'id desc', limit: postsPerHour});
    if (posts.length === 0) {
      return 0;
    }
    sails.log.info('pcount ' + posts.length);
    sails.log.info('since last: ' + Date.now() - posts[0].createdAt)
    // Minute between posts
    if (Date.now() - posts[0].createdAt < minuteMs) {
      return minuteMs - (Date.now() - posts[0].createdAt);
    }
    if (posts.length === postsPerHour && Date.now() - posts[postsPerHour - 1].createdAt < hourMs) {
      return hourMs - (Date.now() - posts[postsPerHour - 1].createdAt);
    }
    return 0;
  }


};

