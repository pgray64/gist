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
      textContent: '',
    },
    // Form rules
    formRules: {
      title: {required: true},
      textContent: {required: true},
    },
    maxFileSizeExceeded: false,
    imagePreviewUrl: ''
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
    submittedForm: async function(result) {
      this.syncing = true;
      window.location = '/post/' + result.postId + '/' + result.slug;
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
      // If you cancel from the native upload window when you already
      // have a photo tracked, then we just avast (return early).
      // In this case, we just leave whatever you had there before.
      if (!selectedFile && this.formData.selectedFile) {
        return;
      }
      this.formData.imageFile = selectedFile;
      this.formData.imageType = selectedFile.type;
      // Set up the file preview for the UI:
      var reader = new FileReader();
      reader.onload = (event) => {
        this.imagePreviewUrl = event.target.result;
        // Unbind this "onload" event.
        delete reader.onload;
      };
      this.formData.textContent = selectedFile.name;
      this.formErrors.textContent = false;
      reader.readAsDataURL(selectedFile);
      this.maxFileSizeExceeded = this.selectedFileTooLarge();
    },
    selectedFileTooLarge: function() {
      return this.formData.imageFile && this.formData.imageFile.size > this.maxFileSize;
    }
  }
});
