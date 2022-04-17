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
    let comments = await PostComment.find({
      select: ['textContent', 'user'],
      where: {
        post: postId
      },
      limit: perPage + 1,
      sort: 'id desc',
      skip: page * perPage
    })
    let hasMore = comments.length > perPage
    return {
      posts: comments.slice(0, perPage),
      hasMore
    };

  }


};
