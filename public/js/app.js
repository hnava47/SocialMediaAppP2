$(document).ready(function() {
    const $logoutBtn = $('#logoutBtn');

    $logoutBtn.on('click', async function() {
        await $.ajax({
            url: '/api/users/logout',
            method: 'POST',
        });
        window.location.href = '/login';
    });
});
