const sharp = require("sharp");
module.exports = {


  friendlyName: 'Convert image',


  description: '',


  inputs: {
    sourceStream: {
      description: 'Image stream to convert',
      type: 'ref',
      required: true
    },
    outputFileType: {
      description: 'Optional file type to convert to, e.g. "jpeg", "png", "gif". Will use input file type otherwise',
      type: 'string',
      isIn: ['jpeg', 'png', 'gif'],
      required: true
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({sourceStream, outputFileType}) {
    let converter;
    let sharp = require('sharp');
    switch (outputFileType) {
      case 'jpeg':
        converter = sharp().jpeg();
        break;
      case 'png':
        converter = sharp().png();
        break;
      case 'gif':
        converter = sharp({ animated: true }).gif();
        break;
      default:
        throw new Error('file type not supported');
    }
    return sourceStream._files[0].stream.pipe(converter);
  }


};

