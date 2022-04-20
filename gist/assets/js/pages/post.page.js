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
    }
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
    },
    reblog: async function() {
      if (!this.isLoggedIn) {
        window.location = '/login';
        return;
      }
      this.submittingReblog = true;
      let result = await Cloud.createReblogPost(this.id);
      window.location = '/post/' + result.postId + '/' + result.slug;
    }
  }
});
