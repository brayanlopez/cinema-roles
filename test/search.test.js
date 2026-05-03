import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("searchFunction.mjs", () => {
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
      <input id="searchInput" />
      <select id="departmentFilter">
        <option value="">Todos</option>
        <option value="Departamento de dirección">Dirección</option>
      </select>
      <button id="showBookmarksBtn">Ver favoritos</button>
      <button id="clearSearch">Limpiar</button>
      <div id="roles-by-department">
        <div class="department-card" data-department="Departamento de dirección">
          <dl>
            <dt data-role="Director"><b>Director</b><button class="bookmark-btn" data-role="Director">☆</button></dt>
            <dd class="role-details" data-role="Director">Responsable de la visión</dd>
          </dl>
        </div>
        <div class="department-card" data-department="Departamento de fotografía">
          <dl>
            <dt data-role="Director de fotografía"><b>Director de fotografía</b><button class="bookmark-btn" data-role="Director de fotografía">☆</button></dt>
            <dd class="role-details" data-role="Director de fotografía">Diseña estética visual</dd>
          </dl>
        </div>
      </div>
      <ul class="list-departments">
        <li class="card" data-department="Departamento de dirección">Dirección</li>
        <li class="card" data-department="Departamento de fotografía">Fotografía</li>
      </ul>
    `;
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container.parentNode) {
      document.body.removeChild(container);
    }
    vi.clearAllMocks();
  });

  it("should initialize search functionality", async () => {
    const { initSearch } = await import("../js/searchFunction.mjs");
    expect(() => initSearch()).not.toThrow();
  });

  it("should filter roles by search term", async () => {
    localStorageMock.getItem.mockReturnValue("[]");

    const { initSearch } = await import("../js/searchFunction.mjs");
    initSearch();

    const searchInput = document.getElementById("searchInput");
    searchInput.value = "fotografía";
    searchInput.dispatchEvent(new Event("input", { bubbles: true }));

    const directorDt = document.querySelector('dt[data-role="Director"]');
    const fotoDt = document.querySelector(
      'dt[data-role="Director de fotografía"]',
    );

    expect(directorDt.style.display).toBe("none");
    expect(fotoDt.style.display).toBe("");
  });

  it("should filter roles by department", async () => {
    localStorageMock.getItem.mockReturnValue("[]");

    const { initSearch } = await import("../js/searchFunction.mjs");
    initSearch();

    const departmentFilter = document.getElementById("departmentFilter");
    departmentFilter.value = "Departamento de dirección";
    departmentFilter.dispatchEvent(new Event("change"));

    const dirCard = document.querySelector(
      '[data-department="Departamento de dirección"]',
    );
    const fotoCard = document.querySelector(
      '[data-department="Departamento de fotografía"]',
    );

    expect(dirCard.style.display).toBe("");
    expect(fotoCard.style.display).toBe("none");
  });

  it("should toggle bookmarks filter", async () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(["Director"]));

    const { initSearch } = await import("../js/searchFunction.mjs");
    initSearch();

    const showBookmarksBtn = document.getElementById("showBookmarksBtn");
    showBookmarksBtn.click();

    const directorRole = document.querySelector('[data-role="Director"]');
    const fotoRole = document.querySelector(
      '[data-role="Director de fotografía"]',
    );

    expect(directorRole.style.display).toBe("");
    expect(fotoRole.style.display).toBe("none");
  });

  it("should clear search on clear button click", async () => {
    localStorageMock.getItem.mockReturnValue("[]");

    const { initSearch } = await import("../js/searchFunction.mjs");
    initSearch();

    const searchInput = document.getElementById("searchInput");
    const departmentFilter = document.getElementById("departmentFilter");
    const clearBtn = document.getElementById("clearSearch");

    searchInput.value = "test";
    departmentFilter.value = "some dept";
    clearBtn.click();

    expect(searchInput.value).toBe("");
    expect(departmentFilter.value).toBe("");
  });

  it("should not throw if required elements not found", async () => {
    document.body.removeChild(container);

    const { initSearch } = await import("../js/searchFunction.mjs");
    expect(() => initSearch()).not.toThrow();
  });
});
