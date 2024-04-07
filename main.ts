function display_dialog() {
    let dialog = document.getElementById('dialog');
    if(dialog == null) {
        dialog = document.createElement('div');
        dialog.id = 'dialog';
        dialog.innerHTML = 'Hello, world!';
        document.body.appendChild(dialog);
    }
    dialog.style.display = 'block';
}