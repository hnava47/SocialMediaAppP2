$(document).ready(function() {
    const $emailField = $('#emailField');
    const $passwordField = $('#passwordField');
    const $signInBtn = $('#signInBtn');

    $signInBtn.on('click', async function(event) {
        if (!$emailField || !$passwordField) {
            console.log('false');
            return;
        }

        event.preventDefault();
        await $.ajax({
            url: '/api/users/login',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                email: $emailField.val().trim(),
                password: $passwordField.val().trim()
            })
        });

        window.location.href = '/feed';
    });
});
