parasails.registerPage('post', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    commentList: [],
    addingComment: false,
    submittingComment: false,
    newCommentContent: '',
    commentsLoading: true,
    commentsPage: 0,
    hasMoreComments: false
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: async function() {

  },
  mounted: async function() {
    let result = await Cloud.listPostComments(this.id, 0);
    this.hasMoreComments = result.hasMore;
    this.commentList = result.comments;
    this.commentsLoading = false;
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
      this.commentList.unshift({
        id: newComment.id,
        textContent: this.newCommentContent,
        username: this.me.username,
        displayUsername: this.me.displayUsername
      });
      this.cancelAddComment();
    },
    loadComments: async function() {
      this.commentsLoading = true;
      this.commentsPage++;
      let result = await Cloud.listPostComments(this.id, this.commentsPage);
      this.hasMoreComments = result.hasMore;
      let newCommentElemId = 'comment_' + result.comments[0].id;
      this.commentList = this.commentList.concat(result.comments);
      this.commentsLoading = false;


      // scroll to new results
      await Vue.nextTick();
      let element = document.getElementById(newCommentElemId);
      element.scrollIntoView();
    }
  }
});
