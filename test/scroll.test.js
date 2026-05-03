import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("scrollFunction.mjs", () => {
  let scrollButton;

  beforeEach(() => {
    scrollButton = document.createElement("button");
    scrollButton.id = "scrollToTopButton";
    scrollButton.style.display = "none";
    document.body.appendChild(scrollButton);
  });

  afterEach(() => {
    if (scrollButton.parentNode) {
      document.body.removeChild(scrollButton);
    }
    vi.restoreAllMocks();
  });

  it("should initialize scroll function without throwing", async () => {
    const { addScroll2TopFunction } = await import("../js/scrollFunction.mjs");
    expect(() => addScroll2TopFunction()).not.toThrow();
  });

  it("should return early if scroll button not found", async () => {
    document.body.removeChild(scrollButton);

    // Clear any previous onscroll handler
    window.onscroll = null;

    const { addScroll2TopFunction } = await import("../js/scrollFunction.mjs");
    expect(() => addScroll2TopFunction()).not.toThrow();
    expect(window.onscroll).toBeNull();
  });

  it("should scroll to top when button clicked", async () => {
    const { addScroll2TopFunction } = await import("../js/scrollFunction.mjs");
    addScroll2TopFunction();

    scrollButton.click();

    expect(document.body.scrollTop).toBe(0);
    expect(document.documentElement.scrollTop).toBe(0);
  });

  it("should define window.onscroll handler after init", async () => {
    const { addScroll2TopFunction } = await import("../js/scrollFunction.mjs");
    addScroll2TopFunction();

    expect(window.onscroll).toBeDefined();
    expect(typeof window.onscroll).toBe("function");
  });

  it("should set button display to block when scroll > 20", async () => {
    const { addScroll2TopFunction } = await import("../js/scrollFunction.mjs");
    addScroll2TopFunction();

    // Mock scrollFunction behavior
    const scrollFunction = window.onscroll;
    expect(scrollFunction).toBeDefined();

    // Simulate scroll > 20
    Object.defineProperty(document.body, "scrollTop", {
      value: 100,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(document.documentElement, "scrollTop", {
      value: 100,
      writable: true,
      configurable: true,
    });

    scrollFunction();
    expect(scrollButton.style.display).toBe("block");
  });

  it("should set button display to none when scroll <= 20", async () => {
    const { addScroll2TopFunction } = await import("../js/scrollFunction.mjs");
    addScroll2TopFunction();

    // Simulate scroll <= 20
    Object.defineProperty(document.body, "scrollTop", {
      value: 10,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(document.documentElement, "scrollTop", {
      value: 10,
      writable: true,
      configurable: true,
    });

    window.onscroll();
    expect(scrollButton.style.display).toBe("none");
  });
});
