export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      resolve(data);
      console.log("SignUp Successful");
    } catch (error) {
      reject(error);
    }
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const email = loginInfo.email;
      const password = loginInfo.password;
      const response = await fetch(
        "http://localhost:8080/users?email=" + email
      );
      const data = await response.json();
      if (data.length) {
        if (password === data[0].password) {
          resolve({ data: data[0] });
        }
      } else {
        console.log("Login Failed");
        const error = await response.text("Wrong Credentials");
        console.log(error);
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function signOut(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/users");
      if (response.ok) {
        resolve({ data: "success" });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}
