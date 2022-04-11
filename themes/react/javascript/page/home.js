$(document).ready(function () {
    // Collapse Caption
    $('a.btn-collapse').click(function () {
        $(this).siblings('span.hide').remove();
        $(this).remove();
    });

    // untuk 2 carousel 1 indikator 
    const carousel = $('div.carousel-post');
    $('button.carousel-control-prev', carousel).on('click', function (e) {
        e.preventDefault();
        $(this).parent().next().find('div.carousel-post-caption').carousel('prev');
    });

    $('button.carousel-control-next', carousel).on('click', function (e) {
        e.preventDefault();
        $(this).parent().next().find('div.carousel-post-caption').carousel('next');
    });
})
