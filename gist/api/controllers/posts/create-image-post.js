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
    },
    imageType: {
      required: true,
      isIn: sails.config.custom.userPostAllowedFiletypes,
      description: 'mimetype for image that we do not trust, but will force re-encode to'
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
    },
    tooSoon: {
      status: 429,
      description: 'Posting rate limit exceeded'
    }
  },


  fn: async function ({title, priceUsd, imageFile, imageType}, exits) {
    if (this.req.me.emailStatus !== 'confirmed') {
      throw 'emailNotVerified';
    }
    if (!imageFile || imageFile.isNoop) {
      throw 'badRequest';
    }
    let untilCanPost = await sails.helpers.posts.userCanPost.with({userId: this.req.me.id});
    if (untilCanPost > 0) {
      return exits.tooSoon({waitTime: untilCanPost});
    }
    let outputFileType;
    let outputExt;
    if (imageType === 'image/gif') {
      outputFileType = 'gif';
      outputExt = '.gif';
    } else {
      outputFileType = 'jpeg';
      outputExt = '.jpg';
    }
    let convertedImage = await sails.helpers.convertImage.with({
      sourceStream: imageFile,
      outputFileType
    });
    let result = await sails.helpers.uploadToS3.with({
      fileToUpload: convertedImage,
      s3Origin: sails.config.custom.s3Endpoint,
      bucketName: sails.config.custom.userContentS3Bucket,
      isPublic: true,
      dirName: this.req.me.id + '/images',
      maxFileSizeBytes: sails.config.custom.userMaxPostImageSizeBytes,
      forcedExtension: outputExt
    }).intercept((err) => {
      if (err.code === 'fileTypeNotAllowed') {
        return 'fileTypeNotAllowed';
      } else if (err.code === 'maxFileSizeExceeded') {
        return 'maxFileSizeExceeded';
      }
      return 'uploadFailed';
    });
    let slug = sails.helpers.posts.createPostSlug.with({title});
    let hotScore = sails.helpers.posts.getHotScore.with({currentScore: -1});
    let newFields = {
      user: this.req.me.id,
      title,
      imageContent: result.fd,
      contentType: 'image',
      slug,
      hotScore,
      ip: this.req.ip
    };
    let newPost = await Post.create(newFields).fetch();
    return exits.success({postId: newPost.id, slug});

  }


};
