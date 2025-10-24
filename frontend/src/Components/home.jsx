import React, { useState } from "react";
import axios from "axios";
import "./home.css";


function Home() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) {
      alert("Please enter some text to summarize!");
      return;
    }

    setLoading(true);
    setSummary("");

    try {
      const res = await axios.post("http://localhost:3000/summarize", { text });
      setSummary(res.data.summary);
    } catch (err) {
        console.log(err)
      setSummary("Error: Unable to summarize text.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🧠 Text Summarizer</h1>
      <textarea
        placeholder="Paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSummarize} disabled={loading}>
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {summary && (
        <div className="output">
          <h3>Summary (max 200 words)</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
