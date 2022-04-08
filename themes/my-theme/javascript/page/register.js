$(document).ready(function () {
    $('#form-register').submit(function (e) {
        e.preventDefault();

        let form = this;

        $('button[type=submit]', form).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');

        $.ajax({
            method: "post",
            url: $(this).attr('action'),
            data: $(this).serialize(),
            dataType: "json",
            success: function (response) {
                $('button[type=submit]', form).html('Register');

                if (response.status !== 200) {
                    $('input[type=hidden]', form).addClass('is-invalid');
                    console.log($('input[type=hidden]', form).next());
                    $('input[type=hidden]', form).next().html(response.message);
                    return;
                }

                // redirect halaman login
                Swal.fire({
                    icon: 'success',
                    title: response.message,
                    text: 'Please login first to continue',
                }).then((result) => {
                    window.location.replace(document.baseURI + 'login');
                });
            },
            error: function (err) {
                $('button[type=submit]', form).html('Register');

                console.error(err);
            }
        });

    });
});
