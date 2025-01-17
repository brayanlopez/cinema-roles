const getData = async () => {
  try {
    // import { data } from "./roles.mjs";
    const response = await fetch("../data/roles.json");
    return await response.json();
  } catch (error) {
    console.log(error);
    return -1;
  }
};

const mainFlow = async () => {
  const data = await getData();

  const departments = document.getElementById("Departments");

  departments.innerHTML = `<ul class="list-departments">${data.departments.reduce(
    (accumulator, currentValue) =>
      accumulator.concat(`
        <li class="card">
          <span class="material-symbols-outlined">photo_camera</span>
          ${currentValue.name}
        </li>`),
    ""
  )}</ul>`;

  const rolesByDepartment = document.getElementById("roles-by-department");

  let contentForRoles = "";
  data.departments.forEach(
    (element) =>
      (contentForRoles += `
      <div class="card">
        <h3>${element.name}</h3>
        <p>${element.description}</p>
        <dl>
        ${element.members.reduce(
          (accumulator, currentValue) =>
            accumulator.concat(`
          <dt><b>${currentValue.name}</b></dt> 
        <dd>
          ${currentValue.description}
          <p><b>Responsabilidades</b></p>
          <ul>
          ${currentValue.responsibilities.reduce(
            (accumulator, cv) => accumulator.concat(`<li>${cv}</li>`),
            ""
          )}
          </ul>
          <p><b>Conocimiento</b></p>
          <ul>
          ${currentValue.knowledge.reduce(
            (accumulator, cv) => accumulator.concat(`<li>${cv}</li>`),
            ""
          )}
          </ul>
        </dd>`),
          ""
        )}
        </dl>
      </div>`)
  );

  rolesByDepartment.innerHTML = contentForRoles;
};

mainFlow();
