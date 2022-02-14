$(document).ready(function() {
    const $logoutBtn = $('#logoutBtn');
    const $postModal = $('#postModal');
    const $postMessage = $('#postMessage');
    const $postBtn = $('#postBtn');
    const $updateModal = $('#updateModal');
    const $updateMessage = $('#updateMessage');
    const $editBtn = $('.editBtn');
    const $updateBtn = $('#updateBtn');
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
        $postModal.modal('toggle');

        $postMessage.val('');

        $successMessage.fadeIn();

        setTimeout(function() {
            $successMessage.fadeOut();
        }, 4000);
    });

    $closeBtn.on('click', () => $successMessage.hide());

    $editBtn.on('click', async (event) => {
        const updateId = $(event.target).parent().parent().parent().parent().attr('id');
        const updatePost = await $.ajax({
            url: '/api/posts/' + updateId,
            method: 'GET'
        });

        $updateMessage.val(updatePost.message);


        $updateBtn.on('click', async () => {
            await $.ajax({
                url: '/api/posts/' + updateId,
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify({
                    message: $updateMessage.val().trim()
                })
            });
            $updateModal.modal('toggle');

            $updateMessage.val('');

            $successMessage.fadeIn();

            setTimeout(function() {
                $successMessage.fadeOut();
            }, 4000);
        });
    });

    $deletePost.on('click', async (event) => {
        const postId = $(event.target).parent().parent().parent().parent().attr('id');
        await $.ajax({
            url: '/api/posts/' + postId,
            method: 'DELETE'
        });

        window.location.href = '/feed';
    });
});
