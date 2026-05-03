import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("themeToggle.mjs", () => {
  let localStorageMock;
  let themeToggle;

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

    themeToggle = document.createElement("button");
    themeToggle.id = "themeToggle";
    document.body.appendChild(themeToggle);
  });

  afterEach(() => {
    if (themeToggle.parentNode) {
      document.body.removeChild(themeToggle);
    }
    vi.clearAllMocks();
    document.documentElement.removeAttribute("data-theme");
  });

  it("should initialize theme from localStorage", async () => {
    localStorageMock.getItem.mockReturnValue("dark");

    const { initThemeToggle } = await import("../js/themeToggle.mjs");
    initThemeToggle();

    expect(localStorageMock.getItem).toHaveBeenCalledWith("theme");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("should default to light theme if no theme in localStorage", async () => {
    localStorageMock.getItem.mockReturnValue(null);

    const { initThemeToggle } = await import("../js/themeToggle.mjs");
    initThemeToggle();

    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });

  it("should update toggle text based on theme", async () => {
    localStorageMock.getItem.mockReturnValue("light");

    const { initThemeToggle } = await import("../js/themeToggle.mjs");
    initThemeToggle();

    expect(themeToggle.textContent).toBe("🌙 Modo oscuro");
  });

  it("should toggle theme on click", async () => {
    localStorageMock.getItem.mockReturnValue("light");

    const { initThemeToggle } = await import("../js/themeToggle.mjs");
    initThemeToggle();

    themeToggle.click();

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(localStorageMock.setItem).toHaveBeenCalledWith("theme", "dark");
  });

  it("should update button text after toggle", async () => {
    localStorageMock.getItem.mockReturnValue("light");

    const { initThemeToggle } = await import("../js/themeToggle.mjs");
    initThemeToggle();

    themeToggle.click();

    expect(themeToggle.textContent).toBe("☀️ Modo claro");
  });

  it("should not throw if themeToggle element not found", async () => {
    document.body.removeChild(themeToggle);

    const { initThemeToggle } = await import("../js/themeToggle.mjs");
    expect(() => initThemeToggle()).not.toThrow();
  });
});
