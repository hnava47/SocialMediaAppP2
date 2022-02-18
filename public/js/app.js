$(document).ready(function() {
    const $logoutBtn = $('#logoutBtn');
    const $postModal = $('#postModal');
    const $postMessage = $('#postMessage');
    const $postBtn = $('#postBtn');
    const $updateModal = $('#updateModal');
    const $updateMessage = $('#updateMessage');
    const $updateBtn = $('#updateBtn');
    const $successAlert = $('#successAlert');
    const $updateAlert = $('#updateAlert');
    const $deleteAlert = $('#deleteAlert');
    const $closeSuccessBtn = $('#closeSuccess');
    const $closeUpdateBtn = $('#closeUpdate');
    const $closeDeleteBtn = $('#closeDelete');
    const $editPost = $('.editPost');
    const $deletePost = $('.deletePost');
    const $heartBtn = $('.heartBtn');
    const $postCommentBtn = $('.postCommentBtn');
    const $deleteComment = $('.deleteComment');

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

    $editPost.on('click', async (event) => {
        const updateId = $(event.target).parent().data('id');
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
        const postId = $(event.target).parent().data('id');
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

    $postCommentBtn.on('click', async (event) => {
        const $postCommentId = $(event.target).data('id')
        const $commentMessage = $("#input-" + $postCommentId);

        await $.ajax({
            url: '/api/comments',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                message: $commentMessage.val().trim(),
                postId: $postCommentId
            })
        });

        $successAlert.fadeIn();

        setTimeout(function() {
            $successAlert.fadeOut();
            location.reload();
        }, 4000);
    });

    $heartBtn.on('click', async (event) => {
        const $heartEl = $(event.target);
        const $postId = $heartEl.attr('data-postId');
        const $heartId = $heartEl.attr('data-heartId');
        const $heartCount = $('#heartCount-'+$postId);

        if ($heartEl.hasClass('bi-heart')) {
            const heartPost = await $.ajax({
                url: '/api/hearts',
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                data: JSON.stringify({
                    postId: $postId
                })
            });

            $heartEl.removeClass('bi-heart')
                .attr('data-heartId', heartPost.id)
                .addClass('bi-heart-fill red-color');
            $heartCount.text(parseInt($heartCount.text())+1);
        } else {
            await $.ajax({
                url: '/api/hearts/' + $heartId,
                method: 'DELETE'
            });

            $heartEl.removeClass('bi-heart-fill red-color')
                .removeAttr('data-heartId')
                .addClass('bi-heart');
            $heartCount.text(parseInt($heartCount.text())-1);
        }
    });

    $deleteComment.on('click', async (event) => {
        const $commentId = $(event.target).parent().data('commentid');

        await $.ajax({
            url: '/api/comments/' + $commentId,
            method: 'DELETE'
        });

        $('#' + $commentId).remove();

        $deleteAlert.fadeIn();

        setTimeout(function() {
            $deleteAlert.fadeOut();
        }, 4000);
    });
});
