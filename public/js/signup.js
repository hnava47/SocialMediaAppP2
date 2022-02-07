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
            method: 'POST',
            url: '/api/users/signup',
            data: {
                fistName: $firstNameField.val().trim(),
                lastName: $lastNameField.val().trim(),
                username: $usernameField.val().trim(),
                email: $emailField.val().trim(),
                password: $passwordField.val().trim()
            }
        });
        // await $.post('/api/users/signup', {
        //     email: $emailField.val().trim(),
        //     username: $usernameField.val().trim(),
        //     password: $passwordField.val().trim()
        // });

        window.location.href = '/feed';
    });
});
