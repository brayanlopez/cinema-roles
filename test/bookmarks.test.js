import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("bookmarks.mjs", () => {
  let localStorageMock;
  let container;

  beforeEach(() => {
    localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      clear: vi.fn(),
    };
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
    });

    container = document.createElement("div");
    container.innerHTML = `
      <button class="bookmark-btn" data-role="Director">☆</button>
      <button class="bookmark-btn" data-role="Script supervisor">☆</button>
    `;
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container.parentNode) {
      document.body.removeChild(container);
    }
    vi.clearAllMocks();
  });

  it("should initialize bookmarks from localStorage", async () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(["Director"]));

    const { initBookmarks } = await import("../js/bookmarks.mjs");
    initBookmarks();

    expect(localStorageMock.getItem).toHaveBeenCalledWith("bookmarks");
  });

  it("should handle empty bookmarks in localStorage", async () => {
    localStorageMock.getItem.mockReturnValue(null);

    const { initBookmarks } = await import("../js/bookmarks.mjs");
    initBookmarks();

    expect(localStorageMock.getItem).toHaveBeenCalledWith("bookmarks");
  });

  it("should update bookmark buttons on init", async () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(["Director"]));

    const { initBookmarks } = await import("../js/bookmarks.mjs");
    initBookmarks();

    const directorBtn = document.querySelector('[data-role="Director"]');
    const scriptBtn = document.querySelector('[data-role="Script supervisor"]');

    expect(directorBtn.textContent).toBe("★");
    expect(directorBtn.classList.contains("bookmarked")).toBe(true);
    expect(scriptBtn.textContent).toBe("☆");
    expect(scriptBtn.classList.contains("bookmarked")).toBe(false);
  });

  it("should toggle bookmark on click", async () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([]));

    const { initBookmarks } = await import("../js/bookmarks.mjs");
    initBookmarks();

    const btn = document.querySelector('[data-role="Director"]');
    btn.click();

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "bookmarks",
      JSON.stringify(["Director"]),
    );
  });

  it("should remove bookmark if already bookmarked", async () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(["Director"]));

    const { initBookmarks } = await import("../js/bookmarks.mjs");
    initBookmarks();

    const btn = document.querySelector('[data-role="Director"]');
    btn.click();

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "bookmarks",
      JSON.stringify([]),
    );
  });

  it("should dispatch bookmarkChanged event on toggle", async () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([]));

    const { initBookmarks } = await import("../js/bookmarks.mjs");
    initBookmarks();

    const eventListener = vi.fn();
    document.addEventListener("bookmarkChanged", eventListener);

    const btn = document.querySelector('[data-role="Director"]');
    btn.click();

    expect(eventListener).toHaveBeenCalled();
  });

  it("should handle click on non-bookmark element", async () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([]));

    const { initBookmarks } = await import("../js/bookmarks.mjs");
    initBookmarks();

    const eventListener = vi.fn();
    document.addEventListener("bookmarkChanged", eventListener);

    // Click on container, not on bookmark button
    container.click();

    expect(eventListener).not.toHaveBeenCalled();
  });
});
