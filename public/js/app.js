$(document).ready(function() {
    const $logoutBtn = $('#logoutBtn');
    const $modal = $('.modal');
    const $postMessage = $('#postMessage');
    const $postBtn = $('#postBtn');
    const $successMessage = $('.custom-success');
    const $closeBtn = $('#closeMessage');
    const $deletePost = $('.deletePost');

    $logoutBtn.on('click', async () => {
        await $.ajax({
            url: '/api/users/logout',
            method: 'POST',
        });
        window.location.href = '/login';
    });

    $postBtn.on('click', async () => {
        await $.ajax({
            url: '/api/posts',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                message: $postMessage.val().trim()
            })
        });
        $modal.modal('toggle');

        $postMessage.val('');

        $successMessage.fadeIn();

        setTimeout(function() {
            $successMessage.fadeOut();
        }, 4000);
    });

    $closeBtn.on('click', () => $successMessage.hide());

    $deletePost.on('click', async () => {
        console.log($(this).text())
        // await $.ajax({
        //     url:
        // })
    });
});
