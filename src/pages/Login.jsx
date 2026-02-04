import React, { useState } from "react";
import API_URL from "../API/Api";

function Login() {
  // State variables
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent default form behavior

    const loginData = { email: emailAddress, password: password };
    console.log("Sending login data:", loginData);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      setResponseMessage(data.message || "");

      if (data.status === "success") {
        // Optional redirect after 5 seconds
        // setTimeout(() => {
        //   window.location.href = "/";
        // }, 5000);
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      {/* Display server response */}
      {responseMessage && (
        <div className="notice">
          <h2>{responseMessage}</h2>
        </div>
      )}

      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
          required
        />
        <br />

        <label htmlFor="password">Password:</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Login;
