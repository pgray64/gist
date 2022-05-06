module.exports = {


  friendlyName: 'Admin list reports',


  description: '',


  inputs: {
    postId: {
      type: 'number',
      required: true
    },
    page: {
      type: 'number',
      required: true
    }
  },


  exits: {

  },


  fn: async function ({postId, page}) {
    const perPage = 20;
    let reports = await PostReport.find({
      where: {post: postId},
      limit: perPage + 1,
      skip: page * perPage,
      sort: 'id desc'
    }).populate('user');
    let hasMore = reports.length > perPage;
    return {
      reports: reports.slice(0, perPage),
      hasMore
    };

  }


};
