module.exports = {


  friendlyName: 'Create post slug',


  description: '',


  inputs: {
    title: {
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({title}) {
    let slug = (title || '').replace(/[^0-9a-zA-Z]/g, ' ').trim();
    let parts = slug.split(' ');
    slug = parts.filter(c => c).join('-')
    slug = slug.slice(0, 50);
    return slug.length > 0 ? slug : '0';
  }


};

