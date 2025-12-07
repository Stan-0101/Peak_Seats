export default function loginFunction() {
    document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirm-password").value.trim();

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  const scriptURL = "https://sheetdb.io/api/v1/8d0djbxprffme";

  const data = {
    data: [
      {
        "Full Name": fullname,
        "Email Address": email,
        "Username": username,
        "Password": password
      }
    ]
  };

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert("Registration successful!");
      document.querySelector("form").reset();
      window.location.href = "/LoginPage";
    } else {
      alert("Failed to register. Please try again.");
    }
  } catch (error) {
    alert("Error connecting to server.");
    console.error(error);
  }
});
}
  