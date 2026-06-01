/* ============================================================
   Vestimy - interactive motion
   nav scroll state · 3D tilt · hero parallax · magnetic buttons
   All effects are pointer-driven and respect reduced-motion.
   ============================================================ */
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(pointer: fine)").matches;

  /* ---- nav shrink / shadow on scroll ---- */
  const nav = document.querySelector(".nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- scroll progress bar ---- */
  const bar = document.querySelector(".progress");
  if (bar) {
    const upd = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
    };
    upd();
    window.addEventListener("scroll", upd, { passive: true });
    window.addEventListener("resize", upd, { passive: true });
  }

  /* ---- word rotator (less copy, more motion) ---- */
  document.querySelectorAll("[data-rotator]").forEach((r) => {
    const words = [...r.children];
    if (!words.length) return;
    words[0].classList.add("on");
    if (reduce || words.length < 2) return;
    let i = 0;
    setInterval(() => {
      const prev = i;
      words[prev].classList.remove("on");
      words[prev].classList.add("out");
      setTimeout(() => words[prev].classList.remove("out"), 500);
      i = (i + 1) % words.length;
      words[i].classList.add("on");
    }, 2200);
  });

  if (reduce || !fine) return; // skip pointer effects

  const lerp = (a, b, t) => a + (b - a) * t;

  /* ---- 3D tilt on cards ---- */
  document.querySelectorAll("[data-tilt]").forEach((el) => {
    let raf = null;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const MAX = 7;
    const loop = () => {
      cx = lerp(cx, tx, 0.18);
      cy = lerp(cy, ty, 0.18);
      el.style.transform =
        `perspective(800px) rotateX(${cy}deg) rotateY(${cx}deg) translateY(-4px)`;
      if (Math.abs(cx - tx) > 0.05 || Math.abs(cy - ty) > 0.05) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = null;
      }
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      tx = px * MAX * 2;
      ty = -py * MAX * 2;
      kick();
    });
    el.addEventListener("mouseleave", () => {
      tx = 0; ty = 0; kick();
    });
  });

  /* ---- hero garments parallax on mouse ---- */
  const hero = document.querySelector(".hero");
  const stage = document.querySelector(".hero__stage");
  if (hero && stage) {
    const items = [...stage.querySelectorAll(".garment, .tag")].map((el, i) => ({
      el,
      depth: (i % 5) * 6 + 8,
    }));
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    const loop = () => {
      cx = lerp(cx, tx, 0.08);
      cy = lerp(cy, ty, 0.08);
      items.forEach(({ el, depth }) => {
        el.style.setProperty("--px", (cx * depth).toFixed(1) + "px");
        el.style.setProperty("--py", (cy * depth).toFixed(1) + "px");
      });
      if (Math.abs(cx - tx) > 0.001 || Math.abs(cy - ty) > 0.001) {
        raf = requestAnimationFrame(loop);
      } else raf = null;
    };
    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(loop);
    });
    hero.addEventListener("mouseleave", () => {
      tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(loop);
    });
  }

  /* ---- magnetic buttons ---- */
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.3;
      const y = (e.clientY - r.top - r.height / 2) * 0.4;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
})();
