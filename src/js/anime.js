// Wrap every letter in a span
$(".tag-line .letters").each(function() {
  $(this).html(
    $(this)
      .text()
      .replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>")
  );
});

anime({
  targets: ".text-wrapper .letter",
  translateX: [-1000, 0],
  direction: "linear",
  duration: 1000,
  delay: anime.stagger(100)
});
