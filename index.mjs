// TODO: move this example of how to read a json file in vanilla js to another site.
const getData = async () => {
  const response = await fetch("./data/roles.json");
  const data = await response.json();
  console.log("🚀 ~ getData ~ data:", data);

  const departments = document.getElementById("Departments");

  departments.innerHTML = data.departments.reduce(
    (accumulator, currentValue) =>
      accumulator.concat(`- ${currentValue.name} <br \>`),
    ""
  );

  const rolesByDepartment = document.getElementById("roles-by-department");

  let contentForRoles = "";
  data.departments.forEach(
    (element) =>
      (contentForRoles += `<h3>${element.name}</h3>
      <p>${element.description}</p>
      <dl>
      ${element.members.reduce(
        (accumulator, currentValue) =>
          accumulator.concat(`
        <dt>${currentValue.name}</dt> 
        <dd>
          ${currentValue.description}
          <ul>
          ${currentValue.responsibilities.reduce(
            (accumulator, cv) => accumulator.concat(`<li>${cv}</li>`),
            ""
          )}
          </ul>
        </dd>
        `),
        ""
      )}
      </dl>`)
  );

  rolesByDepartment.innerHTML = contentForRoles;
};

// import { data } from "./roles.mjs";

getData();
