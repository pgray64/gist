const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-info',
    cancelButton: 'btn btn-secondary mr-2'
  },
  buttonsStyling: false
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
