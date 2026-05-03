import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("modal.mjs", () => {
  let container;
  let modal;

  beforeEach(() => {
    container = document.createElement("div");
    container.innerHTML = `
      <div id="roleModal" aria-hidden="true">
        <div id="modal-title"></div>
        <div id="modal-body"></div>
        <button class="modal-close">Cerrar</button>
      </div>
      <div id="roles-by-department">
        <button class="view-details-btn" data-role-name="Director">Ver detalles</button>
      </div>
    `;
    document.body.appendChild(container);

    modal = document.getElementById("roleModal");
  });

  afterEach(() => {
    if (container.parentNode) {
      document.body.removeChild(container);
    }
  });

  it("should initialize modal without throwing", async () => {
    const { initModal } = await import("../js/modal.mjs");
    expect(() => initModal()).not.toThrow();
  });

  it("should open modal with role details when view button clicked", async () => {
    const { initModal } = await import("../js/modal.mjs");
    initModal();

    const viewBtn = document.querySelector('[data-role-name="Director"]');
    viewBtn.click();

    expect(modal.style.display).toBe("block");
    expect(modal.getAttribute("aria-hidden")).toBe("false");
    expect(document.getElementById("modal-title").textContent).toBe("Director");
  });

  it("should close modal when close button clicked", async () => {
    const { initModal } = await import("../js/modal.mjs");
    initModal();

    const viewBtn = document.querySelector('[data-role-name="Director"]');
    viewBtn.click();

    const closeBtn = modal.querySelector(".modal-close");
    closeBtn.click();

    expect(modal.style.display).toBe("none");
    expect(modal.getAttribute("aria-hidden")).toBe("true");
  });

  it("should close modal when clicking outside modal content", async () => {
    const { initModal } = await import("../js/modal.mjs");
    initModal();

    const viewBtn = document.querySelector('[data-role-name="Director"]');
    viewBtn.click();

    modal.click();

    expect(modal.style.display).toBe("none");
    expect(modal.getAttribute("aria-hidden")).toBe("true");
  });

  it("should close modal on Escape key", async () => {
    const { initModal } = await import("../js/modal.mjs");
    initModal();

    const viewBtn = document.querySelector('[data-role-name="Director"]');
    viewBtn.click();

    const escapeEvent = new KeyboardEvent("keydown", { key: "Escape" });
    document.dispatchEvent(escapeEvent);

    expect(modal.style.display).toBe("none");
    expect(modal.getAttribute("aria-hidden")).toBe("true");
  });

  it("should not throw if modal element not found", async () => {
    document.body.removeChild(container);

    const { initModal } = await import("../js/modal.mjs");
    expect(() => initModal()).not.toThrow();
  });

  it("should populate modal body with role information", async () => {
    const { initModal } = await import("../js/modal.mjs");
    initModal();

    const viewBtn = document.querySelector('[data-role-name="Director"]');
    viewBtn.click();

    const modalBody = document.getElementById("modal-body");
    expect(modalBody.innerHTML).toContain("Responsabilidades");
    expect(modalBody.innerHTML).toContain("Conocimientos");
    expect(modalBody.innerHTML).toContain("Habilidades");
  });
});
