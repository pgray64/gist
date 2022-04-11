parasails.registerPage('create-post', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    syncing: false,
    cloudError: '',
    formErrors: { /* … */ },
    formData: {
      postType: 'text',
      textContent: ''
    },
    // Form rules
    formRules: {
      title: {required: true},
      textContent: {required: true},
    },
    maxFileSizeExceeded: false,
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
    uploadEnabled: function() {
      return this.me.emailStatus === 'confirmed';
    },
    isImagePost: function() {
      return this.formData.postType === 'image';
    }
  },
  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    submittedForm: async function() {
      this.syncing = true;
      window.location = '/welcome';
    },
    changeFileInput: function(files) {
      if (files.length !== 1 && !this.formData.imageFile) {
        this.imageFile = undefined;
        this.textContent = undefined;
        throw new Error('Consistency violation: `changeFileInput` was somehow called with an empty array of files, or with more than one file in the array!  This should never happen unless there is already an uploaded file tracked.');
      }
      if (files.length < 1) {
        this.imageFile = undefined;
        this.textContent = undefined;
        return;
      }
      var selectedFile = files[0];
      this.formData.imageFile = selectedFile;
      this.formData.textContent = selectedFile.name;
      this.formErrors.textContent = false;
      this.maxFileSizeExceeded = this.selectedFileTooLarge();
    },
    selectedFileTooLarge: function() {
      return this.formData.mediaFile && this.formData.mediaFile.size > this.maxFileSize;
    }
  }
});
