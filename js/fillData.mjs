import { data } from "../data/roles.mjs";

// const getData = async () => {
//   try {
//     const response = await fetch("../data/roles.json");
//     return await response.json();
//   } catch (error) {
//     console.log(error);
//     return -1;
//   }
// };

export const fillData = () => {
  // const data = await getData();

  const departments = document.getElementById("Departments");

  departments.innerHTML = `<ul class="list-departments">${data.departments.reduce(
    (accumulator, currentValue) =>
      accumulator.concat(`
        <li class="card" role="listitem" data-department="${currentValue.name}">
          <span class="dept-icon" aria-hidden="true">${currentValue.icon || "📷"}</span>
          <span>${currentValue.name}</span>
        </li>`),
    "",
  )}</ul>`;

  const rolesByDepartment = document.getElementById("roles-by-department");

  let contentForRoles = "";
  data.departments.forEach(
    (element) =>
      (contentForRoles += `
      <div class="card department-card" data-department="${element.name}">
        <h3><span class="dept-icon" aria-hidden="true">${element.icon || "📷"}</span> ${element.name}</h3>
        <p>${element.description}</p>
        <dl>
        ${element.members.reduce(
          (accumulator, currentValue) =>
            accumulator.concat(`
          <dt><b>${currentValue.name}</b> <button class="bookmark-btn" data-role="${currentValue.name}" aria-label="Guardar ${currentValue.name} como favorito" title="Guardar como favorito">☆</button></dt>
        <dd class="role-details" data-role="${currentValue.name}">
          <p>${currentValue.description}</p>
          <button class="view-details-btn" data-role-name="${currentValue.name}" aria-label="Ver detalles de ${currentValue.name}">Ver detalles</button>
          <div class="details-hidden" style="display:none;">
            <p><b>Responsabilidades</b></p>
            <ul>
            ${currentValue.responsibilities.reduce(
              (accumulator, cv) => accumulator.concat(`<li>${cv}</li>`),
              "",
            )}
            </ul>
            <p><b>Conocimiento</b></p>
            <ul>
            ${currentValue.knowledge.reduce(
              (accumulator, cv) => accumulator.concat(`<li>${cv}</li>`),
              "",
            )}
            </ul>
            <p><b>Habilidades</b></p>
            <ul>
            ${currentValue.skills.reduce(
              (accumulator, cv) => accumulator.concat(`<li>${cv}</li>`),
              "",
            )}
            </ul>
            ${
              currentValue.examples && currentValue.examples.length > 0
                ? `<p><b>Ejemplos</b></p><ul>${currentValue.examples.reduce(
                    (accumulator, cv) => accumulator.concat(`<li>${cv}</li>`),
                    "",
                  )}</ul>`
                : ""
            }
          </div>
        </dd>`),
          "",
        )}
        </dl>
      </div>`),
  );

  rolesByDepartment.innerHTML = contentForRoles;
};
