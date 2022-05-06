const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-info',
    cancelButton: 'btn btn-secondary mr-2'
  },
  buttonsStyling: false
});
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
function showConfirm(title, text, confirmButtonText, icon) {
  return swalWithBootstrapButtons.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText,
    reverseButtons: true,
    position: 'top'
  });
}
function showTextPopup(title, text, confirmButtonText, icon) {
  return swalWithBootstrapButtons.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText,
    reverseButtons: true,
    position: 'top',
    input: 'textarea',
    inputAttributes: {
      required: true
    }
  });
}
function showToast(title, icon) {
  return Toast.fire({
    title,
    icon
  });
}
