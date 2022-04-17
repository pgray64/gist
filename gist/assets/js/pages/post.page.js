parasails.registerPage('post', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    commentList: [],
    addingComment: false,
    submittingComment: false,
    newCommentContent: '',
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    //…
  },
  mounted: async function() {
    //…
  },
  computed: {
    isLoggedIn: function() {
      return !!this.me && this.me.id
    }
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    getUserUrl: function(username) {
      return '/' + username;
    },
    cancelAddComment: function() {
      this.addingComment = false;
      this.newCommentContent = '';
    },
    showAddComment() {
      if (!this.isLoggedIn) {
        window.location = '/login';
      }
      this.addingComment = true;
    },
    submitComment: async function() {
      if (!this.newCommentContent) {
        return;
      }
      this.submittingComment = true;
      let newComment = await Cloud.addPostComment(this.id, this.newCommentContent);
      this.submittingComment = false;
      this.commentList.push({
        id: newComment.id,
        textContent: this.newCommentContent,
        user: {
          id: this.me.id,
          username: this.me.username,
          displayUsername: this.me.displayUsername
        }
      });
      this.cancelAddComment();
    }
  }
});
