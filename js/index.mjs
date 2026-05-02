import { fillData } from "./fillData.mjs";
import { addScroll2TopFunction } from "./scrollFunction.mjs";
import { initSearch } from "./searchFunction.mjs";
import { initThemeToggle } from "./themeToggle.mjs";
import { initModal } from "./modal.mjs";
import { initBookmarks } from "./bookmarks.mjs";

const mainFlow = async () => {
  fillData();
  addScroll2TopFunction();
  initSearch();
  initThemeToggle();
  initModal();
  initBookmarks();
};

mainFlow();
