module.exports = {


  friendlyName: 'Admin list reported posts',


  description: '',


  inputs: {
  },


  exits: {

  },


  fn: async function () {
    let reportedPosts = await Post.find({
      where: {deletedAt: null},
      sort: 'reportCount desc',
      select: ['title', 'reportCount'],
      limit: 20
    }).populate('postReports', {
      limit: 20, // Don't need to see a huge amount of report text to see if they are worth investigating
      sort: 'id desc'
    });
    return {
      reportedPosts
    };
  }


};
