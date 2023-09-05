const loadUsers = async () => {
  const urlApi = "https://reqres.in/api/users?page=2";
  const response = await fetch(urlApi);
  const data = await response.json();
  const users = data.data;
  let listUsers = "";
  users.map((user, i) => {
    listUsers += `
    
    <div class="card w-96 bg-primary text-primary-content">
     <figure class="px-10 pt-10">
    <img src=${user.avatar} alt=${user.first_name} class="rounded-full w-32 h-32" />
  </figure>
            <div class="card-body">
              <h2 class="card-title">${user.id} - ${user.email}</h2>
              <p>${user.first_name} ${user.last_name}</p>
              <div class="card-actions justify-end">
                <button class="btn btn-secondary" onclick="deleteUser(${user.id})">Eliminar</button>
              </div>
            </div>
          </div>`;
  });
  document.getElementById("listUsers").innerHTML = listUsers;
  console.log(users);
};

loadUsers();

const getUser = async (id) => {
  const urlApi = `https://reqres.in/api/users/${id}`;
  const response = await fetch(urlApi);
  const data = await response.json();
  const user = data.data;
  console.log(user);
};

const createUser = async () => {
  const urlApi = "https://reqres.in/api/users";
  const user = {
    email: document.getElementById("email").value,
    first_name: document.getElementById("firstname").value,
    last_name: document.getElementById("lastname").value,
  };

  try {
    const response = await fetch(urlApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      showAlertModal("Éxito", "Usuario creado con éxito");
    } else {
      throw new Error("Error al crear usuario");
    }
  } catch (error) {
    console.error(error);
    showAlertModal("Error", "Ocurrió un error al crear el usuario");
  }

  document.getElementById("my_modal_1").close();
};

const showAlertModal = (title, message) => {
  document.getElementById("alert_title").innerText = title;
  document.getElementById("alert_message").innerText = message;
  document.getElementById("alert_modal").showModal();
};

const closeAlertModal = () => {
  document.getElementById("alert_modal").close();
};

const deleteUser = async (id) => {
  const apiUrl = `https://reqres.in/api/users/${id}`;

  try {
    const response = await fetch(apiUrl, {
      method: "DELETE",
    });

    if (response.ok) {
      showAlertModal("Éxito", "Usuario eliminado con éxito");

      loadUsers();
    } else {
      throw new Error("Error al eliminar usuario");
    }
  } catch (error) {
    console.error(error);
    showAlertModal("Error", "Ocurrió un error al eliminar el usuario");
  }
};
