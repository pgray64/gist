parasails.registerPage('home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    userSearchFilter: '',
    userList: [],
    loadingUsers: true,
    loadingUserAction: false,
    bannedEmailSearchFilter: '',
    bannedEmails: [],
    loadingBannedEmails: false,
    loadingBanEmailAction: false,
    emailToBan: '',
    emailToBanInvalid: false

  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    //…
  },
  mounted: async function() {
    await this.searchUsers();
    await this.searchBannedEmails();
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
      let newVal = !user.isBanned
      showConfirm((newVal ? 'Ban' : 'Unban') + ' user', 'Are you sure you want to '+(newVal ? 'ban' : 'unban')+' the user "' + user.displayUsername + '"? ', 'Submit', 'danger')
        .then(async function(result) {
          if (result.isConfirmed) {
            this.loadingUserAction = true;
            await Cloud.adminSetUserBanned(user.id, !user.isBanned);
            user.isBanned = newVal;
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
    },
    async searchBannedEmails() {
      this.loadingBannedEmails = true;
      let result = await Cloud.adminListBannedEmails(this.bannedEmailSearchFilter);
      this.bannedEmails = result.emails;
      this.loadingBannedEmails = false;
    },
    async setEmailBanned(email, newVal) {
      this.emailToBanInvalid = false;
      if (!email || !isValidEmailQuick(email)) {
        this.emailToBanInvalid = true;
        return;
      }
      showConfirm((newVal ? 'Ban' : 'Unban') + ' email', 'Are you sure you want to '+ (newVal ? 'ban' : 'unban')+' the email "' + email + '"? ', 'Submit', 'danger')
        .then(async (result) =>  {
          if (result.isConfirmed) {
            this.loadingBanEmailAction = true;
            try {
              await Cloud.adminSetEmailBanned(email, newVal);
            } catch (e) {
              showToast('Failed to ban email', 'error');
            }

            this.loadingBanEmailAction = false;
            this.searchBannedEmails();
          }
        });
    }
  },

});
