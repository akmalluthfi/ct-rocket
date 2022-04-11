$(document).ready(function () {
    const toast = $('div.toast#toast').data('toast').split('|');

    if (toast.length === 4) {
        if (toast[0] === 'success') {
            iziToast.success({
                timeout: toast[1],
                title: toast[2],
                message: toast[3],
            });
        } else if (toast[0] === 'warning') {
            iziToast.warning({
                timeout: toast[1],
                title: toast[2],
                message: toast[3],
            });
        } else if (toast[0] === 'info') {
            iziToast.info({
                timeout: toast[1],
                title: toast[2],
                message: toast[3],
            });
        } else if (toast[0] === 'error') {
            iziToast.error({
                timeout: toast[1],
                title: toast[2],
                message: toast[3],
            });
        }
    }

    $('form#formRegister').validate({
        rules: {
            username: {
                required: true,
                minlength: 3,
                remote: {
                    url: document.baseURI + 'sign-up/usernameExists',
                    method: 'post',
                    dataType: 'json',
                    data: {
                        username: function () {
                            return $('#username').val();
                        }
                    }
                }
            },
            email: {
                required: true,
                email: true,
                remote: {
                    url: document.baseURI + 'sign-up/emailExists',
                    method: 'post',
                    dataType: 'json',
                    data: {
                        email: function () {
                            return $('#email').val();
                        }
                    }
                }
            },
            password: {
                required: true,
                minlength: 8
            },
            confirmPassword: {
                required: true,
                minlength: 8,
                equalTo: '#password'
            }
        },
        validClass: "is-valid",
        errorElement: 'em',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            // error.appendTo(element);
            error.appendTo(element.parent());
        },
        // debug: true,
        submitHandler: function (form, event) {
            event.preventDefault();
            $.ajax({
                url: $(form).attr('action'),
                method: 'post',
                data: $(form).serialize(),
                dataType: 'json',
                success: function (response) {
                    if (response.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Registration successful!',
                            text: 'Please login first to continue'
                        }).then((result) => {
                            window.location.replace(document.baseURI + 'sign-in');
                        });
                    } else {
                        iziToast.error({
                            timeout: 5000,
                            title: response.status,
                            message: response.message,
                        });
                    }
                },
                error: function (response) {
                    console.log(response);
                }
            });
        }
    });

    $('form#formLogin').validate({
        submitHandler: function (form, event) {
            event.preventDefault();

            $('button[type=submit]', form).html(`
                <div class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            `);

            $.ajax({
                url: $(form).attr('action'),
                method: 'post',
                data: $(form).serialize(),
                dataType: 'json',
                success: function (response) {
                    $('button[type=submit]', form).html('Sign Up');
                    if (response.status === 200) {
                        // swal.fire, redirect ke halaman home
                        window.location.replace(document.baseURI);
                    } else {
                        $('div.invalid-feedback').empty().append(
                            `<em class="d-block">` + response.message + `</em>
                        `);
                        // Swal.fire({
                        //     icon: 'error',
                        //     title: 'Error',
                        //     text: response.message
                        // });
                    }
                },
                error: function (response) {
                    console.log(response);
                    $('button[type=submit]', form).html('Sign Up');
                    $('div.invalid-feedback').empty().append(
                        `<em class="d-block">` + response.statusText + `, Sory, try again later</em>
                    `);
                }
            })
        },
        rules: {
            username: {
                minlength: 3,
                required: true,
            },
            password: {
                minlength: 8,
                required: true
            }
        },
        validClass: 'is-valid',
        errorElement: 'em',
        errorPlacement: function (error, element) {
            // error.addClass('');
            $('div.invalid-feedback').empty().append(error);
        },
        groups: {
            all: "username password"
        },
        messages: {
            username: {
                required: 'username cannot be empty'
            },
            password: {
                required: 'password cannot be empty'
            }
        }
    });

    $('form#formUpdateProfilePicture').on('change', function () {

        // input form 
        let file = $('input[type=file]', this);
        let username = $('input[type=hidden]', this);

        let fd = new FormData();

        if (file[0].files.length > 0) {
            fd.append(file.attr('name'), file[0].files[0]);
            fd.append(username.attr('name'), username.val());

            // run ajax
            $('#updateProfile').modal('hide');
            $('#img-loading').removeClass('visually-hidden');
            $.ajax({
                url: $(this).attr('action'),
                data: fd,
                method: 'post',
                dataType: 'json',
                contentType: false,
                processData: false,
                success: function (response) {
                    $('#img-loading').addClass('visually-hidden');
                    if (response.status === 200) {
                        iziToast.success({
                            timeout: 7500,
                            title: 'Success',
                            message: response.message,
                        });
                        $('.img-user').attr('src', response.url);
                    } else if (response.status === 400) {
                        iziToast.warning({
                            timeout: 7500,
                            title: 'Warning!',
                            message: response.message,
                        });
                    } else {
                        iziToast.error({
                            timeout: 7500,
                            title: 'Error!',
                            message: response.message,
                        });
                    }
                },
                error: function (e) {
                    console.log(e);
                }
            });

            $(this).siblings().last().trigger('click');
        } else {
            // tidak ada file yang dikirm
            iziToast.warning({
                timeout: 7500,
                title: 'Warning!',
                message: 'Upload an image',
            });
        }

    });

    $('a#logout').on('click', function (e) {
        e.preventDefault();
        iziToast.warning({
            timeout: 60000,
            title: 'Sign Out',
            message: 'Are you sure you would like to sign out?',
            overlay: true,
            overlayClose: true,
            zindex: '9999',
            position: 'center',
            layout: 2,
            closeOnEscape: true,
            progressBar: false,
            icon: 'fa-solid fa-arrow-right-from-bracket',
            buttons: [
                ['<button>Sign Out</button>', function (instance, toast) {
                    // pindah halaman sesuai href
                    window.location.replace($('a#logout').attr('href'));
                    // hilangkan toast
                    instance.hide({
                        transitionOut: 'fadeOutUp'
                    }, toast, 'buttonName');
                }], // true to focus
                ['<button>Cancel</button>', function (instance, toast) {
                    instance.hide({
                        transitionOut: 'fadeOutUp',
                        onClosing: function (instance, toast, closedBy) {
                            console.info('closedBy: ' + closedBy); // The return will be: 'closedBy: buttonName'
                        }
                    }, toast, 'buttonName');
                }, true]
            ]
        });
    });

    $('form#updateProfile').on('input', function () {
        $(this).validate({
            rules: {
                username: {
                    required: true,
                    minlength: 3
                },
                email: {
                    required: true,
                    email: true
                }
            },
            errorPlacement: function () {},
            submitHandler: function (form, event) {
                event.preventDefault();
                // effect 
                $('button[type=submit]', form).html(`
                    <div class="spinner-border spinner-border-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                `);
                $.ajax({
                    url: $(form).attr('action'),
                    method: "post",
                    data: $(form).serialize(),
                    dataType: "json",
                    success: function (response) {
                        $('button[type=submit]', form).html('Submit');
                        if (response.status === 200) {
                            iziToast.success({
                                timeout: 5000,
                                title: 'Success',
                                message: response.message
                            });
                            // ubah username sebelah gambar mini
                            $('p.m-0').html($('input#username').val());
                            // ubah data sebelumnya menjadi yang terbaru
                            $('input#username', form).data('val', $('input#username', form).val());
                            $('input#email', form).data('val', $('input#email', form).val());
                        } else {
                            iziToast.warning({
                                timeout: 5000,
                                title: 'Error!',
                                message: response.message,
                            });
                            // ubah input menjadi yang sebelumnya 
                            $('input#username', form).val($('input#username', form).data('val'));
                            $('input#email', form).val($('input#email', form).data('val'));
                        }
                    },
                    error: function (error) {
                        $('button[type=submit]', form).html('Submit');
                        console.log(error);
                        console.log(error.statusText);
                    }
                });
            }
        });

        if ($(this).valid()) {
            $('button#btn-updateProfile').removeAttr('disabled');
        } else {
            $('button#btn-updateProfile').attr('disabled', '');
        }

    });

    $('form#changePassword').on('input', function () {
        $(this).validate({
            rules: {
                oldPassword: "required",
                newPasswors: "required",
                confPassword: "required"
            },
            errorPlacement: function () {},
            submitHandler: function (form, event) {
                // effect 
                $('button[type=submit]', form).html(`
                    <div class="spinner-border spinner-border-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                `);
                event.preventDefault();
                $.ajax({
                    url: $(form).attr('action'),
                    method: "post",
                    data: $(form).serialize(),
                    dataType: "json",
                    success: function (response) {
                        $('button[type=submit]', form).html('Change Password');
                        if (response.status === 200) {
                            iziToast.success({
                                timeout: 5000,
                                title: 'Success',
                                message: response.message
                            });
                            // kosongkan input user
                            $('form input').each(function (index, element) {
                                $(element).val('');
                            });
                        } else if (response.status === 400) {
                            iziToast.warning({
                                timeout: 5000,
                                title: 'Warning!',
                                message: response.message
                            });
                        } else {
                            iziToast.error({
                                timeout: 5000,
                                title: 'Error!',
                                message: response.message,
                            });
                        }
                    },
                    error: function (error) {
                        $('button[type=submit]', form).html('Change Password');
                        console.log(error);
                        console.log(error.statusText);
                    }
                });
            }
        });

        if ($(this).valid()) {
            $('button[type=submit]', this).removeAttr('disabled');
        } else {
            $('button[type=submit]', this).attr('disabled', '');
        }
    })

    let count = 0;
    let path;
    let allPath = [];
    let fd = new FormData();
    // Upload image 
    $('.uploadImage').on('change', function () {

        let fileType = this.files[0].type;
        fileType = fileType.split('/')[1];

        // buat ekstensi valid
        const validType = ['jpg', 'jpeg', 'png'];
        // ambil ekstensi file user 
        if (validType.includes(fileType)) {
            // tambah counter
            count++;
            // cek apakah ada file yang diupload 
            // ambil carousel dari modal ke 2

            if (this.files.length) {
                // jika ada, buat object url 
                path = URL.createObjectURL(this.files[0]);
                allPath.push(path);

                // tambahkan file ke fd 
                fd.append('file-' + (count - 1), $(this)[0].files[0]);

                getImageCarousel($('div#carouselAddPost'));

                $(this).val('');
            } else {
                // jika tidak ada yang dikirimkan 
                console.log('not');
            }

            $('form.formUploadImage').prev().html(`
                <img src="images/media.png" alt="media" width="100px" class="mb-3 d-block mx-auto">
            `)
        } else {
            // cek apakah dia yang pertama 
            if (count === 0) {
                // jika tidak valid
                $('form.formUploadImage').prev().html(`
                    <i class="fa-solid fa-circle-exclamation mb-5 text-secondary" style="font-size: 100px"></i>
                    <h3 class="fw-light">This file is not supported</h3>
                    <p class="mb-3">${this.files[0].name} could not be uploaded</p>
                `);
                $(this).html('Select Other Files');
                $(this).prev().removeClass('mt-5');
            }
            // upload not img dan bukan yang pertama, jangan lakukan apapun
        }
    })

    function getImageCarousel(carousel) {
        // tambahkan gambar kecil 
        $('div#miniImg').append(`
            <div class="col-2 mb-3 text-center">
                <img src="` + path + `" alt="` + (count - 1) + `" width="50px">
            </div>
            <div class="col-9 mb-3">
                <input type="text" class="w-100 h-100" placeholder="Write alt text" name="` + 'captionImg-' + (count - 1) + `">
            </div>
        `);

        if (count === 1) {
            // lalu click tombol next
            $('button#btn-postImage').trigger('click');
            // cari gambarnya, lalu ubah 
            $('.carousel-inner', carousel).append(`
                <div class="carousel-item active">
                    <img src="` + path + `" class="d-block w-100" alt="...">
                </div>
            `);
        } else if (count === 2) {
            // jika sudah yang kedua, tambahkan indicator untuk yang pertama dan yang kedua 
            $('.carousel-indicators', carousel).append(`
                <button type="button" data-bs-target="#carouselAddPost" data-bs-slide-to="` + (count - 2) + `" class="active" aria-current="true" aria-label="Slide ` + (count - 1) + `"></button>
            `);

            $('.carousel-indicators', carousel).append(`
                <button type="button" data-bs-target="#carouselAddPost" data-bs-slide-to="` + (count - 1) + `" aria-label="Slide ` + count + `"></button>
            `);

            // tambahkan control
            $(carousel).append(`
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselAddPost" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselAddPost" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            `);

            // tambah gambar baru 
            $('.carousel-inner', carousel).append(`
                <div class="carousel-item">
                    <img src="` + path + `" class="d-block w-100" alt="...">
                </div>
            `);
        } else {
            // jika lebih dari 2 kali
            // tambahkan indicator baru
            $('.carousel-indicators', carousel).append(
                `<button type="button" data-bs-target="#carouselAddPost" data-bs-slide-to="` + (count - 1) + `" aria-label="Slide ` + count + `"></button>
`
            );
            // tambahkan gambar baru
            $('.carousel-inner', carousel).append(`
                <div class="carousel-item">
                    <img src="` + path + `" class="d-block w-100" alt="...">
                </div>
            `);
        }
    }

    $('.modal-close').click(function (e) {
        $.each(allPath, function (index, value) {
            URL.revokeObjectURL(value);
        });
        $('div#carouselAddPost').children('.carousel-indicators').children().remove();
        $('div#carouselAddPost').children('.carousel-inner').children().remove();
        $('div#carouselAddPost').children('.carousel-inner').nextAll().remove();
        $('div#miniImg').children().remove();
        count = 0;
        allFiles = [];
        allPath = [];
    });


    // Input category
    let categories = new Taggle('categories', {
        duplicateTagClass: 'bounce',
        placeholder: 'Masukkan Tags'
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
    // end input category

    $('button#btn-sendPost').click(function (e) {
        e.preventDefault();

        const form = $('form#sendPost');
        // tambahkan juga img caption
        $('div#miniImg input').each(function (index, element) {
            // element == this
            fd.append($(this).attr('name'), $(this).val());
        });

        $.each(categories.getTagValues(), function (i, val) {
            fd.append('categories[]', val);
        });

        fd.append($('textarea', form).attr('name'), $('textarea', form).val());

        // saat melakukan ajax dan mengunngu respon, ubah tampilannya menjadi loading 
        $.ajax({
            method: "post",
            url: form.attr('action'),
            data: fd,
            dataType: "json",
            contentType: false,
            processData: false,
            success: function (response) {
                // matikan loading
                // click tombol close 
                $('.modal-close').trigger('click');
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: response.message
                    }).then((result) => {
                        // arahkan ke halaman home
                        window.location.replace(document.baseURI);
                    })

                } else {
                    iziToast.warning({
                        timeout: 7500,
                        title: 'Failed',
                        message: response.message,
                    });
                }
            }
        });
    });

    $('.modal-detailPost').on('click', function () {
        $('div.image-post').html(`
            <div class="modal-body h-100 bg-img p-0 d-flex align-items-center"></div>
        `);

        $.ajax({
            method: "post",
            url: $(this).data('link'),
            data: {
                id: $(this).data('id')
            },
            dataType: "json",
            success: function (response) {
                if (response.status === 200) {
                    let data = response.data;
                    // cek apakah gambar lebih dari satu 
                    if (data.total === 1) {
                        let imgLink;
                        let imgCaption;
                        $.each(data.images, function (index, val) {
                            imgLink = val.imgLink;
                            imgCaption = val.imgCaption;
                        });

                        $('div.image-post').html(`
                            <div class="modal-body h-100 bg-img p-0 d-flex align-items-center">
                                <img src="${imgLink}" class="card-img-top" alt="...">
                            </div>
                        `);

                        if (imgCaption) {
                            // $('div#detail-post-caption').html(imgCaption);
                            let categories = '';
                            $.each(data.categories, function (i, val) {
                                categories += '<a href="" class="text-decoration-none">#' + val + ' </a>';
                            });
                            $('div#detail-post-caption').html(`
                                <p class="card-text"><span class="fw-bold">${data.author}</span><span id="detail-post-caption">${imgCaption}</span>
                                </p>
                                <p class="card-text">${categories}</p>
                            `);
                        } else {
                            let categories = '';
                            $.each(data.categories, function (i, val) {
                                categories += '<a href="" class="text-decoration-none">#' + val + ' </a>';
                            });
                            $('div#detail-post-caption').html(`
                                <p class="card-text"><span class="fw-bold">${data.author} </span><span id="detail-post-caption">${data.caption}</span>
                                </p>
                                <p class="card-text">${categories}</p>
                            `);
                        }

                    } else {
                        // kalau gambar lebih dari 1  
                        let img;
                        let button;
                        let captionHolder;
                        $.each(data.images, function (index, val) {
                            // jika itu gambar yang pertama
                            if (index === 0) {
                                button = `
                                    <button type="button" data-bs-target="#carouselDetailsPost" data-bs-slide-to="${index}" class="active" aria-current="true" aria-label="Slide ${(index + 1)}"></button>
                                `;

                                img = `
                                    <div class="carousel-item active">
                                        <img src="${val.imgLink}" class="d-block w-100" alt="...">
                                    </div>
                                `;

                                let caption;
                                if (val.imgCaption) {
                                    caption = val.imgCaption;
                                } else {
                                    caption = data.caption;
                                }

                                let categories = '';
                                $.each(data.categories, function (i, val) {
                                    categories += '<a href="" class="text-decoration-none">#' + val + ' </a>';
                                });
                                captionHolder = `
                                    <div class="carousel-item active">
                                        <p class="card-text"><span class="fw-bold">${data.author} </span><span>${caption}</span>
                                        <p class="card-text">${categories}</p>
                                    </div>
                                `;
                            } else {
                                button += `
                                    <button type="button" data-bs-target="#carouselDetailsPost" data-bs-slide-to="${index}" aria-label="Slide ${(index + 1)}"></button>
                                `;

                                img += `
                                    <div class="carousel-item">
                                        <img src="${val.imgLink}" class="d-block w-100" alt="...">
                                    </div>
                                `;

                                let caption;
                                if (val.imgCaption) {
                                    caption = val.imgCaption;
                                } else {
                                    caption = data.caption;
                                }

                                let categories = '';
                                $.each(data.categories, function (i, val) {
                                    categories += '<a href="" class="text-decoration-none">#' + val + ' </a>';
                                });
                                captionHolder += `
                                    <div class="carousel-item">
                                        <p class="card-text"><span class="fw-bold">${data.author} </span><span>${caption}</span>
                                        </p>
                                        <p class="card-text">${categories}</p>
                                    </div>
                                `;
                            }
                            // akhir foreach gambar
                        });

                        $('div#detail-post-caption').html(`
                            <div id="carouselCaptionUser" class="carousel slide" data-bs-ride="carousel" data-bs-touch="false" data-bs-interval="false">
                                <div class="carousel-inner">
                                    <!-- Tempat banyak caption -->
                                    ${captionHolder}
                                </div>
                                <button class="carousel-control-prev visually-hidden" type="button" data-bs-target="#carouselCaptionUser"
                                    data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next visually-hidden" type="button" data-bs-target="#carouselCaptionUser"
                                    data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        `);

                        // ubah gambar menjadi carousel
                        $('div.image-post').html(`
                            <div class="modal-body p-0 h-100">
                                <div class="ratio ratio-4x3 bg-img h-100">
                                    <div class="h-100 d-flex align-items-center justify-content-center">
                                        <div id="carouselDetailsPost" class="carousel slide" data-bs-touch="false"
                                            data-bs-interval="false">
                                            <div class="carousel-indicators">
                                                ${button}
                                            </div>
                                            <div class="carousel-inner">
                                                ${img}
                                            </div>
                                            <button class="carousel-control-prev" type="button"
                                                data-bs-target="#carouselDetailsPost" data-bs-slide="prev">
                                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Previous</span>
                                            </button>
                                            <button class="carousel-control-next" type="button"
                                                data-bs-target="#carouselDetailsPost" data-bs-slide="next">
                                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `);
                    }

                } else {
                    // jika status bukan 200
                    iziToast.error({
                        timeout: 5000,
                        title: response.status,
                        message: response.message,
                    });
                }
            }
        });
    });

    $('div.image-post').on('click', function (e) {
        const nextCaptionDetail = $('span.carousel-control-next-icon', this)[0].classList[0];
        const prevCaptionDetail = $('span.carousel-control-prev-icon', this)[0].classList[0];
        const btnNextCaptionDetail = $('button.carousel-control-next', this)[0].classList[0];
        const btnPrevCaptionDetail = $('button.carousel-control-prev', this)[0].classList[0];

        if (e.target.classList[0] === nextCaptionDetail || e.target.classList[0] === btnNextCaptionDetail) {
            let target = e.target;

            $(target).parents('div.image-post').next().children('div.card-body').children('div#carouselCaptionUser').children('button.carousel-control-next').trigger('click');

        } else if (e.target.classList[0] === prevCaptionDetail || e.target.classList[0] === btnPrevCaptionDetail) {
            let target = e.target;

            $(target).parents('div.image-post').next().children('div.card-body').children('div#carouselCaptionUser').children('button.carousel-control-prev').trigger('click');
        }
    });

    $('a.btn-collapse').on('click', function () {
        $(this).siblings('span.hide').remove();
        $(this).remove();
    });

    $('.myCarousel').on('click', function (e) {

        const nextCaption = $('span.carousel-control-next-icon', this)[0].classList[0];
        const prevCaption = $('span.carousel-control-prev-icon', this)[0].classList[0];
        const btnNextCaption = $('button.carousel-control-next', this)[0].classList[0];
        const btnPrevCaption = $('button.carousel-control-next', this)[0].classList[0];

        if (e.target.classList[0] === nextCaption || e.target.classList[0] === btnNextCaption) {
            let target = e.target;
            $(target).parentsUntil('div.card').last().next().children('button.carousel-control-next').children('span.carousel-control-next-icon').trigger('click');
        } else if (e.target.classList[0] === prevCaption || e.target.classList[0] === btnPrevCaption) {
            let target = e.target;
            $(target).parentsUntil('div.card').last().next().children('button.carousel-control-prev').children('span.carousel-control-prev-icon').trigger('click');
        }

    });

    // Google Signin 
    startApp();

    function startApp() {
        gapi.load('auth2', function () {
            auth2 = gapi.auth2.init({
                client_id: '887438697768-jotrqkhqegh4o6d0elnum79h5snicimp.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin'
            });
            attachSignup($('button#gSignUp')[0]);
            attachSignin($('button#gSignIn')[0]);
        });
    }

    function attachSignup(element) {
        auth2.attachClickHandler(element, {}, function (googleUser) {
                // jika berhasil login
                let profile = googleUser.getBasicProfile()

                $.ajax({
                    url: $('form#formRegister').attr('action'),
                    method: 'post',
                    data: {
                        username: profile.getName(),
                        email: profile.getEmail(),
                        picture: profile.getImageUrl(),
                        token: profile.getId()
                    },
                    dataType: 'json',
                    success: function (response) {
                        if (response.status === 200) {
                            // redirect ke halaman account untuk merubah password
                            Swal.fire({
                                icon: 'success',
                                title: 'Your account has been created',
                                text: "Your password now is 'password', you can change after sign-in or you can sign-in with google"
                            }).then((result) => {
                                window.location.replace(document.baseURI + 'sign-in');
                            });
                        } else {
                            iziToast.error({
                                timeout: 5000,
                                title: response.status,
                                message: response.message,
                            });
                        }
                    },
                    error: function (error) {
                        console.error(error);
                    }
                });

            },
            function (error) {
                console.log(error);
                // jika gagal login
            })
    }

    function attachSignin(element) {
        auth2.attachClickHandler(element, {}, function (googleUser) {
            let profile = googleUser.getBasicProfile();
            $.ajax({
                url: $('form#formLogin').attr('action'),
                method: 'post',
                data: {
                    username: profile.getName(),
                    token: profile.getId()
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status === 200) {
                        // swal.fire, redirect ke halaman home
                        window.location.replace(document.baseURI);
                    } else {
                        iziToast.error({
                            timeout: 5000,
                            title: response.status,
                            message: response.message,
                        });
                    }
                },
                error: function (error) {
                    console.error(error);
                }
            })
        }, function (error) {
            console.log(error);
        });
    }
    // end google signin






})
