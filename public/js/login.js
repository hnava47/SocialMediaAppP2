$(document).ready(function() {
    const $emailField = $('#emailField');
    const $passwordField = $('#passwordField');
    const $signInBtn = $('#signInBtn');

    $signInBtn.on('click', async function(event) {
        event.preventDefault();
        await $.post('/api/users/login', {
            email: $emailField.val().trim(),
            password: $passwordField.val().trim()
        });

        window.location.href = '/todos';
    });

});
