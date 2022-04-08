$(document).ready(function () {
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
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 5000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                    if (response.status === 200) {
                        Toast.fire({
                            icon: 'success',
                            title: response.message
                        })
                        $('.img-user').attr('src', response.url);
                    } else if (response.status === 400) {
                        Toast.fire({
                            icon: 'success',
                            title: response.message
                        })
                    } else {
                        Toast.fire({
                            icon: 'success',
                            title: response.message
                        })
                    }
                },
                error: function (e) {
                    Toast.fire({
                        icon: 'success',
                        title: 'Failed'
                    })
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

    $('form#updateProfile').submit(function (e) {
        e.preventDefault();

        let form = this;

        $('button[type=submit]', form).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');

        $.ajax({
            method: "post",
            url: $(this).attr('action'),
            data: $(this).serialize(),
            dataType: "json",
            success: function (response) {
                $('button[type=submit]', form).html('Submit');

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                if (response.status === 200) {
                    // ubah username sebelah gambar mini
                    $('p.m-0').html($('input#username').val());
                    // ubah data sebelumnya menjadi yang terbaru
                    $('input#username', form).data('val', $('input#username', form).val());
                    $('input#email', form).data('val', $('input#email', form).val());
                    Toast.fire({
                        icon: 'success',
                        title: response.message
                    });
                } else {
                    // ubah input menjadi yang sebelumnya 
                    $('input#username', form).val($('input#username', form).data('val'));
                    $('input#email', form).val($('input#email', form).data('val'));
                    $('textarea#bio', form).val('');
                    Toast.fire({
                        icon: 'error',
                        title: response.message
                    });
                }
            }
        });
    });

    $('form#change-password').submit(function (e) {
        e.preventDefault();

        const form = this;

        $('button[type=submit]', this).attr('disabled', '');
        $('button[type=submit]', this).html(`
            <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        `);

        $.ajax({
            url: $(this).attr('action'),
            method: "post",
            data: $(this).serialize(),
            dataType: "json",
            success: function (response) {
                $('button[type=submit]', form).html('Change Password');
                $('button[type=submit]', form).removeAttr('disabled');

                // kosongkan input user
                $('form input').each(function (index, element) {
                    $(element).val('');
                });

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'bottom',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                });

                if (response.status === 200) {
                    Toast.fire({
                        icon: 'success',
                        title: response.message
                    })
                } else if (response.status === 400) {
                    Toast.fire({
                        icon: 'warning',
                        title: response.message
                    })
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: response.message
                    })
                }
            },
            error: function (error) {
                $('button[type=submit]', form).html('Change Password');
                $('button[type=submit]', form).removeAttr('disabled');
            }
        });
    })
});
