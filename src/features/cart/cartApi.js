//Add to Cart
export function addToCart(item) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

// Get Produt by Id
export async function fetchItemsByUserId(userId) {
  const response = await fetch(`http://localhost:8080/cart?user=` + userId);
  const data = await response.json();
  return { data };
}

//Update Cart
export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

//Delete product  from cart
export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
}

//Reset Cart
export function resetCart(userId) {
  // get all items of user's cart - and then delete each
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId(userId);
    const items = response.data;
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }
    resolve({ status: "success" });
  });
}
