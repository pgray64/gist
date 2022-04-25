/**
 * <post-list>
 * -----------------------------------------------------------------------------
 * A post listing
 *
 * @type {Component}
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('postList', {

  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'posts',
    'hasMore',
    'imageBaseUrl',
    'isLoading'
  ],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function (){
    return {
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
  <div class="row">
      <div v-if="!isLoading && posts.length === 0" class="col-12 text-center">
        <slot name="no-posts-message"></slot>
      </div>
      <div v-else class="col-12 text-center text-sm-left">
          <div class="align-top text-left d-inline-block post-card" v-for="post in posts">
              <div class="card shadow-sm mb-3 mx-2 ">
                  <div class="position-absolute" style="z-index:2" v-if="post.rebloggedPost">
                      <div class="rounded-pill m-1 shadow-sm" style="background-color:rgba(52,152,219,0.7)">
                          <span class="fa fa-retweet p-2 text-white"></span>
                      </div>
                  </div>
                  <a :href="getPostUrl(post)" class="text-decoration-none">
                      <div v-if="post.contentType ==='image' || (post.rebloggedPost && post.rebloggedPost.contentType === 'image')" class="card-img-top d-flex align-items-center justify-content-center" style="overflow: hidden;height: 13rem">
                          <img  :src="getImageUrl(post)" class="d-inline-block" style="width:auto;height:100%;" :title="post.title" :alt="post.title">
                      </div>
                      <div v-else-if="post.contentType ==='text' || (post.rebloggedPost && post.rebloggedPost.contentType === 'text')" class="fade-overflow user-content text-dark p-3  border-bottom" style="height: 13rem" >
                          {{getTextContent(post)}}
                      </div>
                  </a>
                  <div class="card-body py-2 px-3 border-top">
                      <div class="user-content small" style="white-space: nowrap;">
                          <a :href="getPostUrl(post)" :title="post.title">{{post.title}}</a>
                      </div>
                  </div>
              </div>
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

  beforeDestroy: function() {
    if(this.formatType === 'timeago') {
      clearInterval(this.interval);
    }
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    loadMore() {
      this.$emit('load-more');
    },
    getPostUrl: function(post) {
      return '/post/' + post.id + '/' + post.slug;
    },
    getImageUrl: function(post) {
      return this.imageBaseUrl + '/' + (post.rebloggedPost ? post.rebloggedPost.imageContent : post.imageContent);
    },
    getTextContent: function(post) {
      return post.rebloggedPost ? post.rebloggedPost.textContent : post.textContent;
    },

  }

});
