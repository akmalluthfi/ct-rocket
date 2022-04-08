$(document).ready(function () {
    $('#form-login').submit(function (e) {
        e.preventDefault();

        let form = this;

        $('button[type=submit]', form).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');

        $.ajax({
            method: "post",
            url: $(this).attr('action'),
            data: $(this).serialize(),
            dataType: "json",
            success: function (response) {
                $('button[type=submit]', form).html('Login');

                if (response.status === 200) return window.location.replace(document.baseURI);

                $('input[type=hidden]', form).addClass('is-invalid');
                $('input[type=hidden]', form).next().html(response.message);
                $('input[type="password"]', form).val('');
            },
            error: function (err) {
                $('button[type=submit]', form).html('Register');

                console.error(err);
            }
        });
    });
});
