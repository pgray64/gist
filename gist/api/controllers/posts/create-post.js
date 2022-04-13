module.exports = {


  friendlyName: 'Create post',


  description: 'Create a text post',


  inputs: {
    title: {
      required: true,
      type: 'string'
    },
    textContent: {
      required: true,
      type: 'string'
    }
  },


  exits: {
    success: {
      description: 'Post created'
    }
  },


  fn: async function ({title, textContent}, exits) {

    let newFields = {
      user: this.req.me.id,
      title,
      textContent,
      contentType: 'text'
    };
    let newPost = await Post.create(newFields).fetch();
    return exits.success({postId: newPost.id})
  }


};
