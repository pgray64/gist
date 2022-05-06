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
    try {
      await PostReport.create({
        user: this.req.me.id,
        post: postId,
        textContent
      });
    } catch (e) {
      if (e.code === 'E_UNIQUE') {
        return;
      } else {
        throw e;
      }
    }

    await sails.sendNativeQuery('update post set "reportCount"="reportCount"+1 where id=$1', [postId]);

  }


};
