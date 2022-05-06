module.exports = {


  friendlyName: 'Admin delete post',


  description: '',


  inputs: {
    postId: {
      type: 'number',
      required: true
    }
  },


  exits: {
    deleteFailed: {
      statusCode: 500,
      description: 'Failed to delete'
    }
  },


  fn: async function ({postId}) {

    let deletedPosts = await Post.update({ where: { id: postId }}).set({deletedAt: Date.now()}).fetch();
    if (deletedPosts.length < 1) {
      throw 'deleteFailed';
    }
    let deletedPost = deletedPosts[0];
    if (deletedPost.contentType === 'image') {
      await sails.helpers.deleteFromS3.with({
        s3Origin: sails.config.custom.s3Endpoint,
        bucketName: sails.config.custom.userContentS3Bucket,
        objectPath: deletedPost.imageContent
      });
    }

  }


};
