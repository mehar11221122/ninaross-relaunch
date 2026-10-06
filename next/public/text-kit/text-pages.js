(() => {
  const modal = document.getElementById("tp-sample-modal");
  if (!modal) return;
  const openers = document.querySelectorAll("[data-tp-sample-open]");
  const closers = modal.querySelectorAll("[data-tp-sample-close]");
  const open = () => {
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    modal.hidden = true;
    document.body.style.overflow = "";
  };
  openers.forEach((el) => el.addEventListener("click", open));
  closers.forEach((el) => el.addEventListener("click", close));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) close();
  });
})();
