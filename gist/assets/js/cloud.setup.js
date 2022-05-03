/**
 * cloud.setup.js
 *
 * Configuration for this Sails app's generated browser SDK ("Cloud").
 *
 * Above all, the purpose of this file is to provide endpoint definitions,
 * each of which corresponds with one particular route+action on the server.
 *
 * > This file was automatically generated.
 * > (To regenerate, run `sails run rebuild-cloud-sdk`)
 */

Cloud.setup({

  /* eslint-disable */
  methods: {"confirmEmail":{"verb":"GET","url":"/email/confirm","args":["token"]},"logout":{"verb":"GET","url":"/api/v1/account/logout","args":[]},"updatePassword":{"verb":"PUT","url":"/api/v1/account/update-password","args":["password"]},"updateProfile":{"verb":"PUT","url":"/api/v1/account/update-profile","args":["fullName","emailAddress"]},"updateBillingCard":{"verb":"PUT","url":"/api/v1/account/update-billing-card","args":["stripeToken","billingCardLast4","billingCardBrand","billingCardExpMonth","billingCardExpYear"]},"login":{"verb":"PUT","url":"/api/v1/entrance/login","args":["emailAddress","password","rememberMe"]},"signup":{"verb":"POST","url":"/api/v1/entrance/signup","args":["emailAddress","username","password","fullName"]},"sendPasswordRecoveryEmail":{"verb":"POST","url":"/api/v1/entrance/send-password-recovery-email","args":["emailAddress"]},"updatePasswordAndLogin":{"verb":"POST","url":"/api/v1/entrance/update-password-and-login","args":["password","token"]},"observeMySession":{"verb":"POST","url":"/api/v1/observe-my-session","args":[],"protocol":"io.socket"},"createPost":{"verb":"POST","url":"/api/v1/posts/create-post","args":["title","textContent"]},"createImagePost":{"verb":"POST","url":"/api/v1/posts/create-image-post","args":["title","imageFile","imageType"]},"listUserPosts":{"verb":"GET","url":"/api/v1/posts/list-user-posts","args":["userId","page"]},"listPostComments":{"verb":"GET","url":"/api/v1/posts/list-post-comments","args":["postId","page"]},"addPostComment":{"verb":"POST","url":"/api/v1/posts/add-post-comment","args":["postId","textContent"]},"createReblogPost":{"verb":"POST","url":"/api/v1/create-reblog-post","args":["postId"]},"listTrendingPosts":{"verb":"GET","url":"/api/v1/list-trending-posts","args":["page"]},"updateFollowUser":{"verb":"PATCH","url":"/api/v1/users/update-follow-user","args":["userId","isFollowing"]},"listFollowedPosts":{"verb":"POST","url":"/api/v1/posts/list-followed-posts","args":["page"]},"deletePost":{"verb":"DELETE","url":"/api/v1/posts/delete-post","args":["postId"]},"deletePostComment":{"verb":"DELETE","url":"/api/v1/posts/delete-post-comment","args":["commentId"]},"listFollowedUsers":{"verb":"GET","url":"/api/v1/users/list-followed-users","args":["page"]},"adminListUsers":{"verb":"POST","url":"/api/v1/admin/admin-list-users","args":["filter"]},"adminSetUserBanned":{"verb":"POST","url":"/api/v1/admin/admin-set-user-banned","args":["userId","isBanned"]},"adminPurgeUser":{"verb":"POST","url":"/api/v1/admin/admin-purge-user","args":["userId"]}}
  /* eslint-enable */

});
