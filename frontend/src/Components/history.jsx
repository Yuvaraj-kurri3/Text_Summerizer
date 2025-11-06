import React, { useState, useEffect } from "react";
import axios from "axios";
import "./history.css";

export default function History() {
  const [history, setHistory] = useState([]);
  const [byHistory, setByHistory] = useState([]);
  const [deleteres, setDeleteres] =useState('')
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [id, setId] = useState("");  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


  const fetchHistory = async () => {
    const token=localStorage.getItem('token');
    if(!token) return;
    try {
      setLoading(true);
       const response = await axios.get(`${API_BASE_URL}/api/summarize/getsummarizationhistory`, {
        withCredentials: true,
        headers: {
        Authorization: `Bearer ${token}`,
        }
      });

        
      setHistory(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      console.error("Error fetching history:", err);
      setError("Failed to load history. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchHistoryById = async () => {
  // No ID entered
  if (!id || isNaN(Number(id))) {
    setError("Please enter a valid numeric ID.");
    setByHistory([]);
    return;
  }
  const token= localStorage.getItem('token');

  setDeleteres(false);
  setLoading(true);
  setError(null);

  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/summarize/getsummarizationhistoryByid/${Number(id)}`,
      { withCredentials: true ,
         headers: {
        Authorization: `Bearer ${token}`,
        }
      }
    );

 
     if (response.status === 404 || response.data?.message?.includes("not found")) {
      setDeleteres(`Summary not available for ID: ${id}`);
      setByHistory([]);  
      return;
    }

     if (response.status === 200 && response.data) {
      setByHistory(Array.isArray(response.data) ? response.data : [response.data]);
      setDeleteres(false);
    } else {
      setDeleteres(`Summary not available for ID: ${id}`);
      setByHistory([]);
    }
  } catch (err) {
    if (err.response?.status === 404) {
      setDeleteres(`No summary found for ID: ${id}`);
      setByHistory([]);
    } else {
      setError("Failed to load summary. Please try again later.");
    }
  } finally {
    setLoading(false);
  }
};


  const handleDelete = async (deleteId) => {
    try {
     let deleteres= await axios.delete(
        `${API_BASE_URL}/api/summarize/clearsummarizationhistory/${deleteId}`,
        { withCredentials: true }
      );
      setDeleteres(deleteres.data.message);
     await fetchHistory();
     setByHistory([]);
     setHistory();
    } catch (err) {
       setError("Failed to delete item. Please try again.");
    }
  };

  useEffect(() => {
    fetchHistory();
   }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
         <div className="col-md-10">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4">
              <h2 className="text-center mb-4 text-primary c">Your Summary History</h2>
              {deleteres && <p className="alert alert-danger">{'Response:'}{deleteres}</p>
              }

              {/* Input box and button */}
              <div className="d-flex gap-2 mb-3">
                <input
                  id="number"
                  name="number"
                  type="number"
                  required
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="Enter ID"
                  className="form-control"
                />
                <button
                  type="button"
                  onClick={fetchHistoryById}
                  className="btn btn-outline-primary"
                >
                  Get
                </button>
              </div>

              {/* Error message */}
              {error && <div className="alert alert-danger">{error}</div>}

              {/* Fetched history by ID */}
              {byHistory.length > 0 && (
                <div className="mb-4">
                  <h5 className="text-success">Result for ID: {id}</h5>
                  {byHistory.map((item, index) => (
                    <div
                      key={item?._id || index}
                      className="border rounded p-3 mb-3 bg-light"
                    >
                      <p>
                        <strong>Date:</strong>{" "}
                        {item?.date
                          ? new Date(item.date).toLocaleString()
                          : "No date available"}
                      </p>
                      <p>
                        <strong>Original Text:</strong>{" "}
                        {item?.usertext || "No text available"}
                      </p>
                      <p>
                        <strong>Summary:</strong>{" "}
                        {item?.summarizedText || "No summary available"}
                      </p>

                    <div className="flex flex-row gap-5">
                           
                            {!deleteres &&
                            
                       <div className="flex flex-row gap-3">
                         <button
                            className="btn btn-outline-danger btn-sm "
                            onClick={() => handleDelete(item?.id)}
                          >
                            Delete
                          </button>
                          <button
                    className="btn btn-outline-secondary btn-sm ml-20"
                    onClick={() => {
                      navigator.clipboard.writeText(item?.summarizedText);
                      alert("Summary copied to clipboard!");}}>
                    Copy
                  </button>
                       </div>
                          
                            }                           
                    </div>
                    </div>
                    
                  ))}
                </div>
              )}

              {/* Full history list */}
              {!error && (
                <div className="list-group">
                  {!history?.length ? (
                    <div className="text-center py-5">
                      <p className="text-muted mb-0">
                        No history available yet. Start summarizing texts to see them here!
                      </p>
                    </div>
                  ) : (
                    history.map((item, index) => (
                      <div
                        key={item?._id || index}
                        className="list-group-item list-group-item-action border rounded mb-3"
                      >
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <small className="text-muted">
                            {item?.date
                              ? new Date(item.date).toLocaleDateString()
                              : "Date not available"}
                            <br />
                            <small>ID-{item.id}</small>
                          </small>

                         
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(item?.id)}
                          >
                            Delete
                          </button>
                            
                        </div>
                        <div className="summary-content">
                          <div className="original-text mb-2">
                            <h6 className="mb-1">Original Text:</h6>
                            <p className="text-muted small mb-2">
                              {item?.usertext
                                ? `${item.usertext.substring(0, 200)}${
                                    item.usertext.length > 200 ? "..." : ""
                                  }`
                                : "No text available"}
                            </p>
                          </div>
                          <div className="summary-text">
                            <h6 className="mb-1">Summary:</h6>
                            <p className="mb-0">
                              {item?.summarizedText || "No summary available"}
                            </p>
                            <button
                    className="btn btn-outline-secondary btn-sm ml-20"
                    onClick={() => {
                      navigator.clipboard.writeText(item?.summarizedText);
                      alert("Summary copied to clipboard!");}}>
                    Copy
                  </button> 
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
