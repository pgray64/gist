/**
 * <manage-users>
 * -----------------------------------------------------------------------------
 * Manage users
 *
 * @type {Component}
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('manage-users', {

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
      userSearchFilter: '',
      userList: [],
      loadingUsers: true,
      loadingUserAction: false,
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
      <div class="card">
          <div class="card-header">Users</div>
          <div class="card-body">
              <div class="mb-2">

                  <div class="form-inline">
                      <label class="mr-2">Users</label>
                      <input class="form-control mr-2" type="text" placeholder="Filter users" v-model="userSearchFilter"/>
                      <ajax-button :syncing="loadingUsers" class="btn btn-primary" type="button" @click="searchUsers"></ajax-button>
                  </div>
              </div>
              <table class="table table-responsive table-sm">
                  <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Email Status</th>
                      <th>Name</th>
                      <th>Is Admin</th>
                      <th>Banned</th>
                      <th>Created by IP</th>
                      <th>Actions</th>
                  </tr>
                  <tr v-for="user in userList">
                      <td>{{user.id}}</td>
                      <td><a :href="'/' + user.displayUsername" target="_blank">{{user.displayUsername}}</a></td>
                      <td>{{user.emailAddress}}</td>
                      <td>{{user.emailStatus}}</td>
                      <td>{{user.fullName}}</td>
                      <td>{{user.isSuperAdmin}}</td>
                      <td>{{user.isBanned}}</td>
                      <td>{{user.tosAcceptedByIp}}</td>
                      <td>
                          <a class="dropdown-toggle btn btn-outline-primary btn-sm" :class="{disabled: loadingUserAction}" :disabled="loadingUserAction" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                              Actions
                          </a>
                          <div class="dropdown-menu">
                              <button class="dropdown-item" type="button" @click="setBanned(user)">{{user.isBanned? 'Unban' : 'Ban'}}</button>
                              <button class="dropdown-item" type="button" @click="purgeUser(user)">Purge</button>
                              <!--<button class="dropdown-item" type="button" @click="">Make admin</button>-->
                          </div>
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
      let newVal = !user.isBanned
      showConfirm((newVal ? 'Ban' : 'Unban') + ' user', 'Are you sure you want to '+(newVal ? 'ban' : 'unban')+' the user "' + user.displayUsername + '"? ', 'Submit', 'warning')
        .then(async function(result) {
          if (result.isConfirmed) {
            this.loadingUserAction = true;
            await Cloud.adminSetUserBanned(user.id, !user.isBanned);
            showToast('User ' + (newVal ? 'banned' : 'unbanned')+ ' successfully', 'success');
            user.isBanned = newVal;
            this.loadingUserAction = false;
          }
        });

    },
    async purgeUser(user) {
      showConfirm('Purge user', 'Are you sure you want to purge the user "' + user.displayUsername + '"? ', 'Purge user', 'warning')
        .then(async function(result) {
          if (result.isConfirmed) {
            this.loadingUserAction = true;
            await Cloud.adminPurgeUser(user.id);
            showToast('User purged successfully', 'success');
            this.loadingUserAction = false;
          }
        });
    },

  }

});
