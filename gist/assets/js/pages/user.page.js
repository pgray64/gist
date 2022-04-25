parasails.registerPage('user', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    page: 0,
    loading: false,
    loadingFollow: false,
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
    },
    isSelf: function() {
      return this.me && this.me.id === this.user.id;
    }
  },
  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    async loadPosts() {
      this.loading = true;
      this.page++;
      let result = await Cloud.listUserPosts(this.user.id, this.page);
      this.hasMore = result.hasMore;
      this.posts = this.posts.concat(result.posts);
      this.loading = false;
    },
    async setFollowUser(newVal) {
      this.loadingFollow = true;
      await Cloud.updateFollowUser(this.user.id, newVal);
      this.isFollowing = newVal;
      this.loadingFollow = false;
    }
  }
});
