/* ============================================================
   Vestimy aurora wallpaper - canvas port of
   mobile/src/ui/components/Wallpaper.tsx
   Animated pink (#fc50fa) radial blobs over light bg,
   "multiply" blend, sum-of-sines wandering paths.
   ============================================================ */
(function () {
  const canvas = document.getElementById("aurora");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const AURORA = "252,80,250"; // palette.aurora #fc50fa
  const BG = "#ececec";
  const CYCLE_MS = 90000;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // BLOBS - same layout as the app
  const BLOBS = [
    { cx: 0.15, cy: 0.12, r: 0.34, opacity: 0.8, phase: 0.0 },
    { cx: 0.85, cy: 0.18, r: 0.36, opacity: 0.72, phase: 0.21 },
    { cx: 0.2, cy: 0.78, r: 0.35, opacity: 0.7, phase: 0.66 },
    { cx: 0.55, cy: 0.5, r: 0.4, opacity: 0.6, phase: 0.88 },
  ];

  let w = 0,
    h = 0,
    dpr = 1;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawBlob(b, tx, ty) {
    const screen = Math.max(w, h);
    const cx = b.cx * w + tx;
    const cy = b.cy * h + ty;
    const r = b.r * screen;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, `rgba(${AURORA},${b.opacity})`);
    g.addColorStop(1, `rgba(${AURORA},0)`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.2, 0, Math.PI * 2);
    ctx.fill();
  }

  function frame(now) {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "multiply";

    const time = reduce ? 0 : ((now % CYCLE_MS) / CYCLE_MS);
    const t = 2 * Math.PI * time;
    const maxOut = 0.2;

    BLOBS.forEach((b, i) => {
      const p1 = i * 2.1 + b.phase;
      const p2 = i * 3.4 + b.phase * 2;
      const p3 = i * 1.7 + b.phase * 3;
      const moveX =
        (Math.sin(t * 2 + p1) + 0.5 * Math.sin(t * 3 + p2) + 0.25 * Math.sin(t * 5 + p3)) / 1.75;
      const moveY =
        (Math.cos(t * 2 + p2) + 0.5 * Math.sin(t * 3 + p3) + 0.25 * Math.cos(t * 5 + p1)) / 1.75;

      const cx = b.cx * w;
      const cy = b.cy * h;
      const posX = ((1 + maxOut) * w - cx) * 0.95;
      const negX = (cx + maxOut * w) * 0.95;
      const posY = ((1 + maxOut) * h - cy) * 0.95;
      const negY = (cy + maxOut * h) * 0.95;

      const tx = moveX > 0 ? moveX * posX : moveX * negX;
      const ty = moveY > 0 ? moveY * posY : moveY * negY;
      drawBlob(b, tx, ty);
    });

    if (!reduce) requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resize, { passive: true });
  resize();
  requestAnimationFrame(frame);

  /* ---- scroll reveal ---- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ---- mobile nav toggle ---- */
  const burger = document.querySelector(".nav__burger");
  const links = document.querySelector(".nav__links");
  if (burger && links) {
    burger.addEventListener("click", () => {
      const open = links.style.display === "flex";
      links.style.display = open ? "" : "flex";
      links.style.position = "absolute";
      links.style.flexDirection = "column";
      links.style.top = "70px";
      links.style.right = "16px";
      links.style.padding = "18px 24px";
      links.style.borderRadius = "22px";
      links.style.background = "rgba(255,255,255,0.85)";
      links.style.backdropFilter = "blur(20px)";
      links.style.boxShadow = "0 18px 40px rgba(14,11,31,0.18)";
    });
  }
})();
