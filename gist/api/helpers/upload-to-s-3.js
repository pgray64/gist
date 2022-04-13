const {S3Client, PutObjectAclCommand, DeleteObjectCommand} = require('@aws-sdk/client-s3');
module.exports = {


  friendlyName: 'Upload to s3',


  description: 'Upload a file to s3 object storage',


  inputs: {
    fileToUpload: {
      type: 'ref',
      required: true
    },
    s3Origin: {
      type: 'string',
      required: true
    },
    bucketName: {
      type: 'string',
      required: true
    },
    dirName: {
      type: 'string',
      required: true,
    },
    isPublic: {
      type: 'boolean',
      required: true
    },
    maxFileSizeBytes: {
      type: 'number',
      required: true
    },
    allowedFileTypes: {
      type: 'ref',
      description: 'array of allowed filetypes in mimetype format, e.g. ["image/jpg"]'
    }
  },


  exits: {

    success: {
      description: 'File uploaded successfully.',
    },
    uploadFailed : {
      description: 'File upload failed.'
    },
    maxFileSizeExceeded: {
      description: 'File is too large to upload.'
    },
    fileTypeNotAllowed: {
      description: 'File type is not allowed.'
    }
  },


  fn: async function ({fileToUpload, s3Origin, bucketName, isPublic, dirName, maxFileSizeBytes, allowedFileTypes}) {
    const s3Client = new S3Client({
      endpoint: 'https://' + s3Origin, // Find your endpoint in the control panel, under Settings. Prepend "https://".
      region: sails.config.custom.s3Region, // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (e.g. nyc3).
      credentials: {
        accessKeyId: sails.config.custom.s3Key, // Access key pair. You can create access key pairs using the control panel or API.
        secretAccessKey: sails.config.custom.s3Secret // Secret access key defined through an environment variable.
      }
    });
    /* let util = require('util');
    sails.log.info('fileToUpload: ' + util.inspect(fileToUpload)); */
    let opts = {
      key: sails.config.custom.s3Key,
      secret: sails.config.custom.s3Secret,
      endpoint: s3Origin,
      bucket: bucketName,
      dirname: dirName,
      headers: {}
    };
    let result = await sails.uploadOne(fileToUpload, opts);
    if (!result) {
      throw 'fileUploadFailed';
    }
    if (result.size > maxFileSizeBytes) {
      const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: result.fd
      });
      await s3Client.send(command);
      throw 'maxFileSizeExceeded';
    }
    if (allowedFileTypes && allowedFileTypes.indexOf(result.type.toLowerCase()) < 0) {
      const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: result.fd
      });
      await s3Client.send(command);
      throw 'fileTypeNotAllowed';
    }
    if (isPublic) {
      const command = new PutObjectAclCommand({
        ACL: 'public-read',
        Bucket: bucketName,
        Key: result.fd
      });
      await s3Client.send(command);
    }
    return result;
  }


};

