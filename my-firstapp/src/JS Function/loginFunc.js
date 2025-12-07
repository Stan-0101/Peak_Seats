// src/JS Function/loginFunc.js

export default function loginFunction() {
 
  document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const apiURL = "https://sheetdb.io/api/v1/8d0djbxprffme";

  try {
    const response = await fetch(`${apiURL}/search?Username=${username}&Password=${password}`);
    const data = await response.json();

    if (data.length > 0) {
      localStorage.setItem("loggedUser", username);
      alert("Login successful!");
      window.location.href = "/"; 
    } else {
      alert("Invalid username or password.");
    }
  } catch {
    alert("Connection error.");
  }
});

}
