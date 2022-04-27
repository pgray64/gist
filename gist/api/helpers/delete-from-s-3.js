const {S3Client, DeleteObjectCommand} = require("@aws-sdk/client-s3");
module.exports = {


  friendlyName: 'Delete from S3',


  description: 'Delete a file from S3',


  inputs: {
    s3Origin: {
      type: 'string',
      required: true
    },
    bucketName: {
      type: 'string',
      required: true
    },
    objectPath: {
      type: 'string',
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


  fn: async function ({s3Origin, bucketName, objectPath}) {
    const s3Client = new S3Client({
      endpoint: 'https://' + s3Origin,
      region: sails.config.custom.s3Region,
      credentials: {
        accessKeyId: sails.config.custom.s3Key,
        secretAccessKey: sails.config.custom.s3Secret
      }
    });
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: objectPath
    });
    await s3Client.send(command);

  }


};

