const sanitizeHtml = require("sanitize-html");
const URL = require("url").URL;
module.exports = {


  friendlyName: 'Sanitize html',


  description: 'Return sanitized html',
  sync: true,


  inputs: {
    unsafeHtml: {
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: function ({unsafeHtml}) {
    let sanitizedHtml = sanitizeHtml(unsafeHtml,
      {
        allowProtocolRelative: false,
        allowedSchemes: [ 'https', 'http' ],
        transformTags: {
          'a': function(tagName, attribs) {
            let isValid = sails.helpers.validateUrl.with({url: attribs.href});
            return {
              tagName:  isValid ? 'a' : 'span',
              attribs: isValid ? {
                href: getLinkUrl(attribs.href)
              } : {}
            };},
        }
      });
    return sanitizedHtml;
  }

};
function getLinkUrl(url) {
  let urlLower = url.toLowerCase();
  const baseDomain = sails.config.custom.baseDomain;
  if (urlLower === `https://${baseDomain}` || urlLower === `http://${baseDomain}` || urlLower.startsWith(`https://${baseDomain}/`) || urlLower.startsWith(`http://${baseDomain}/`)) {
    return url;
  }
  return '/confirm-external-link?to=' + encodeURIComponent(url);
}

