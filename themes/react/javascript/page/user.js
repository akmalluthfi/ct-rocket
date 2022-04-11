$(document).ready(function () {
    $('div.btn-detailsModal').click(function (e) {
        e.preventDefault();
        let modal = $('div#detailsModal');

        // ajax ke post untuk mendapatkan details post
        $.ajax({
            method: "get",
            url: document.baseURI + "post",
            data: {
                id: $(this).data('id')
            },
            dataType: "json",
            success: function (response) {
                if (!response.status === 200) return;

                let post = response.post;

                // ubah user
                modal.find('img').attr('src', post.profilePicture);
                modal.find('img').attr('alt', post.username + 'profile picture');
                modal.find('img').parent().attr('href', post.username);
                modal.find('a.detail-post-username').html(post.username);
                modal.find('a.detail-post-username').attr('href', post.username);

                let categories = '';
                // tambahkan category
                $.each(post.categories, function (index, val) {
                    categories += `<a href="explore/tags/${val.substring(1)}" class="text-primary text-decoration-none">${val} </a>`;
                });
                modal.find('div.card-text').append(categories);

                // Ubah post 
                // jika gambar post hanya 1 
                if (post.images.length === 1) {
                    showImage(post, modal);
                    return;
                } else {
                    showImages(post, modal);
                    return;
                }
            },
            error: function (err) {
                console.log('error');
            }
        });

        // jika modal diclose 
        modal.on('hidden.bs.modal', function () {
            $('div.modal-body', modal).html(`<div class="modal-uploadImage" style="background-image: url('');"></div>`);
            modal.find('div.card-text').html('');
        })
    });

    function showImage(post, modal) {
        $('div.modal-body', modal).html(`<div class="modal-uploadImage" style="background-image: url('${post.images[0].link}');"></div>`);

        // cek apakah didalamnya ada caption
        if (post.images[0].caption === null) {
            // modal.find('span.detail-post-caption span').html(post.caption);
            modal.find('div.detail-post-caption').html(`
                <span>
                    <a href="${post.username}" class="fw-bold">${post.username}</a>
                    <span>${post.caption}</span>
                </span>
            `);
            return;
        }
        // Jika ada caption
        modal.find('div.detail-post-caption span').html(`
            <span>
                <a href="${post.username}" class="fw-bold">${post.username}</a>
                <span>${post.images[0].caption}</span>
            </span>
        `);
    }

    function showImages(post, modal) {
        // jika gambar post ada banyak 

        let button;
        let image;
        let caption;

        $.each(post.images, function (index, val) {
            if (index === 0) {
                button = `
                    <button type="button" data-bs-target="#carouselDetailsPost" data-bs-slide-to="${index}" class="active" aria-current="true" aria-label="Slide ${index + 1}"></button>
                `;

                image = `
                    <div class="carousel-item active">
                        <div class="p-0 ratio ratio-1x1">
                            <div class="modal-uploadImage" style="background-image: url('${val.link}');">
                            </div>
                        </div>
                    </div>
                `;

            } else {
                button += `
                    <button type="button" data-bs-target="#carouselDetailsPost" data-bs-slide-to="${index}" aria-label="Slide ${index + 1}"></button>
                `;

                image += `
                    <div class="carousel-item">
                        <div class="p-0 ratio ratio-1x1">
                            <div class="modal-uploadImage" style="background-image: url('${val.link}');">
                            </div>
                        </div>
                    </div>
                `;
            }
        });

        // ubah image
        $('div.modal-body', modal).html(`
            <div id="carouselDetailsPost" class="carousel slide carousel-details-post" data-bs-interval="false">
                <div class="carousel-indicators">${button}</div>
                <div class="carousel-inner">${image}</div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselDetailsPost" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselDetailsPost" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        `);

        // ubah caption
        $.each(post.images, function (index, val) {
            // cek apakah image punya caption 
            if (index === 0) {
                if (val.caption === null) {
                    caption = `
                        <div class="carousel-item active">
                            <span>
                                <a href="${post.username}" class="fw-bold detail-post-username">${post.username}</a>
                                <span>${post.caption}</span>
                            </span>
                        </div>
                    `;
                } else {
                    caption = `
                        <div class="carousel-item active">
                            <span>
                                <a href="${post.username}" class="fw-bold detail-post-username">${post.username}</a>
                                <span>${val.caption}</span>
                            </span>
                        </div>
                    `;
                }
            } else {
                if (val.caption === null) {
                    caption += `
                        <div class="carousel-item">
                            <span>
                                <a href="${post.username}" class="fw-bold detail-post-username">${post.username}</a>
                                <span>${post.caption}</span>
                            </span>
                        </div>
                    `;
                } else {
                    caption += `
                        <div class="carousel-item">
                            <span>
                                <a href="${post.username}" class="fw-bold detail-post-username">${post.username}</a>
                                <span>${val.caption}</span>
                            </span>
                        </div>
                    `;
                }
            }
        });

        modal.find('div.detail-post-caption').html(`
            <div id="carouselCaption" class="carousel slide"
            data-bs-interval="false" data-bs-touch="false">
                <div class="carousel-inner">${caption}</div>
            </div>
        `);

        // untuk 2 carousel 1 indikator 
        const carousel = $('div#carouselDetailsPost')
        $('button.carousel-control-prev', carousel).on('click', function (e) {
            e.preventDefault();
            $(carousel).carousel('prev');
            $('#carouselCaption').carousel('prev');
        });

        $('button.carousel-control-next', carousel).on('click', function (e) {
            e.preventDefault();
            $(carousel).carousel('next');
            $('#carouselCaption').carousel('next');
        });
    }

    // User Follow 
    $('a.follow').click(function (e) {
        e.preventDefault();
        follow(this);
    });

    function follow(button) {
        $(button).html(`
            <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        `);
        $(button).attr('disabled', '');

        $.ajax({
            type: "post",
            url: $(button).data('url'),
            data: {
                userID: $(button).data('user-id'),
                followedID: $(button).data('followed-id')
            },
            dataType: "json",
            success: function (response) {
                if (response.status === 200) {
                    // ubah button 
                    $('a.btn.follow').replaceWith(`
                        <a class="btn px-4 py-1 unfollow border border-secondary"><i class="bi bi-person-check-fill mx-2 text-muted" style="min-width:100px"></i></a>
                    `);

                    // ubah link di details modal
                    $('a.follow[role=button]').replaceWith('<a role="button" class="fw-bold unfollow">Following</a>');

                    // buat event
                    $('a.unfollow').click(function (e) {
                        e.preventDefault();
                        const modal = new bootstrap.Modal(document.getElementById('modalUnfollow'));
                        modal.show();
                    });

                    // edit jumlah follower
                    $('div#followers').html(response.followers);
                } else {
                    $(button).html('Follow');
                }

                $(button).removeAttr('disabled');
            }
        });
    }

    $('a.unfollow').click(function (e) {
        e.preventDefault();
        const modal = new bootstrap.Modal(document.getElementById('modalUnfollow'));
        modal.show();
    })

    $('a#unfollow').click(function (e) {
        e.preventDefault();
        // modal close
        $(this).parent().next().trigger('click');
        unfollow(this);
    })

    function unfollow(button) {
        console.log('unfollow');
        // tombol yang ditekan loading 
        $('a.btn.unfollow').html(`
            <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        `);

        $('a.unfollow[role=button]').html(`
            <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        `);

        // ajax
        $.ajax({
            type: "post",
            url: $(button).data('url'),
            data: {
                userID: $(button).data('user-id'),
                followedID: $(button).data('followed-id')
            },
            dataType: "json",
            success: function (response) {
                if (response.status === 200) {
                    // jika berhasil, ubah button menjadi sebelum di follow
                    $('a.btn.unfollow').replaceWith(`
                        <a class="btn follow btn-outline-red px-4 py-1" data-user-id="${response.userID}" data-url="user/follow" data-followed-id="${response.followedID}" style="min-width:100px">Follow</a>
                    `);

                    $('a.unfollow[role=button]').replaceWith(`
                        <a role="button" class="fw-bold follow text-primary" data-user-id="${response.userID}" data-url="user/follow" data-followed-id="${response.followedID}">Follow</a>
                    `);

                    // edit jumlah follower
                    $('div#followers').html(response.followers);

                    // buat event 
                    $('a.follow').click(function (e) {
                        e.preventDefault();
                        follow(this);
                    });
                }

                // tombol kembali semula 
                $('a.btn.unfollow').html(`
                    <i class="bi bi-person-check-fill mx-2 text-muted" style="min-width:100px"></i>
                `);

                $('a.unfollow[role=button]').html('Following');
            }
        });
    }

});
