export const initBookmarks = () => {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");

  const updateBookmarkButtons = () => {
    document.querySelectorAll(".bookmark-btn").forEach((btn) => {
      const roleName = btn.dataset.role;
      if (bookmarks.includes(roleName)) {
        btn.textContent = "★";
        btn.classList.add("bookmarked");
        btn.setAttribute("aria-label", `Quitar ${roleName} de favoritos`);
      } else {
        btn.textContent = "☆";
        btn.classList.remove("bookmarked");
        btn.setAttribute("aria-label", `Guardar ${roleName} como favorito`);
      }
    });
  };

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".bookmark-btn");
    if (!btn) return;

    const roleName = btn.dataset.role;
    const index = bookmarks.indexOf(roleName);

    if (index > -1) {
      bookmarks.splice(index, 1);
    } else {
      bookmarks.push(roleName);
    }

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    updateBookmarkButtons();
    document.dispatchEvent(new CustomEvent("bookmarkChanged"));
  });

  updateBookmarkButtons();
};
