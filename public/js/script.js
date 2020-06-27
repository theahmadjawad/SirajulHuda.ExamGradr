$("#btn-menu").on("click", function() {
    $(".block-sidebar").toggleClass('js-active');
    $("#overlay").toggleClass('on');
})


$("#overlay").on("click", function() {
    $("#overlay").removeClass('on');
    $(".block-sidebar").removeClass('js-active');
})