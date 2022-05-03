module.exports = {


  friendlyName: 'Admin purge user',


  description: '',


  inputs: {
    userId: {
      type: 'number',
      required: true
    },
  },


  exits: {

  },


  fn: async function ({userId}) {

    let deletedPosts = await Post.update({user: userId}).set({deletedAt: Date.now()}).fetch();
    if (deletedPosts.length === 0) {
      return;
    }
    let deletedObjectIds = deletedPosts.filter(p => p.imageContent).map(p => p.imageContent);
    await sails.helpers.deleteMultiFromS3.with({
      s3Origin: sails.config.custom.s3Endpoint,
      bucketName: sails.config.custom.userContentS3Bucket,
      objectPaths: deletedObjectIds
    });

  }


};
