$(document).ready(function() {
    const $emailField = $('#emailField');
    const $usernameField = $('#usernameField');
    const $passwordField = $('#passwordField');
    const $signUpBtn = $('#signUpBtn');

    $signUpBtn.on('click', async function(event) {
        event.preventDefault();
        await $.post('/api/users/signup', {
            email: $emailField.val().trim(),
            username: $usernameField.val().trim(),
            password: $passwordField.val().trim()
        });

        window.location.href = '/todos';
    });
});
