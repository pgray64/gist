/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
  'GET /':                   { action: 'view-homepage-or-redirect' },
  'GET /welcome/:unused?':   { action: 'dashboard/view-welcome' },

  /*'GET /faq':                { action:   'view-faq' },*/
  'GET /legal/terms':        { action:   'legal/view-terms' },
  'GET /legal/privacy':      { action:   'legal/view-privacy' },
  /*'GET /contact':            { action:   'view-contact' },*/

  'GET /signup':             { action: 'entrance/view-signup' },
  'GET /email/confirm':      { action: 'entrance/confirm-email' },
  'GET /email/confirmed':    { action: 'entrance/view-confirmed-email' },

  'GET /login':              { action: 'entrance/view-login' },
  'GET /password/forgot':    { action: 'entrance/view-forgot-password' },
  'GET /password/new':       { action: 'entrance/view-new-password' },

  'GET /account':            { action: 'account/view-account-overview' },
  'GET /account/password':   { action: 'account/view-edit-password' },
  'GET /account/profile':    { action: 'account/view-edit-profile' },

  'GET /posts/create-post': { action: 'posts/view-create-post' },
  'GET /post/:id/:slug': { action: 'view-post' },
  'GET /:username': { action: 'view-user' },

  'GET /posts/trending': { action: 'posts/view-trending' },
  'GET /confirm-external-link': { action: 'view-confirm-external-link' },
  'GET /users/following': { action: 'users/view-followed-users' },

  // Admin pages
  'GET /admin/home': { action: 'admin/view-home' },
  'GET /admin/post-reports/:id': { action: 'admin/view-post-reports' },

  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗   ┬   ╔╦╗╔═╗╦ ╦╔╗╔╦  ╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗  ┌┼─   ║║║ ║║║║║║║║  ║ ║╠═╣ ║║╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝  └┘   ═╩╝╚═╝╚╩╝╝╚╝╩═╝╚═╝╩ ╩═╩╝╚═╝
  '/terms':                   '/legal/terms',
  '/logout':                  '/api/v1/account/logout',


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝
  // …


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the Parasails library, or by using those method names as the `action` in <ajax-form>.
  '/api/v1/account/logout':                           { action: 'account/logout' },
  'PUT   /api/v1/account/update-password':            { action: 'account/update-password' },
  'PUT   /api/v1/account/update-profile':             { action: 'account/update-profile' },
  'PUT   /api/v1/account/update-billing-card':        { action: 'account/update-billing-card' },
  'PUT   /api/v1/entrance/login':                        { action: 'entrance/login' },
  'POST  /api/v1/entrance/signup':                       { action: 'entrance/signup' },
  'POST  /api/v1/entrance/send-password-recovery-email': { action: 'entrance/send-password-recovery-email' },
  'POST  /api/v1/entrance/update-password-and-login':    { action: 'entrance/update-password-and-login' },
  /*'POST  /api/v1/deliver-contact-form-message':          { action: 'deliver-contact-form-message' },*/
  'POST  /api/v1/observe-my-session':                 { action: 'observe-my-session', hasSocketFeatures: true },
  'POST /api/v1/posts/create-post': { action: 'posts/create-post' },
  'POST /api/v1/posts/create-image-post': { action: 'posts/create-image-post' },
  'GET /api/v1/posts/list-user-posts': { action: 'posts/list-user-posts' },
  'GET /api/v1/posts/list-post-comments': { action: 'posts/list-post-comments' },
  'POST /api/v1/posts/add-post-comment': { action: 'posts/add-post-comment' },
  'POST /api/v1/create-reblog-post': { action: 'posts/create-reblog-post' },
  'GET /api/v1/list-trending-posts': { action: 'posts/list-trending-posts' },
  'PATCH /api/v1/users/update-follow-user': { action: 'users/update-follow-user' },
  'POST /api/v1/posts/list-followed-posts': { action: 'posts/list-followed-posts' },
  'DELETE /api/v1/posts/delete-post': { action: 'posts/delete-post' },
  'DELETE /api/v1/posts/delete-post-comment': { action: 'posts/delete-post-comment' },
  'GET /api/v1/users/list-followed-users': { action: 'users/list-followed-users' },
  'POST /api/v1/posts/submit-post-report': { action: 'posts/submit-post-report' },

  // Admin endpoints
  'POST /api/v1/admin/admin-list-users': { action: 'admin/admin-list-users' },
  'POST /api/v1/admin/admin-set-user-banned': { action: 'admin/admin-set-user-banned' },
  'POST /api/v1/admin/admin-purge-user': { action: 'admin/admin-purge-user' },
  'POST /api/v1/admin/admin-list-banned-emails': { action: 'admin/admin-list-banned-emails' },
  'POST /api/v1/admin/admin-set-email-banned': { action: 'admin/admin-set-email-banned' },
  'POST /api/v1/admin/admin-list-banned-ips': { action: 'admin/admin-list-banned-ips' },
  'POST /api/v1/admin/admin-set-ip-banned': { action: 'admin/admin-set-ip-banned' },
  'POST /api/v1/admin/admin-list-reported-posts': { action: 'admin/admin-list-reported-posts' },
  'POST /api/v1/admin/admin-clear-post-reports': { action: 'admin/admin-clear-post-reports' },
  'POST /api/v1/admin/admin-delete-post': { action: 'admin/admin-delete-post' },
  'POST /api/v1/admin/admin-list-reports': { action: 'admin/admin-list-reports' },

};
