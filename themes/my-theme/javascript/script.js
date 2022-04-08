$(document).ready(function () {
    // Navbar active
    let navActive;
    $('#navbarDropdown').on('show.bs.dropdown', function () {
        navActive = $('.nav-link.active').removeClass('active');
        let img = $(this).children('img.nav-profile-user');
        if (!img.hasClass('active')) {
            img.addClass('active');
            img.data('active', true);
        }
    })

    $('#navbarDropdown').on('hide.bs.dropdown', function () {
        let img = $(this).children('img.nav-profile-user');

        if (img.data('active')) {
            img.removeClass('active');
            $(navActive).addClass('active');
        }
    });

    // Modal Add Post
    let fields = {}; //untuk menyimpan input user 
    fields.images = []; // untuk gambar 

    let allPath = []; // untuk menyimpan semua path files 
    let modal = $('div#AddPost'); // modal addPost

    // Cek apakah yang file itu gambar
    function isImage(file) {
        // ambil ekstensi dari file yang dikirimkan 
        let fileType = file.type;
        fileType = fileType.split('/')[1];

        // buat ekstensi valid
        const validType = ['jpg', 'jpeg', 'png'];

        if (validType.includes(fileType)) return true;

        return false;
    }

    // untuk menambahkan carousel di modal-body
    function showImageCarousel(form) {
        // ambil input dari user
        let input = $('input', form)[0].files[0];
        // cek apakah dia valid 
        if (isImage(input)) {
            let path = URL.createObjectURL(input);
            allPath.push(path);
            // tambahkan ke form data untuk dikirimkan 
            fields.images.push(input);

            let carouselbutton;
            let carouselImage;

            $.each(allPath, function (i, val) {
                if (i === 0) {
                    carouselbutton = `
                        <button type="button" data-bs-target="#carouselAddPost" data-bs-slide-to="${i}" class="active" aria-current="true" aria-label="Slide ${i+1}"></button>
                    `;

                    carouselImage = `
                    <div class="carousel-item active">
                        <div class="p-0 ratio ratio-1x1">
                            <div class="modal-uploadImage" style="background-image: url(${val});"></div>
                        </div>
                    </div>
                    `;
                } else {
                    carouselbutton += `
                        <button type="button" data-bs-target="#carouselAddPost" data-bs-slide-to="${i}" aria-label="Slide ${i+1}"></button>
                    `;

                    carouselImage += `
                        <div class="carousel-item">
                            <div class="p-0 ratio ratio-1x1">
                                <div class="modal-uploadImage" style="background-image: url(${val});"></div>
                            </div>
                        </div>
                    `;
                }
            });

            $('div.modal-body', modal).html(`
                <div id="carouselAddPost" class="carousel slide modal-body-carousel" data-bs-interval="false">
                    <div class="carousel-indicators">${carouselbutton}</div>
                    <div class="carousel-inner">${carouselImage}</div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselAddPost"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselAddPost"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            `)
        }
    }

    // untuk menyimpan path ke allpath 
    function showImage(form) {
        // ambil input dari user
        let input = $('input', form)[0].files[0];

        // cek apakah dia valid
        if (isImage(input)) {
            // buat path object 
            let path = URL.createObjectURL(input);
            // tambahkan ke variable allPath 
            allPath.push(path);
            // Tambahkan ke form data untuk dikirimkan
            fields.images.push(input);

            // tampilkan img
            $(form).parent().replaceWith(`
                <div class="modal-body p-0 ratio ratio-1x1">
                    <div class="modal-uploadImage" style="background-image: url(${path});"></div>
                </div>
            `);
            // tambahkan footer 
            $('div.modal-footer', modal).html(`
                <form class="reUpload" enctype="multipart/form-data">
                    <label for="postImage">
                        <i class="bi bi-plus-circle fs-2" role="button"></i>
                    </label>
                    <input class="form-control visually-hidden uploadImage" type="file" id="postImage" name="postImage">
                </form>
                <a href="" class="text-primary px-3">Next</a>
            `);
            // beri event pada form didalam footer
            $('div.modal-footer form.reUpload', modal).change(function (e) {
                e.preventDefault();
                showImageCarousel(this);
            });

            // beri event ketika tombol next ditekan 
            $('div.modal-footer a').click(function (e) {
                e.preventDefault();
                next(this);
            });
        } else {
            // yang diupload bukan gambar 
            $(form).prev().html(`
                <i class="bi bi-exclamation-circle" style="font-size: 96px;line-height: 94px;"></i>
                <h3 class="fw-light mt-3 mb-0">This file is not supported</h3>
                <p class="mt-3 mb-0">${input.name} could not be uploaded</p>
            `);

            $('input#uploadImage', form).html('Select Other Files');
        }
    }

    // ketika modal awal dikirim
    $('div.modal-body form.formUploadImage', modal).change(function (e) {
        e.preventDefault();
        showImage(this);
    });

    // ketika modal diclose
    $(modal).on('hidden.bs.modal', function () {
        // hapus semua object url
        $.each(allPath, function (index, value) {
            URL.revokeObjectURL(value);
        });
        // kosongkan fields
        fields = {};
        fields.images = [];
        // kosongkan array allPath
        allPath = [];
        // reset modal-header
        $(modal).children('div.modal-dialog').removeClass('modal-lg');
        $('div.modal-content', modal).removeAttr('style');
        $('div.modal-content', modal).css('max-width', '390px');
        $('div.modal-header h5', modal).html('Create new post');
        $('div.modal-header h5', modal).removeClass('text-center');
        // kosongkan modal-footer 
        $('div.modal-footer', modal).html('');
        // kembalikan modal-body seperti semula 
        $('div.modal-body', modal).replaceWith(`
            <div class="modal-body d-flex align-items-center flex-column justify-content-center overflow-hidden" style="min-height: 388px;">
                <div class="text-center">
                    <i class="bi bi-images" style="font-size: 96px;line-height: 94px;"></i>
                </div>
                <form class="formUploadImage my-4">
                    <label for="uploadImage" class="btn btn-primary" role="button">Select from computer</label>
                    <input class="form-control visually-hidden uploadImage" type="file" id="uploadImage" name="uploadImage">
                </form>
            </div>
        `);
        // lalu beri event 
        $('div.modal-body form.formUploadImage').change(function (e) {
            e.preventDefault();
            showImage(this);
        });
    });

    // ketika tombol next ditekan 
    function next() {
        $(modal).children('div.modal-dialog').addClass('modal-lg');
        $('div.modal-content', modal).removeAttr('style');
        $('div.modal-header h5', modal).html('Create new post');
        $('div.modal-header h5', modal).addClass('text-center');

        $('div.modal-body', modal).removeClass().addClass('modal-body p-0 d-lg-flex');
        $('div.modal-body', modal).css('min-heigth', '388px');

        $('div.modal-body', modal).html(`
            <div class="col-auto p-0 ratio ratio-1x1 mx-auto" style="max-width: 388px;">
                ${$('div.modal-body', modal).html()}
            </div>
        `);

        $('div.modal-body', modal).append(`
            <div class="col" style="overflow-x: hidden;overflow-y: auto;">
                <form class="row h-75 m-0" action="{$Link}uploadPost" id="sendPost">
                    <div class="col-2 text-center mt-3">
                        <img src="images/akmal.png" alt="name" width="28px" class="rounded-circle">
                    </div>
                    <div class="col-10 d-flex align-items-center ps-0 mt-3">
                        <h6 class="m-0">akmalluthfi</h6>
                    </div>
                    <div class="col-12 my-3 p-0">
                        <div class="border rounded h-100 position-relative p-2" id="categories"></div>
                    </div>
                    <div class="h-100 col-12 mb-0 p-0">
                        <textarea class="form-control h-100" id="caption" name="caption" rows="" style="border: none;" placeholder="Write a caption..." required></textarea>
                    </div>
                    <div class="col-12 p-0">
                        <div style="border-top: 1px solid rgba(206, 212, 218)">
                            <div class="py-2 text-center fw-bold" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseModal" aria-expanded="false"
                                aria-controls="collapseModal">
                                Accessibility
                            </div>
                            <div class="collapse" id="collapseModal">
                                <div class="row row-cols-2 justify-content-center" id="miniImg"></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        `);

        $.each(allPath, function (index, val) {
            $('div#miniImg').append(`
            <div class="col-auto mb-3 ps-4 pe-0">
                <div class="p-0 ratio ratio-1x1" style="min-width: 44px;">
                    <div class="modal-uploadImage" style="background-image: url(${val});"></div>
                </div>
            </div>
            <div class="col-sm-10 col-9 mb-3 pe-4 ps-1">
                <input type="text" class="w-100 h-100" placeholder="Write alt text"
                    name="description-${index}">
            </div>
            `);
        });

        $('div.modal-footer').html(`
            <a href="" class="text-primary px-3 py-2 create">Share</a>
        `);

        // berikan event 
        $('div.modal-footer a.create').click(function (e) {
            e.preventDefault();
            // dapatkan input user dari tags
            fields.categories = categories.getTagValues();
            create();
        });

        //Input category
        let categories = new Taggle('categories', {
            duplicateTagClass: 'bounce',
            placeholder: 'Tags (Enter comma-separated values)'
        });
        let container = categories.getContainer();
        let input = categories.getInput();

        $('div#modalCaption').on('shown.bs.modal', function () {
            $.ajax({
                url: document.baseURI + 'user/getAllCategories',
                dataType: 'json',
                success: function (response) {
                    $(input).autocomplete({
                        source: response,
                        appendTo: container,
                        position: {
                            at: 'left bottom',
                            of: container
                        },
                        select: function (event, data) {
                            event.preventDefault();
                            // add the tag when user click
                            if (event.which === 1) {
                                categories.add(data.item.value);
                            }
                        }
                    })
                },
                error: function (error) {
                    console.log(error);
                }
            });
        });
    }

    function create() {
        let fd = new FormData(); // untuk menyimpan input user yang akan dikirim ke controller 

        // tambahkan image ke form data 
        $.each(fields.images, function (index, val) {
            fd.append('image-' + index, val);
        });
        // tambahkan categories 
        $.each(fields.categories, function (index, val) {
            fd.append('categories[]', '#'.val);
        });

        let form = $('div.modal-body form', modal);

        // tambahkan caption post
        fd.append('caption', $('textarea#caption', form).val());

        // tambahkan input untuk gambar 
        $('div#miniImg input', form).each(function (index, element) {
            fd.append($(this).attr('name'), $(this).val());
        })

        $.ajax({
            url: document.baseURI + 'post/make',
            method: "post",
            data: fd,
            dataType: "json",
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.status !== 200) {
                    console.log(response);
                    return;
                }
                // tutup modal
                $('button[type=button]', modal).trigger('click');

                Swal.fire({
                    icon: 'success',
                    title: 'Post shared',
                    text: response.message
                }).then((result) => {
                    window.location.reload();
                })
            }
        });
    }

    // Logout
    $('a.logout').click(function (e) {
        e.preventDefault();

        Swal.fire({
            icon: 'warning',
            title: 'Logging out?',
            text: "You need to log back in",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout'
        }).then((result) => {
            if (result.isConfirmed) {
                $.get(document.baseURI + 'accounts/logout', function () {
                    window.location.replace(document.baseURI + 'login');
                });
            }
        })
    })

    // Search
    $('input#search').autocomplete({
        source: document.baseURI + 'post/getPosts',
        select: function (event, ui) {
            let keyword = ui.item.value;

            if (keyword.charAt(0) === '#') {
                window.location.replace('explore/tags/' + keyword.substring(1));
            } else {
                window.location.replace(ui.item.value);
            }
        }
    });
});
