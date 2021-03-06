/**
 * Post.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    title: {
      type: 'string',
      maxLength: 50,
      description: 'Title of post',
      required: true
    },
    textContent: {
      type: 'string',
      maxLength: 50000,
      description: 'Text content if this is a text post'
    },
    imageContent: {
      type: 'string',
      description: 's3 object path if this is an image post'
    },
    contentType: {
      type: 'string',
      isIn: ['text', 'image', 'reblog'],
      required: true
    },
    slug: {
      type: 'string',
      required: true,
      maxLength: 50
    },
    hotScore: {
      type: 'number',
      defaultsTo: -1
    },
    deletedAt: {
      type: 'number',
      allowNull:  true,
    },
    ip: {
      type: 'string',
      required: true
    },
    reportCount: {
      type: 'number',
      defaultsTo: 0
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    user: {
      model: 'user',
      required: true,
      autoMigrations: { index: true }
    },
    rebloggedPost: {
      model: 'post',
      autoMigrations: { index: true },
      description: 'The post that got reblogged if this is a reblog post'
    },
    postReports: {
      collection: 'postreport',
      via: 'post'
    }
  },

};

