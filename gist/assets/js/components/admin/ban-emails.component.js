/**
 * <ban-emails>
 * -----------------------------------------------------------------------------
 * Ban emails
 *
 * @type {Component}
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('ban-emails', {

  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
  ],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function (){
    return {
      bannedEmailSearchFilter: '',
      bannedEmails: [],
      loadingBannedEmails: false,
      loadingBanEmailAction: false,
      emailToBan: '',
      emailToBanInvalid: false
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
      <div class="card">
          <div class="card-header">Banned email addresses</div>
          <div class="card-body">
              <div class="mb-2">

                  <div class="form-inline">
                      <label class="mr-2">Ban an email address</label>
                      <input class="form-control mr-2" type="email" placeholder="Email Address" v-model="emailToBan"/>
                      <ajax-button :syncing="loadingBanEmailAction" class="btn btn-primary" type="button" @click="setEmailBanned(emailToBan, true)">Ban</ajax-button>
                  </div>
                  <div class="text-danger small" v-if="emailToBan && emailToBanInvalid">Email is invalid.</div>
              </div>
              <hr/>
              <div class="mb-2">

                  <div class="form-inline">
                      <label class="mr-2">Banned emails</label>
                      <input class="form-control mr-2" type="text" placeholder="Filter banned emails" v-model="bannedEmailSearchFilter"/>
                      <ajax-button :syncing="loadingBannedEmails" class="btn btn-primary" type="button" @click="searchBannedEmails">Search</ajax-button>
                  </div>
              </div>
              <table class="table table-responsive table-sm">
                  <tr>
                      <th>Banned email</th>
                  </tr>
                  <tr v-for="row in bannedEmails">
                      <td>{{row.emailAddress}}</td>
                      <td>
                          <ajax-button :syncing="loadingBanEmailAction" class="btn btn-primary btn-sm" type="button" @click="setEmailBanned(row.emailAddress, false)">Unban</ajax-button>
                      </td>
                  </tr>
              </table>
          </div>

      </div>
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {

  },

  beforeDestroy: function() {

  },
  mounted: async function() {
    await this.searchBannedEmails();
  },
  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
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
      showConfirm((newVal ? 'Ban' : 'Unban') + ' email', 'Are you sure you want to '+ (newVal ? 'ban' : 'unban')+' the email "' + email + '"? ', 'Submit', 'warning')
        .then(async (result) =>  {
          if (result.isConfirmed) {
            this.loadingBanEmailAction = true;
            try {
              await Cloud.adminSetEmailBanned(email, newVal);
              showToast('Email '+(newVal ? 'banned' : 'unbanned')+' successfully', 'success');
            } catch (e) {
              showToast('Failed to ban email', 'error');
            }

            this.loadingBanEmailAction = false;
            this.searchBannedEmails();
          }
        });
    }
  }

});
