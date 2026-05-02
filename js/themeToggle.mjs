export const initThemeToggle = () => {
  const themeToggle = document.getElementById("themeToggle");
  if (!themeToggle) return;

  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateToggleText(themeToggle, currentTheme);

  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const newTheme = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateToggleText(themeToggle, newTheme);
  });
};

const updateToggleText = (btn, theme) => {
  btn.textContent = theme === "light" ? "🌙 Modo oscuro" : "☀️ Modo claro";
  btn.setAttribute(
    "aria-label",
    theme === "light" ? "Activar modo oscuro" : "Activar modo claro",
  );
};
