document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }

  const segments = Array.from(
    document.querySelectorAll("[data-segment]")
  );
  const panels = Array.from(
    document.querySelectorAll("[data-panel]")
  );

  function activateSegment(name) {
    segments.forEach((segment) => {
      const isActive = segment.dataset.segment === name;
      segment.classList.toggle("is-active", isActive);
      segment.setAttribute("aria-selected", String(isActive));
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.panel === name;
      panel.classList.toggle("is-active", isActive);
    });
  }

  segments.forEach((segment) => {
    segment.addEventListener("click", () => {
      const name = segment.dataset.segment;
      if (!name) return;
      activateSegment(name);
    });
  });

  const forms = document.querySelectorAll(".waitlist-form");
  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const target = event.currentTarget;
      if (!(target instanceof HTMLFormElement)) return;

      const formData = new FormData(target);
      const email = String(formData.get("email") ?? "").trim();
      const role = target.dataset.role || "friend";

      if (!email) {
        alert("Please enter a valid email address.");
        return;
      }

      // Replace this with your real submission logic (e.g. fetch to your backend).
      alert(
        `Thanks! We’ll let you know when Pinch is ready for ${role}s at ${email}.`
      );
      target.reset();
    });
  });
});

