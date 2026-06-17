/* ===========================================================
   Ironguard Safes — Site Scripts (industrial build)
   =========================================================== */
(function () {
  "use strict";

  /* ---- Mobile nav ---- */
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.querySelector(".nav__menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Smooth scroll for in-page anchors ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", id);
    });
  });

  /* ---- Seamless marquee (duplicate track content) ---- */
  document.querySelectorAll(".marquee__track").forEach(function (track) {
    track.innerHTML += track.innerHTML;
  });

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Contact form ---- */
  var form = document.getElementById("contactForm");
  if (form) {
    var ok = form.querySelector(".form-ok");
    var err = form.querySelector(".form-err");
    var btn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (ok) ok.classList.remove("show");
      if (err) err.classList.remove("show");
      if (!form.checkValidity()) { form.reportValidity(); return; }

      var data = {
        name: form.name.value, phone: form.phone.value,
        email: form.email.value, message: form.message.value,
        company: form.company ? form.company.value : ""
      };
      var label = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "Sending..."; }

      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(function (r) { return r.json().then(function (b) { return { ok: r.ok && b.ok, body: b }; }); })
        .then(function (res) {
          if (res.ok) {
            if (ok) { ok.classList.add("show"); ok.scrollIntoView({ behavior: "smooth", block: "center" }); }
            form.reset();
          } else if (err) {
            err.textContent = (res.body && res.body.error) || "Something went wrong. Please call 848-222-3606.";
            err.classList.add("show");
          }
        })
        .catch(function () {
          if (err) { err.textContent = "Network error. Please call 848-222-3606."; err.classList.add("show"); }
        })
        .finally(function () { if (btn) { btn.disabled = false; btn.textContent = label; } });
    });
  }

  /* ---- Footer year ---- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
