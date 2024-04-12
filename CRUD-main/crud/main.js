"use restrict";

const openModal = () => {
  document.getElementById("modal").classList.add("active");
};

const closeModal = () => {
  document.getElementById("modal").classList.remove("active");
  clearModalFields();
};

// const tempClient = {
//   nome: "Aldi",
//   email: "Aldi@teste.com",
//   celular: "11999998888",
//   cidade: "São Paulo",
// };

const getLocalStorage = () => JSON.parse(localStorage.getItem("dbClient")) ?? [];
const setLocalStorage = (dbClient) => localStorage.setItem("dbClient", JSON.stringify(dbClient));
//CRUD

const deleteClient = (index) => {
  const dbClient = readClient();
  dbClient.splice(index, 1);
  setLocalStorage(dbClient);
};

const updateClient = (index, client) => {
  const dbClient = readClient();
  dbClient[index] = client;
  setLocalStorage(dbClient);
};

const readClient = () => getLocalStorage();

const createClient = (client) => {
  const dbClient = getLocalStorage();
  console.log(dbClient);
  dbClient.push(client);
  setLocalStorage(dbClient);
};

const isValidField = () => {
  return document.getElementById("modalForm").reportValidity();
};

const clearModalFields = () => {
  const modalFields = document.querySelectorAll(".modal-field");
  modalFields.forEach((f) => (f.value = ""));
  document.getElementById("name").dataset.index = "new";
};

//interação layout

const saveClient = () => {
  if (isValidField()) {
    const client = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      city: document.getElementById("city").value,
    };
    const index = document.getElementById("name").dataset.index;
    if (index == "new") {
      createClient(client);
      updateTable();
      closeModal();
      //console.log("cadastrando cliente");
    } else {
      updateClient(index, client);
      updateTable();
      closeModal();

      //console.log("editando....");
    }
  }
};

const createRow = (client, index) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
            <td>${client.name}</td>
            <td>${client.email}</td>
            <td>${client.phone}</td>
            <td>${client.city}</td>
            <td>
              <button type="button" class="button green" id='edit-${index}'>editar</button>
              <button type="button" class="button red" id='delete-${index}'>excluir</button>
            </td>
`;
  document.querySelector("#tableClient>tbody").appendChild(newRow);
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tableClient>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const updateTable = () => {
  const dbClient = readClient();
  clearTable();
  dbClient.forEach(createRow);
};

const fillFields = (client) => {
  document.getElementById("name").value = client.name;
  document.getElementById("email").value = client.email;
  document.getElementById("phone").value = client.phone;
  document.getElementById("city").value = client.city;
  document.getElementById("name").dataset.index = client.index;
};

const editClient = (index) => {
  const client = readClient()[index];
  client.index = index;
  fillFields(client);
  openModal();

  //console.log(client);
};

const editOrDelete = (e) => {
  if (e.target.type == "button") {
    const [action, index] = e.target.id.split("-");

    if (action == "edit") {
      editClient(index);

      //console.log("editando o cliente");
    } else {
      const client = readClient()[index];
      const response = confirm(`Deseja realmente excluir o  cliente ${client.name}`);
      if (response) {
        deleteClient(index);
        updateTable();
      }
      //console.log("deletando o cliente");
    }
  }
};

updateTable();

//eventos
document.getElementById("cadastrarCliente").addEventListener("click", openModal);
document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("save").addEventListener("click", saveClient);
document.querySelector("#tableClient>tbody").addEventListener("click", editOrDelete);

