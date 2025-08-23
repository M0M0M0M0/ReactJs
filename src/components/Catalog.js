import { useState } from "react";

function Catalog(props) {
  const cat = props.data;
  const [status, setStatus] = useState("Active");
  const [like, setColor] = useState("Unlike");
  const toggleStatus = () => {
    setStatus(status === "Active" ? "Disable" : "Active");
  };
  const toggleColor = () => {
    setColor(like === "text-danger" ? "" : "text-danger");
  };
  return (
    <div>
      <h1>Catalog Name: {cat.name}</h1>
      <h2>Item Count: {cat.count} products</h2>
      <p>{status}</p>
      <p>
        <i className={"bi bi-suit-heart-fill " + like} onClick={toggleColor}></i>
      </p>
      <button type="button" onClick={toggleStatus}>
        {status === "Active" ? "Disable" : "Active"}
      </button>
    </div>
  );
}
export default Catalog;
