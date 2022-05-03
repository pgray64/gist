const {S3Client, DeleteObjectCommand, DeleteObjectsCommand} = require("@aws-sdk/client-s3");
const batchSize = 1000;
module.exports = {


  friendlyName: 'Delete multi from S3',


  description: '',


  inputs: {
    s3Origin: {
      type: 'string',
      required: true
    },
    bucketName: {
      type: 'string',
      required: true
    },
    objectPaths: {
      type: 'ref',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },
    deleteFailed : {
      description: 'Failed to delete file.'
    },

  },


  fn: async function ({s3Origin, bucketName, objectPaths}) {
    const s3Client = new S3Client({
      endpoint: 'https://' + s3Origin,
      region: sails.config.custom.s3Region,
      credentials: {
        accessKeyId: sails.config.custom.s3Key,
        secretAccessKey: sails.config.custom.s3Secret
      }
    });

    let objectKeys = objectPaths.map(function(o) {
      return {Key: o};
    });
    while (objectKeys.length > 0) {
      let keysToDelete = objectKeys.splice(0, batchSize);
      const command = new DeleteObjectsCommand({
        Bucket: bucketName,
        Delete: {Objects: keysToDelete, Quiet: true},
      });
      await s3Client.send(command);
    }


  }


};

