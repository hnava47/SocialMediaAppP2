$(document).ready(function() {
    const $emailField = $('#emailField');
    const $passwordField = $('#passwordField');
    const $signUpBtn = $('#signUpBtn');

    $signUpBtn.on('click', async function(event) {
        event.preventDefault();
        await $.ajax({
            url: '/api/users/signup',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                email: $emailField.val().trim(),
                password: $passwordField.val().trim()
            })
        });
    });
});
