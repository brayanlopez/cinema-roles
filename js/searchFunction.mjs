export const initSearch = () => {
  const searchInput = document.getElementById("searchInput");
  const departmentFilter = document.getElementById("departmentFilter");
  const showBookmarksBtn = document.getElementById("showBookmarksBtn");

  if (!searchInput || !departmentFilter) return;

  const getBookmarks = () =>
    JSON.parse(localStorage.getItem("bookmarks") || "[]");

  const filterRoles = () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedDept = departmentFilter.value;
    const showBookmarks = showBookmarksBtn?.classList.contains("active");
    const bookmarks = getBookmarks();

    const cards = document.querySelectorAll(".department-card");
    const departmentList = document.querySelectorAll(".list-departments li");

    cards.forEach((card) => {
      const deptName = card.dataset.department;
      const deptMatch = selectedDept === "" || deptName === selectedDept;
      const roles = card.querySelectorAll("dt");
      let hasVisibleRole = false;

      roles.forEach((role) => {
        const roleDetails = role.nextElementSibling;
        const roleNameElement = role.querySelector("b");
        const roleName = roleNameElement?.textContent?.toLowerCase() || "";
        const bookmarkBtn = role.querySelector(".bookmark-btn");
        const roleBookmarkName = bookmarkBtn?.dataset.role || "";
        const roleContent = roleDetails?.textContent?.toLowerCase() || "";

        const roleMatch =
          searchTerm === "" ||
          roleName.includes(searchTerm) ||
          roleContent.includes(searchTerm);
        const bookmarkMatch =
          !showBookmarks || bookmarks.includes(roleBookmarkName);

        const visible = roleMatch && bookmarkMatch && deptMatch;
        role.style.display = visible ? "" : "none";
        if (roleDetails) {
          roleDetails.style.display = visible ? "" : "none";
        }
        if (visible) hasVisibleRole = true;
      });

      card.style.display = hasVisibleRole && deptMatch ? "" : "none";
    });

    departmentList.forEach((item) => {
      const deptName = item.dataset.department;
      const deptMatch = selectedDept === "" || deptName === selectedDept;
      item.style.display = deptMatch ? "" : "none";
    });
  };

  searchInput.addEventListener("input", filterRoles);
  departmentFilter.addEventListener("change", filterRoles);

  if (showBookmarksBtn) {
    showBookmarksBtn.addEventListener("click", () => {
      showBookmarksBtn.classList.toggle("active");
      showBookmarksBtn.textContent = showBookmarksBtn.classList.contains(
        "active",
      )
        ? "Mostrar todo"
        : "Ver favoritos";
      filterRoles();
    });
  }

  const clearBtn = document.getElementById("clearSearch");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      departmentFilter.value = "";
      showBookmarksBtn?.classList.remove("active");
      showBookmarksBtn.textContent = "Ver favoritos";
      filterRoles();
    });
  }

  document.addEventListener("bookmarkChanged", filterRoles);
};
