const iCheck = document.getElementById('iCheck');
const confirmButton = document.getElementById('confirmButton');

iCheck.addEventListener('change', () => {
    confirmButton.disabled = !iCheck.checked;
});