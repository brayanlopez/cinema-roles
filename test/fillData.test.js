import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("fillData.mjs", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    container.innerHTML = `
      <div id="Departments"></div>
      <div id="roles-by-department"></div>
    `;
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it("should populate departments list", async () => {
    const { fillData } = await import("../js/fillData.mjs");
    fillData();

    const departmentsList = document.querySelector(".list-departments");
    expect(departmentsList).not.toBeNull();
    expect(departmentsList.children.length).toBeGreaterThan(0);
  });

  it("should populate roles by department", async () => {
    const { fillData } = await import("../js/fillData.mjs");
    fillData();

    const rolesContainer = document.getElementById("roles-by-department");
    const deptCards = rolesContainer.querySelectorAll(".department-card");
    expect(deptCards.length).toBeGreaterThan(0);
  });

  it("should create bookmark buttons for each role", async () => {
    const { fillData } = await import("../js/fillData.mjs");
    fillData();

    const bookmarkBtns = document.querySelectorAll(".bookmark-btn");
    expect(bookmarkBtns.length).toBeGreaterThan(0);
  });

  it("should create view details buttons for each role", async () => {
    const { fillData } = await import("../js/fillData.mjs");
    fillData();

    const viewBtns = document.querySelectorAll(".view-details-btn");
    expect(viewBtns.length).toBeGreaterThan(0);
  });

  it("should include role descriptions", async () => {
    const { fillData } = await import("../js/fillData.mjs");
    fillData();

    const rolesContainer = document.getElementById("roles-by-department");
    expect(rolesContainer.innerHTML).toContain("Director");
    expect(rolesContainer.innerHTML).toContain("visión artística");
  });

  it("should create department cards with correct data attributes", async () => {
    const { fillData } = await import("../js/fillData.mjs");
    fillData();

    const deptCards = document.querySelectorAll(".department-card");
    const firstCard = deptCards[0];
    expect(firstCard.dataset.department).toBeTruthy();
  });

  it("should include examples section when role has examples", async () => {
    const { fillData } = await import("../js/fillData.mjs");
    fillData();

    const rolesContainer = document.getElementById("roles-by-department");
    expect(rolesContainer.innerHTML).toContain("Martin Scorsese");
  });
});
