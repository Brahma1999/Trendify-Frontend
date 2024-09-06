//Fetch Produt by Id
export async function fetchProductById(id) {
  const response = await fetch(`http://localhost:8080/products/${id}`);
  const data = await response.json();
  return { data };
}

//Create Product
export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/products/`, {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

//Update Product
export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products/" + update.id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

//Filter
export async function fetchProductsByFilters(filter, sort, pagination) {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}
  // pagination = { _start=0, _end=10}

  let queryString = "";
  // filter
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      queryString += `${key}=${categoryValues}&`;
    }
  }
  // sort
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  //pagination
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  // Remove trailing ampersand
  queryString = queryString.slice(0, -1);

  const response = await fetch(`http://localhost:8080/products?${queryString}`);
  const data = await response.json();
  const totalItems = await response.headers.get("X-Total-Count");
  return { data: { products: data, totalItems: +totalItems } };
}

//Fetch Categories
export async function fetchCategories() {
  const response = await fetch(`http://localhost:8080/categories`);
  const data = await response.json();
  return { data };
}

//Fetch Brands
export async function fetchBrands() {
  const response = await fetch(`http://localhost:8080/brands`);
  const data = await response.json();
  return { data };
}
