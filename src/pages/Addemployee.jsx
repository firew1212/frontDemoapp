import React, { useState } from "react";
import {API_URL} from "../API/Api";

function AddEmployee() {
  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  // State for message
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const data = {
      first_name: firstName,
      last_name: lastName,
      email: emailAddress,
      password: password,
    };

    try {
      const response = await fetch(
        `${API_URL}/addemployee`,


        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add employee");
      }

      const result = await response.json();
      console.log(result);

      setMessage("✅ Employee added successfully!");

      // Clear form
      setFirstName("");
      setLastName("");
      setEmailAddress("");
      setPassword("");
    } catch (error) {
      console.error(error);
      setMessage("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Add Employee</h1>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <label>First name:</label><br />
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        /><br />

        <label>Last name:</label><br />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        /><br />

        <label>Email:</label><br />
        <input
          type="email"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
          required
        /><br />

        <label>Password:</label><br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;
