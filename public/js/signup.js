$(document).ready(function() {
    const $firstNameField = $('#firstNameField');
    const $lastNameField = $('#lastNameField');
    const $usernameField = $('#usernameField');
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
                firstName: $firstNameField.val().trim(),
                lastName: $lastNameField.val().trim(),
                username: '@'+$usernameField.val().trim(),
                email: $emailField.val().trim(),
                password: $passwordField.val().trim()
            })
        });
    });
});
