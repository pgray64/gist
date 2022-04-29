const sanitizeHtml = require("sanitize-html");
module.exports = {


  friendlyName: 'Sanitize html',


  description: 'Return sanitized html',


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


  fn: async function ({unsafeHtml}) {
    let sanitizedHtml = sanitizeHtml(unsafeHtml,
      {
        allowProtocolRelative: false,
        allowedSchemes: [ 'https', 'http' ],
        transformTags: {
          'a': function(tagName, attribs) {
            let isValid = isUrlValid(attribs.href);
            return {
              tagName:  isValid ? 'a' : 'span',
              attribs: isValid ? {
                href: '/confirm-external-link/' + encodeURIComponent(attribs.href)
              } : {}
            };},
        }
      });
    return sanitizedHtml;
  }


};
function isUrlValid(url) {
  if (!url) {
    return false;
  }
  url = url.toLowerCase();
  return url.startsWith('http://') || url.startsWith('https://');
}
