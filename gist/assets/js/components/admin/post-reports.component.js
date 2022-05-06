/**
 * <post-reports>
 * -----------------------------------------------------------------------------
 * Manage post reports
 *
 * @type {Component}
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('post-reports', {

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
      reportedPosts: [],
      loadingReports: true,
      loadingReportAction: false,
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
      <div class="card">
          <div class="card-header">Reported posts</div>
          <div class="card-body">
              <table class="table table-responsive table-sm">
                  <tr>
                      <th>ID</th>
                      <th>Post title</th>
                      <th>Report count</th>
                      <th>Reports</th>
                      <th>Actions</th>
                  </tr>
                  <tr v-for="post in reportedPosts">
                      <td>{{post.id}}</td>
                      <td><a :href="'/post/' + post.id + '/' + post.slug" target="_blank">{{post.title}}</a></td>
                      <td>{{post.reportCount}}</td>
                      <td>
                        <a :href="'/admin/post-reports/' + post.id" target="_blank">View</a>
                      </td>
                      <td>
                          <a class="dropdown-toggle btn btn-outline-primary btn-sm" :class="{disabled: loadingReportAction}" :disabled="loadingReportAction" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                              Actions
                          </a>
                          <div class="dropdown-menu">
                              <button class="dropdown-item" type="button" @click="clearReports(post)">Clear reports</button>
                              <button class="dropdown-item" type="button" @click="deletePost(post)">Delete post</button>
                          </div>
                      </td>
                  </tr>
              </table>
               <div v-if="reportedPosts.length < 1"><em>No reported posts found.</em></div>
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
      this.loadingReports = true;
      let result = await Cloud.adminListReportedPosts();
      this.reportedPosts = result.reportedPosts;
      this.loadingReports = false;
    },
    async clearReports(post) {
      showConfirm('Clear post reports', 'Are you sure you want to clear reports for the post "' + post.title + '"? ', 'Submit', 'warning')
        .then(async function(result) {
          if (result.isConfirmed) {
            this.loadingReportAction = true;
            try {
              await Cloud.adminClearPostReports(post.id);
              showToast('Cleared post reports successfully', 'success');
              post.reportCount = 0;
            } catch (e) {
              showToast('Failed to clear postReports', 'error');
            }
            this.loadingReportAction = false;
          }
        });

    },
    async deletePost(post) {
      showConfirm('Delete post', 'Are you sure you want to delete the post: "' + post.title + '"? ', 'Delete post', 'warning')
        .then(async function(result) {
          if (result.isConfirmed) {
            this.loadingReportAction = true;
            try {
              await Cloud.adminDeletePost(post.id);
              showToast('Post deleted successfully', 'success');
            }
            catch (e) {
              showToast('Failed to delete post', 'error');
            }
            this.loadingReportAction = false;
          }
        });
    },

  }

});
