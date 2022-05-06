module.exports = {


  friendlyName: 'Submit post report',


  description: '',


  inputs: {
    postId : {
      type: 'number',
      required: true
    },
    textContent: {
      type: 'string',
      required: true
    }
  },


  exits: {
    badRequest: {
      statusCode: 400,
      description: 'Bad request'
    },
  },


  fn: async function ({postId, textContent}) {

    await PostReport.create({
      user: this.req.me.id,
      post: postId,
      textContent
    }).intercept('E_UNIQUE', () => {
      // They already reported this post - they don't need to know we are discarding the new one
      this.res.sendStatus(200);
    });
    await sails.sendNativeQuery('update post set "reportCount"="reportCount"+1 where id=$1', [postId]);

  }


};
