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
    hasMoreComments: false,
    submittingReblog: false,
    deleteConfirming: false,
    deleteSyncing: false,
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
    },
    isOwnPost: function() {
      return this.isLoggedIn && this.me.id === this.userId;
    },
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    getUserUrl: function(username) {
      return '/' + username;
    },
    getOriginalUserUrl: function() {
      return '/' + this.rebloggedPost.username;
    },
    getImageUrl: function() {
      return this.rebloggedPost ? this.rebloggedPost.imageUrl : this.imageUrl;
    },
    getTextContent: function() {
      return this.rebloggedPost ? this.rebloggedPost.textContent : this.textContent;
    },
    getOriginalUrl: function() {
      return '/post/' + this.rebloggedPost.id + '/' + this.rebloggedPost.slug;
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
        id: newComment.commentId,
        textContent: this.newCommentContent,
        username: this.me.username,
        displayUsername: this.me.displayUsername,
        createdAt: Date.now(),
        user: this.me.id
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
    },
    reblog: async function() {
      if (!this.isLoggedIn) {
        window.location = '/login';
        return;
      }
      this.submittingReblog = true;
      let result = await Cloud.createReblogPost(this.id);
      window.location = '/post/' + result.postId + '/' + result.slug;
    },
    openDeleteConfirmation() {
      this.deleteConfirming = true;
    },
    cancelDelete() {
      this.deleteConfirming = false;
    },
    async performDelete() {
      this.deleteSyncing = true;
      await Cloud.deletePost(this.id);
      window.location = this.getUserUrl(this.me.username);
    },
    openCommentDeleteConfirmation(comment) {
      let commentIndex = this.commentList.findIndex(function(c) { return c.id === comment.id; } );
      comment.deleteConfirming = true;
      Vue.set(this.commentList, commentIndex, comment); // Vue detection of changes to elements inside array sucks
    },
    cancelCommentDelete(comment) {
      let commentIndex = this.commentList.findIndex(function(c) { return c.id === comment.id; } );
      comment.deleteConfirming = false;
      Vue.set(this.commentList, commentIndex, comment);
    },
    isOwnComment(comment) {
      return this.isLoggedIn && this.me.id === comment.user;
    },
    async performCommentDelete(comment) {
      comment.deleteSyncing = true;
      await Cloud.deletePostComment(comment.id);
      let commentIndex = this.commentList.findIndex(function(c) { return c.id === comment.id; } );
      comment.deleteSyncing = true;
      Vue.set(this.commentList, commentIndex, comment);

      if (commentIndex >= 0) {
        this.commentList.splice(commentIndex, 1);
      }
    }
  }
});
