module.exports = {


  friendlyName: 'List post comments',


  description: '',


  inputs: {
    postId : {
      type: 'number',
      required: true
    },
    page: {
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      description: 'Comments retrieved'
    },
  },


  fn: async function ({postId, page}) {

    if (postId < 0 || page < 0) {
      return [];
    }
    const perPage = sails.config.custom.userListCommentsPerPage;
    let rawComments = await PostComment.find({
      select: ['textContent', 'user', 'createdAt'],
      where: {
        post: postId
      },
      limit: perPage + 1,
      sort: 'id desc',
      skip: page * perPage
    }).populate('user');
    let hasMore = rawComments.length > perPage;
    let comments = rawComments.slice(0, perPage).map(function(c) {
      return {
        id: c.id,
        textContent: c.textContent,
        username: c.user.username,
        displayUsername: c.user.displayUsername,
        createdAt: c.createdAt
      }
    });
    return {
      comments,
      hasMore
    };

  }


};
