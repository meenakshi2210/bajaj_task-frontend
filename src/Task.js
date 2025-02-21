import { useState } from "react";

export default function Task() {
  const [jsonInput, setJsonInput] = useState('{"data": ["A", "C", "z"]}');
  const [responseData, setResponseData] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      const response = await fetch("https://bajaj-task-backend-yf0j.onrender.com/bfhl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });
      const result = await response.json();
      setResponseData(result);
    } catch (error) {
      alert("Invalid JSON or server error");
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedFilters((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#f4f4f4", minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", color: "#007BFF" }}>Data Validation Task</h1>
      <textarea
        style={{ width: "100%", maxWidth: "600px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)" }}
        rows="4"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button
        style={{ marginTop: "10px", backgroundColor: "#007BFF", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer", boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)" }}
        onClick={handleSubmit}
      >
        Submit
      </button>
      <div style={{ marginTop: "20px", backgroundColor: "white", padding: "15px", borderRadius: "5px", boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)", width: "100%", maxWidth: "400px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>Filters</h2>
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>
            <input type="checkbox" value="alphabets" onChange={handleFilterChange} /> Alphabets
          </label>
          <label style={{ display: "block", marginBottom: "5px" }}>
            <input type="checkbox" value="numbers" onChange={handleFilterChange} /> Numbers
          </label>
          <label style={{ display: "block", marginBottom: "5px" }}>
            <input type="checkbox" value="highest_alphabet" onChange={handleFilterChange} /> Highest Alphabet
          </label>
        </div>
      </div>
      <div style={{ marginTop: "20px", backgroundColor: "white", padding: "15px", borderRadius: "5px", boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)", width: "100%", maxWidth: "400px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>Response</h2>
        {responseData && (
          <div style={{ color: "#333" }}>
            {selectedFilters.includes("alphabets") && (
              <p style={{ marginBottom: "5px" }}>Alphabets: <span style={{ fontWeight: "bold" }}>{responseData.alphabets?.join(", ") || "N/A"}</span></p>
            )}
            {selectedFilters.includes("numbers") && (
              <p style={{ marginBottom: "5px" }}>Numbers: <span style={{ fontWeight: "bold" }}>{responseData.numbers?.join(", ") || "N/A"}</span></p>
            )}
            {selectedFilters.includes("highest_alphabet") && (
              <p>Highest Alphabet: <span style={{ fontWeight: "bold" }}>{responseData.highest_alphabet || "N/A"}</span></p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}