parasails.registerPage('post-reports', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    reportsLoading: true,
    reports: [],
    page: -1,
    hasMore: false,
    loadingAction: false,
    banDurationDays: 0
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    //…
  },
  mounted: async function() {
    await this.loadReports();
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    async loadReports() {
      this.page++;
      this.reportsLoading = true;
      let result = await Cloud.adminListReports(this.post.id, this.page);
      this.reports = result.reports;
      this.hasMore = result.hasMore;
      this.reportsLoading = false;
    },
    async clearReports() {
      showConfirm('Clear post reports', 'Are you sure you want to clear reports for the post "' + this.post.title + '"? ', 'Submit', 'warning')
        .then(async (result) => {
          if (result.isConfirmed) {
            this.loadingAction = true;
            try {
              await Cloud.adminClearPostReports(this.post.id);
              showToast('Cleared post reports successfully', 'success');
              this.reports.splice(0, this.reports.length)
            } catch (e) {
              showToast('Failed to clear postReports', 'error');
            }
            this.loadingAction = false;
          }
        });

    },
    async deletePost() {
      showConfirm('Delete post', 'Are you sure you want to delete the post: "' + this.post.title + '"? ', 'Delete post', 'warning')
        .then(async (result) => {
          if (result.isConfirmed) {
            this.loadingAction = true;
            try {
              await Cloud.adminDeletePost(this.post.id);
              showToast('Post deleted successfully', 'success');
            }
            catch (e) {
              showToast('Failed to delete post', 'error');
            }
            this.loadingAction = false;
          }
        });
    },
    async banIP() {
      this.ipToBanInvalid = false;
      showConfirm('Ban IP', 'Are you sure you want to ban the IP "' + this.post.ip + '"? ', 'Submit', 'warning')
        .then(async (result) =>  {
          if (result.isConfirmed) {
            this.loadingAction = true;
            try {
              await Cloud.adminSetIpBanned(this.post.ip, true, this.banDurationDays);
              showToast('IP banned successfully', 'success');
            } catch (e) {
              showToast('Failed to ban IP', 'error');
            }

            this.loadingAction = false;
          }
        });
    },
    async banEmail() {
      showConfirm('Ban email', 'Are you sure you want to ban the email "' + this.post.user.emailAddress + '"? ', 'Submit', 'warning')
        .then(async (result) =>  {
          if (result.isConfirmed) {
            this.loadingAction = true;
            try {
              await Cloud.adminSetEmailBanned(this.post.user.emailAddress, true);
              showToast('Email banned successfully', 'success');
            } catch (e) {
              showToast('Failed to ban email', 'error');
            }

            this.loadingAction = false;
          }
        });
    },
    async banUser() {
      showConfirm('Ban user', 'Are you sure you want to ban the user "' + this.post.user.displayUsername + '"? ', 'Submit', 'warning')
        .then(async (result) => {
          if (result.isConfirmed) {
            this.loadingAction = true;
            try {
              await Cloud.adminSetUserBanned(this.post.user.id, true);
              showToast('User banned successfully', 'success');
            } catch (e) {
              showToast('Failed to update ban status for user', 'error');
            }
            this.loadingAction = false;
          }
        });

    },
    async purgeUser() {
      showConfirm('Purge user', 'Are you sure you want to purge posts and comments for the user "' + this.post.user.displayUsername + '"? ', 'Purge user', 'warning')
        .then(async (result) => {
          if (result.isConfirmed) {
            this.loadingAction = true;
            try {
              await Cloud.adminPurgeUser(this.post.user.id);
              showToast('User purged successfully', 'success');
            }
            catch (e) {
              showToast('Failed to purge user', 'error');
            }
            this.loadingAction = false;
          }
        });
    },
  }
});
