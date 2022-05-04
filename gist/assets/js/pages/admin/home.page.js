parasails.registerPage('home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    userSearchFilter: '',
    userList: [],
    loadingUsers: true,
    loadingUserAction: false,
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    //…
  },
  mounted: async function() {
    await this.searchUsers();
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    async searchUsers() {
      this.loadingUsers = true;
      let result = await Cloud.adminListUsers(this.userSearchFilter);
      this.userList = result.users;
      this.loadingUsers = false;
    },
    async setBanned(user) {
      showConfirm('Ban user', 'Are you sure you want to ban the user "' + user.displayUsername + '"? ', 'Ban user', 'danger')
        .then(async function(result) {
          if (result.isConfirmed) {
            this.loadingUserAction = true;
            await Cloud.adminSetUserBanned(user.id, !user.isBanned);
            user.isBanned = !user.isBanned;
            this.loadingUserAction = false;
          }
        });

    },
    async purgeUser(user) {
      showConfirm('Purge user', 'Are you sure you want to purge the user "' + user.displayUsername + '"? ', 'Purge user', '')
        .then(async function(result) {
          if (result.isConfirmed) {
            this.loadingUserAction = true;
            await Cloud.adminPurgeUser(user.id);
            this.loadingUserAction = false;
          }
        });
    }
  },

});
