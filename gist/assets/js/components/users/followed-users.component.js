/**
 * <post-list>
 * -----------------------------------------------------------------------------
 * A post listing
 *
 * @type {Component}
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('followedUsers', {

  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'currentUserId',
  ],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function (){
    return {
      users: [],
      isLoading: true,
      page: -1,
      hasMore: false
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
  <div class="row">
      <div v-if="!isLoading && users.length === 0" class="col-12 text-center">
         <div class="text-center">
            <div style="max-width: 650px;" class="d-inline-block">
                <h2>No followed users</h2>
                <h5 class="px-3">Take a look at the globally <a class="text-info" href="/posts/trending">trending posts</a> to find some users to follow.</h5>
            </div>
        </div>
      </div>
      <div v-else class="col-12 col-sm-6 user-content">
      <hr v-if="users.length > 0"/>
          <div class="" v-for="user in users">
              <button class="btn btn-sm  btn-outline-danger mr-2" @click="removeFollowed(user.id)">
                <span class="fa fa-minus"></span>
              </button>
              <a :href="getUserLink(user)">{{user.displayUsername}}</a>
              <hr/>
          </div>
          <div v-if="isLoading" class="text-center">
              <div class="spinner-border text-primary" role="status">
                  <span class="sr-only">Loading...</span>
              </div>
          </div>
          <div class="text-center mt-4">
              <button type="button" :disabled="isLoading" class="btn btn-info" @click="loadMore()" v-if="hasMore">Load more</button>
          </div>
      </div>
</div>
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {

  },
  mounted: async function(){
    await this.loadMore();
  },
  beforeDestroy: function() {
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    async loadMore() {
      this.isLoading = true;
      this.page++;
      let result = await Cloud.listFollowedUsers(this.page);
      this.users = this.users.concat(result.followedUsers);
      this.hasMore = result.hasMore;
      this.isLoading = false;
    },
    getUserLink(user) {
      return '/' + user.username;
    },
    async removeFollowed(id) {
      let index = this.users.findIndex(function(u) { return u.id === id; } );
      this.users.splice(index, 1);
      // update UI before delete is finished, user doesn't need to know
      await Cloud.updateFollowUser(id, false);
    }
  }

});
