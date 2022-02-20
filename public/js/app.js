$(document).ready(function() {
    const $logoutBtn = $('#logoutBtn');
    const $postModal = $('#postModal');
    const $newsFeedEl = $('#newsFeed');
    const $postMessage = $('#postMessage');
    const $postBtn = $('#postBtn');
    const $updateModal = $('#updateModal');
    const $updatePostMessage = $('#updateMessage');
    const $updatePostBtn = $('#updateBtn');
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
    const spaceEl = '&nbsp;';
    const dblSpaceEl = '&nbsp;&nbsp;';
    const multiSpaceEl = ' &nbsp;&nbsp;&nbsp; ';

    // Function variables
    const hideAlerts = () => {
        $successAlert.hide();
        $updateAlert.hide();
        $deleteAlert.hide();
    };

    const deletePostFn = async (event) => {
        const $postId = $(event.target).parent().data('id');
        await $.ajax({
            url: '/api/posts/' + $postId,
            method: 'DELETE'
        });

        $('#' + $postId).remove();

        $deleteAlert.fadeIn();

        setTimeout(function() {
            $deleteAlert.fadeOut();
        }, 4000);
    }

    const deleteCommentFn = async (event) => {
        const $commentId = $(event.target).parent().data('commentid');

        await $.ajax({
            url: '/api/comments/' + $commentId,
            method: 'DELETE'
        });

        $('#' + $commentId).remove();

        hideAlerts();

        $deleteAlert.fadeIn();

        setTimeout(function() {
            $deleteAlert.fadeOut();
        }, 4000);
    };

    // Logout functions
    $logoutBtn.on('click', async () => {
        await $.ajax({
            url: '/api/users/logout',
            method: 'POST',
        });
        window.location.href = '/login';
    });

    // Post functions
    $postBtn.on('click', async () => {
        const $postAnchor = $('<a>');
        const $postDiv = $('<div>');
        const $postNameEl = $('<strong>');
        const $postDropdown = $('<div>');
        const $postDropdownIcon = $('<i>');
        const $postDropdownUl = $('<ul>');
        const $postEditLi = $('<li>');
        const $postDeleteLi = $('<li>');
        const $dateEl = $('<small>');
        const $postMessageEl = $('<div>');
        const $postIconEl = $('<small>');
        const $postHeartEl = $('<i>');
        const $postHeartSpan = $('<span>');
        const $postCommentEl = $('<i>');
        const $postCommentSpan = $('<span>');
        const $collapseDiv = $('<div>');
        const $inputGroupDiv = $('<div>');
        const $personImg = $('<img>');
        const $commentInput = $('<input>');
        const $commentBtnDiv = $('<div>');
        const $commentBtn = $('<button>');

        const post = await $.ajax({
            url: '/api/posts',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                message: $postMessage.val().trim()
            })
        });
        $postModal.modal('toggle');

        $postMessage.val('');

        // Adding all HTML components for a post to news feed
        $commentBtn.addClass('btn btn-primary postCommentBtn')
            .attr({
                'type': 'button',
                'data-id': post.id
            })
            .text('Post');

        $commentBtnDiv.addClass('d-grid gap-2 d-md-flex justify-content-md-end')
            .append($commentBtn);

        $commentInput.addClass('form-control rounded-pill')
            .attr({
                'id': 'input-' + post.id,
                'type': 'text',
                'aria-label': 'Sizing example input',
                'aria-describedby': 'inputGroup-sizing-default',
                'placeholder': 'Add a comment...'
            });

        $personImg.addClass('rounded-circle')
            .attr({
                'src': './img/person-circle.svg',
                'alt': 'User',
                'width': '38',
                'height': '38'
            });

        $inputGroupDiv.addClass('input-group mt-3 mb-2')
            .append($personImg, dblSpaceEl, $commentInput);

        $collapseDiv.addClass('collapse mt-2 mb-2 mx-2')
            .attr('id', 'collapse-' + post.id)
            .append($inputGroupDiv, $commentBtnDiv);

        $postCommentSpan.text('0');

        $postCommentEl.addClass('bi bi-chat')
            .attr({
                'data-bs-toggle': 'collapse',
                'href': '#collapse-' + post.id,
                'role': 'button',
                'aria-expanded': 'false',
                'aria-controls': 'collapseExample'
            });

        $postHeartSpan.attr('id', 'heartCount-' + post.id)
            .text('0');

        $postHeartEl.addClass('bi bi-heart heartBtn')
            .attr('data-postId', post.id);

        $postIconEl.append($postHeartEl, spaceEl, $postHeartSpan, multiSpaceEl, $postCommentEl, spaceEl, $postCommentSpan);

        $postMessageEl.addClass('col-10 mt-3 mb-1')
            .attr('id', 'message-' + post.id)
            .text(post.message);

        $dateEl.addClass('text-muted')
            .text(moment(post.updatedAt).format('MMMM DD') + ' at ' + moment(post.updatedAt).format('hh:mm A'))

        $postDeleteLi.addClass('dropdown-item deletePost')
            .text('Delete');

        $postEditLi.addClass('dropdown-item editPost')
            .attr({
                'data-bs-toggle': 'modal',
                'data-bs-target': '#updateModal'
            })
            .text('Edit');

        $postDropdownUl.addClass('dropdown-menu text-small shadow')
            .attr({
                'aria-labelledby': 'dropdownUser2',
                'data-id': post.id
            })
            .append($postEditLi, $postDeleteLi);

        $postDropdownIcon.addClass('bi bi-three-dots')
            .attr('data-bs-toggle', 'dropdown');

        $postDropdown.addClass('flex-shrink-0 dropdown')
            .append($postDropdownIcon, $postDropdownUl);

        $postNameEl.addClass('mb-1')
            .text(post.user.firstName + ' ' + post.user.lastName);

        $postDiv.addClass('d-flex w-100 align-items-center justify-content-between')
            .append($postNameEl, $postDropdown);

        $postAnchor.attr('id', post.id)
            .addClass('list-group-item list-group-item-action py-3 lh-tight')
            .append($postDiv, $dateEl, $postMessageEl, $postIconEl, $collapseDiv);

        $newsFeedEl.prepend($postAnchor);

        $successAlert.fadeIn();

        setTimeout(function() {
            $successAlert.fadeOut();
        }, 4000);

        $('.deletePost').on('click', deletePostFn);
    });

    $editPost.on('click', async (event) => {
        const $updateId = $(event.target).parent().data('id');
        const $currentPostMessage = $('#message-' + $updateId);

        $updatePostMessage.val($currentPostMessage.text().trim());

        $updatePostBtn.on('click', async () => {
            const updatedPost = await $.ajax({
                url: '/api/posts/' + $updateId,
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify({
                    message: $updatePostMessage.val().trim()
                })
            });
            $updateModal.modal('toggle');

            $currentPostMessage.text(updatedPost.message);

            $updatePostMessage.val('');

            hideAlerts();

            $updateAlert.fadeIn();

            setTimeout(function() {
                $updateAlert.fadeOut();
            }, 4000);
        });
    });

    $deletePost.on('click', deletePostFn);

    // Comment functions
    $postCommentBtn.on('click', async (event) => {
        const $postCommentId = $(event.target).data('id')
        const $commentMessage = $("#input-" + $postCommentId);
        const $commentParent = $('#collapse-' + $postCommentId);
        const $cardDiv = $('<div>');
        const $commentDiv = $('<div>');
        const $commentNameEl = $('<strong>');
        const $dropdownDiv = $('<div>');
        const $dotIcon = $('<i>');
        const $dropdownUl = $('<ul>');
        const $editLi = $('<li>');
        const $deleteLi = $('<li>');
        const $commentDateEl = $('<small>');
        const $messageDiv = $('<div>');

        const comment = await $.ajax({
            url: '/api/comments',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                message: $commentMessage.val().trim(),
                postId: $postCommentId
            })
        });

        $commentMessage.val('');

        $deleteLi.addClass('dropdown-item deleteComment')
            .text('Delete');

        $editLi.addClass('dropdown-item editComment')
            .text('Edit')
            .attr({
                'data-bs-toggle': 'modal',
                'data-bs-target': '#updateCommentModal'
            });

        $dropdownUl.addClass('dropdown-menu text-small shadow')
            .attr({
                'aria-labelledby': 'dropdownUser2',
                'data-commentId': comment.id
            })
            .append($editLi, $deleteLi);

        $dotIcon.addClass('bi bi-three-dots')
            .attr('data-bs-toggle', 'dropdown');

        $dropdownDiv.addClass('flex-shrink-0 dropdown')
            .append($dotIcon, $dropdownUl);

        $commentNameEl.addClass('comment-sm')
            .text(comment.user.firstName + ' ' + comment.user.lastName);

        $commentDiv.addClass('d-flex w-100 align-items-center justify-content-between')
            .append($commentNameEl, $dropdownDiv);

        $commentDateEl.addClass('text-muted comment-xsm')
            .text(moment(comment.updatedAt).format('MMMM DD') + ' at ' + moment(comment.updatedAt).format('hh:mm A'));

        $messageDiv.addClass('mt-2 comment-sm')
            .text(comment.message);

        $cardDiv.attr('id', comment.id)
            .addClass('card card-body')
            .append($commentDiv, $commentDateEl, $messageDiv);

        $commentParent.prepend($cardDiv);

        hideAlerts();

        $successAlert.fadeIn();

        setTimeout(function() {
            $successAlert.fadeOut();
        }, 4000);

        $('.deleteComment').on('click', deleteCommentFn);
    });

    $deleteComment.on('click', deleteCommentFn);

    // Heart functions
    $heartBtn.on('click', async (event) => {
        const $heartEl = $(event.target);
        const $postId = $heartEl.data('postid');
        const $heartId = $heartEl.data('heartid');
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

    $closeSuccessBtn.on('click', () => {
        $successAlert.hide();
    });

    $closeUpdateBtn.on('click', () => {
        $updateAlert.hide();
    });

    $closeDeleteBtn.on('click', () => {
        $deleteAlert.hide();
    });
});
