// Wrap every letter in a span
$('.tag-line .letters').each(function () {
    $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});

anime.timeline({
        loop: false
    })
    .add({
        targets: '.tag-line .letter',
        scale: [0, 1],
        duration: 3000,
        elasticity: 2000,
        delay: function (el, i) {
            return 45 * (i + 1)
        }
    })