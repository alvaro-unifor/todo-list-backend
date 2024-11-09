// eslint-disable-next-line no-unused-vars
function deleteTask(id) {
    console.log(id)
    const modal = new bootstrap.Modal('#deleteModal', {id})
    modal.show();
}