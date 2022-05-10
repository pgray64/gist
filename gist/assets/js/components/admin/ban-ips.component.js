/**
 * <ban-ips>
 * -----------------------------------------------------------------------------
 * Ban ips
 *
 * @type {Component}
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('ban-ips', {

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
      bannedIPSearchFilter: '',
      bannedIPs: [],
      loadingBannedIPs: false,
      loadingBanIPAction: false,
      ipToBan: '',
      ipToBanInvalid: false,
      banDurationDays: 0,
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
      <div class="card">
          <div class="card-header">Banned IP addresses</div>
          <div class="card-body">
              <div class="mb-2">

                  <form class="form-inline" onsubmit="return false">
                      <label class="mr-2">Ban an IP</label>
                      <input class="form-control mr-2" type="text" placeholder="IP" v-model="ipToBan"/>
                      <span class="mr-1">for</span>
                      <select v-model="banDurationDays" class="form-control mr-2">
                        <option :value="0">Forever</option>
                        <option :value="1">1 Day</option>
                        <option :value="30">30 Days</option>
                        <option :value="90">90 Days</option>
                        <option :value="365">1 Year</option>
                      </select>
                      <ajax-button :syncing="loadingBanIPAction" class="btn btn-primary" type="submit" @click="setIPBanned(ipToBan, true)">Ban</ajax-button>
                  </form>
              </div>
              <hr/>
              <div class="mb-2">

                  <form class="form-inline" onsubmit="return false">
                      <label class="mr-2">Banned IPs</label>
                      <input class="form-control mr-2" type="text" placeholder="Filter banned IPs" v-model="bannedIPSearchFilter"/>
                      <ajax-button :syncing="loadingBannedIPs" class="btn btn-primary" type="submit" @click="searchBannedIPs">Search</ajax-button>
                  </form>
              </div>
              <table class="table table-responsive table-sm">
                  <tr>
                      <th>Banned ip</th>
                  </tr>
                  <tr v-for="row in bannedIPs">
                      <td>{{row.ipAddress}}</td>
                      <td>
                      <span v-if="row.expiresAt > 0">
                        <js-timestamp :at="row.expiresAt" format="calendar"></js-timestamp>
                      </span>
                      <span v-else>
                        <i>Forever</i>
                      </span>

                      </td>
                      <td>
                          <button :disabled="loadingBanIPAction" class="btn btn-primary btn-sm" type="button" @click="setIPBanned(row.ipAddress, false)">Unban</button>
                      </td>
                  </tr>
              </table>
              <div v-if="bannedIPs.length < 1"><em>No banned IP addresses found.</em></div>
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
    await this.searchBannedIPs();
  },
  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    async searchBannedIPs() {
      this.loadingBannedIPs = true;
      let result = await Cloud.adminListBannedIps(this.bannedIPSearchFilter);
      this.bannedIPs = result.ipAddresses;
      this.loadingBannedIPs = false;
    },
    async setIPBanned(ip, newVal) {
      this.ipToBanInvalid = false;
      showConfirm((newVal ? 'Ban' : 'Unban') + ' IP', 'Are you sure you want to '+ (newVal ? 'ban' : 'unban')+' the IP "' + ip + '"? ', 'Submit', 'warning')
        .then(async (result) =>  {
          if (result.isConfirmed) {
            this.loadingBanIPAction = true;
            try {
              await Cloud.adminSetIpBanned(ip, newVal, this.banDurationDays);
              showToast('IP '+(newVal ? 'banned' : 'unbanned')+' successfully', 'success');
            } catch (e) {
              showToast('Failed to set IP ban status', 'error');
            }

            this.loadingBanIPAction = false;
            this.searchBannedIPs();
          }
        });
    }
  }

});
