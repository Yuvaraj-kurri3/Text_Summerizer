const express= require('express');
const cors= require('cors');
const bodyParser= require('body-parser');  
const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const app=express();

app.use(cors());
app.use(bodyParser.json());


app.post("/summarize", async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      { inputs: text },
      {
        headers: {
           Authorization: `Bearer ${process.env.HuggingFaceApiKey}`, // Replace with your key

        },
      }
    );
     let summary = response.data[0].summary_text;
    summary = summary.split(" ").slice(0, 200).join(" ");
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: "Summarization failed" });
    console.error("Error during summarization:", error.message);
  }
});

app.get('/',(req,res)=>{
    res.send('Hello World!');
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})