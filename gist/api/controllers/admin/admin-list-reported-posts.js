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
      select: ['title', 'reportCount', 'slug'],
      limit: 25
    });
    return {
      reportedPosts
    };
  }


};
