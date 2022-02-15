$(document).ready(function() {
    const $logoutBtn = $('#logoutBtn');
    const $postModal = $('#postModal');
    const $postMessage = $('#postMessage');
    const $postBtn = $('#postBtn');
    const $updateModal = $('#updateModal');
    const $updateMessage = $('#updateMessage');
    const $editBtn = $('.editBtn');
    const $updateBtn = $('#updateBtn');
    const $successAlert = $('#successAlert');
    const $updateAlert = $('#updateAlert');
    const $deleteAlert = $('#deleteAlert');
    const $closeSuccessBtn = $('#closeSuccess');
    const $closeUpdateBtn = $('#closeUpdate');
    const $closeDeleteBtn = $('#closeDelete');
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

        $successAlert.fadeIn();

        setTimeout(function() {
            $successAlert.fadeOut();
            location.reload();
        }, 4000);
    });

    $closeSuccessBtn.on('click', () => {
        $successAlert.hide();
        location.reload();
    });

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

            $updateAlert.fadeIn();

            setTimeout(function() {
                $updateAlert.fadeOut();
                location.reload();
            }, 4000);
        });
    });

    $closeUpdateBtn.on('click', () => {
        $updateAlert.hide();
        location.reload();
    });

    $deletePost.on('click', async (event) => {
        const postId = $(event.target).parent().parent().parent().parent().attr('id');
        await $.ajax({
            url: '/api/posts/' + postId,
            method: 'DELETE'
        });

        $deleteAlert.fadeIn();

        setTimeout(function() {
            $deleteAlert.fadeOut();
            location.reload();
        }, 4000);
    });

    $closeDeleteBtn.on('click', () => {
        $deleteAlert.hide();
        location.reload();
    });
});
