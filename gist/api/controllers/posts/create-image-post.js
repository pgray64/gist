module.exports = {


  friendlyName: 'Create image post',


  description: '',

  files: ['imageFile'],
  inputs: {
    title: {
      required: true,
      type: 'string'
    },
    imageFile: {
      required: true,
      example: '==='
    }
  },


  exits: {
    success: {
      description: 'Post created'
    },
    uploadFailed : {
      statusCode: 500,
      description: 'File upload failed.'
    },
    maxFileSizeExceeded: {
      statusCode: 400,
      description: 'File is too large to upload.'
    },
    fileTypeNotAllowed: {
      statusCode: 400,
      description: 'File type is not allowed.'
    },
    badRequest: {
      statusCode: 400,
      description: 'Bad request'
    },
    emailNotVerified: {
      statusCode: 403,
      description: 'Email is not verified'
    }
  },


  fn: async function ({title, priceUsd, imageFile}, exits) {
    if (this.req.me.emailStatus !== 'confirmed') {
      throw 'emailNotVerified';
    }
    if (!imageFile || imageFile.isNoop) {
      throw 'badRequest';
    }
    let result = await sails.helpers.uploadToS3.with({
      fileToUpload: imageFile,
      s3Origin: sails.config.custom.s3Endpoint,
      bucketName: sails.config.custom.userContentS3Bucket,
      isPublic: true,
      dirName: this.req.me.id + '/images',
      maxFileSizeBytes: sails.config.custom.userMaxPostImageSizeBytes,
      allowedFileTypes: sails.config.custom.userPostAllowedFiletypes
    }).intercept((err) => {
      if (err.code === 'fileTypeNotAllowed') {
        return 'fileTypeNotAllowed';
      } else if (err.code === 'maxFileSizeExceeded') {
        return 'maxFileSizeExceeded';
      }
      return err;
    });

    let newFields = {
      user: this.req.me.id,
      title,
      imageContent: result.fd,
      contentType: 'image'
    };
    let newPost = await Post.create(newFields).fetch();
    return exits.success({postId: newPost.id});

  }


};
