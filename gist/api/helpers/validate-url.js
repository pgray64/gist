module.exports = {


  friendlyName: 'Validate url',


  description: 'return true if url is valid',
  sync: true,

  inputs: {
    url: {
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: function ({url}) {
    if (!url) {
      return false;
    }
    url = url.toLowerCase();
    if (!url.startsWith('http://') &&  !url.startsWith('https://')) {
      return false;
    }
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  }


};

