// fetchLoggedInUserOrders APi
export function fetchLoggedInUserOrders(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/orders/?user.id=${id}`);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchLoggedInUser(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users/" + id);
    const data = await response.json();
    resolve({ data });
  });
}

//Update User APi
export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
