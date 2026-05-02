import { data } from "../data/roles.mjs";

export const initModal = () => {
  const modal = document.getElementById("roleModal");
  if (!modal) return;

  const modalBody = modal.querySelector("#modal-body");
  const modalTitle = modal.querySelector("#modal-title");
  const closeBtn = modal.querySelector(".modal-close");

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".view-details-btn");
    if (!btn) return;

    const roleName = btn.dataset.roleName;
    let role = null;

    for (const dept of data.departments) {
      const found = dept.members.find((member) => member.name === roleName);
      if (found) {
        role = found;
        break;
      }
    }

    if (role) {
      showModal(role);
    } else {
      console.error("Role not found:", roleName);
    }
  });

  const showModal = (role) => {
    modalTitle.textContent = role.name;
    modalBody.innerHTML = `
      <p>${role.description}</p>
      <div class="modal-section">
        <h3>Responsabilidades</h3>
        <ul>${role.responsibilities.map((r) => `<li>${r}</li>`).join("")}</ul>
      </div>
      <div class="modal-section">
        <h3>Conocimientos</h3>
        <ul>${role.knowledge.map((k) => `<li>${k}</li>`).join("")}</ul>
      </div>
      <div class="modal-section">
        <h3>Habilidades</h3>
        <ul>${role.skills.map((s) => `<li>${s}</li>`).join("")}</ul>
      </div>
      ${role.examples && role.examples.length > 0 ? `<div class="modal-section"><h3>Ejemplos</h3><ul>${role.examples.map((e) => `<li>${e}</li>`).join("")}</ul></div>` : ""}
    `;
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
  };

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    }
  });
};
