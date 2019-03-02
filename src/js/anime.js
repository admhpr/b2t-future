(function () {
  // Wrap every letter in a span
  $(".tag-line .letters").each(function () {
    $(this).html(
      $(this)
      .text()
      .replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>")
    );
  });

  function fireAnimation() {
    anime({
      targets: [".text-wrapper .letter"],
      translateX: [-40, 0],
      direction: "linear",
      duration: 1800,
      delay: anime.stagger(23)
    });
  }
  fireAnimation();
}(window));