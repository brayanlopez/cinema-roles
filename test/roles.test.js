import { describe, it, expect } from "vitest";

describe("roles.mjs - Data Integrity", () => {
  let data;

  beforeEach(async () => {
    const module = await import("../data/roles.mjs");
    data = module.data;
  });

  it("should export data object", () => {
    expect(data).toBeDefined();
    expect(data.departments).toBeDefined();
  });

  it("should have at least one department", () => {
    expect(data.departments.length).toBeGreaterThan(0);
  });

  it("should have 7 departments", () => {
    expect(data.departments.length).toBe(7);
  });

  it("should have all required department properties", () => {
    data.departments.forEach((dept) => {
      expect(dept.name).toBeDefined();
      expect(dept.icon).toBeDefined();
      expect(dept.description).toBeDefined();
      expect(dept.members).toBeDefined();
    });
  });

  it("should have members in each department", () => {
    data.departments.forEach((dept) => {
      expect(dept.members.length).toBeGreaterThan(0);
    });
  });

  it("should have required properties for each role", () => {
    data.departments.forEach((dept) => {
      dept.members.forEach((member) => {
        expect(member.name).toBeDefined();
        expect(member.description).toBeDefined();
        expect(member.responsibilities).toBeDefined();
        expect(member.knowledge).toBeDefined();
        expect(member.skills).toBeDefined();
      });
    });
  });

  it("should have responsibilities as array", () => {
    data.departments.forEach((dept) => {
      dept.members.forEach((member) => {
        expect(Array.isArray(member.responsibilities)).toBe(true);
        expect(member.responsibilities.length).toBeGreaterThan(0);
      });
    });
  });

  it("should have knowledge as array", () => {
    data.departments.forEach((dept) => {
      dept.members.forEach((member) => {
        expect(Array.isArray(member.knowledge)).toBe(true);
        expect(member.knowledge.length).toBeGreaterThan(0);
      });
    });
  });

  it("should have skills as array", () => {
    data.departments.forEach((dept) => {
      dept.members.forEach((member) => {
        expect(Array.isArray(member.skills)).toBe(true);
        expect(member.skills.length).toBeGreaterThan(0);
      });
    });
  });

  it("should have unique role names across all departments", () => {
    const roleNames = [];
    data.departments.forEach((dept) => {
      dept.members.forEach((member) => {
        roleNames.push(member.name);
      });
    });

    const uniqueNames = new Set(roleNames);
    expect(uniqueNames.size).toBe(roleNames.length);
  });

  it("should have examples as array when present", () => {
    data.departments.forEach((dept) => {
      dept.members.forEach((member) => {
        if (member.examples) {
          expect(Array.isArray(member.examples)).toBe(true);
        }
      });
    });
  });

  it("should include expected departments", () => {
    const deptNames = data.departments.map((d) => d.name);
    expect(deptNames).toContain("Departamento de dirección");
    expect(deptNames).toContain("Departamento de fotografía");
    expect(deptNames).toContain("Departamento de arte");
  });
});
