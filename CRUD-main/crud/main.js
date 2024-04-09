"use restrict";

const openModal = () => document.getElementById("modal").classList.add("active");

const closeModal = () => document.getElementById("modal").classList.remove("active");

const tempClient = {
  nome: "joao",
  email: "joao@teste.com",
  celular: "11999998888",
  cidade: "São Paulo",
};

const getLocalStorage = () => JSON.parse(localStorage.getItem("dbClient")) ?? [];
const setLocalStorage = (dbClient) => localStorage.setItem("dbClient", JSON.stringify(dbClient));
//CRUD

const deleteClient = (i) => {
  const dbClient = readClient();
  dbClient.splice(i, 1);
  setLocalStorage(dbClient);
};

const updateClient = (c, i) => {
  const dbClient = readClient();
  dbClient[i] = c;
  setLocalStorage(dbClient);
};

const readClient = () => getLocalStoragege();

const createClient = (client) => {
  const dbClient = getLocalStoragege();
  console.log(dbClient);
  dbClient.push(client);
  setLocalStorage(dbClient);
};

//eventos
document.getElementById("cadastrarCliente").addEventListener("click", openModal);
document.getElementById("modalClose").addEventListener("click", closeModal);
