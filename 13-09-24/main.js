let div = document.querySelector(".ball"),
  v = { x: 0.5, y: 3 },
  pos = { x: 0, y: 0 },
  g = 0.5,
  absorption = 0.7,
  bottom = 650;

function calc() {
  pos.x += v.x;
  pos.y += v.y;
  v.y += g;
  if (pos.y > bottom) {
    pos.y = bottom;
    v.y = -v.y * absorption;
  }
  if (pos.x < 0 || pos.x > 620) v.x = -v.x;
}

(function loop() {
  calc();
  move(div, pos);

  requestAnimationFrame(loop);
})();

function move(el, p) {
  el.style.transform = el.style.webkitTransform =
    "translate(" + p.x + "px," + p.y + "px)";
}

function position(e) {
  pos.x = e.clientX - 70;
  pos.y = e.clientY;
}
document.addEventListener("click", position);
