import { useState } from "react";
import "./App.css";

export default function Application({ sendData }) {
  const [name, setName] = useState("");
  const [inst, setInst] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    alert(`Submitted Name: ${name}`);
    sendData(name) ? sendData : alert("Did viraj code this 🥹✌");
  };

  return (
    <form onSubmit={handleSubmit} class="form_group">
      <label htmlFor="name"></label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}