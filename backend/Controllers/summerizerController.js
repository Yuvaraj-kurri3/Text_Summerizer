import summmerizerSchema from '../models/Summerized_text.js';
import client from '../redisClient.js';
import axios from 'axios';
import  summarizeQueue  from "../queue/SummarizeQueue.js";
import { config } from 'dotenv';

config();

export const summmerizer= async(req,res)=>{
  const {article}=req.body;
          try {
        const response = await axios.post(
          "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn",
          { inputs:  article},
          {
            headers: {
               Authorization: `Bearer ${process.env.HuggingFaceApiKey}`,  
    
            },
          }
        );
         let summary = response.data[0].summary_text;
         const userid=req.user.id;
        summary = summary.split(" ").slice(0, 200).join(" ");
        await client.del(`userid:${userid}`)
         await client.set(`newsummaryID:${userid}`,JSON.stringify(summary));

         
        await summarizeQueue.add("summarizeJob", { summary, userid });
         
         const  count = await summmerizerSchema.countDocuments({ userid: userid });
        let newSummary = new summmerizerSchema({
            article: article,
            summarizedText: summary,
            userid: req.user.id,
            id:count+1        
        });
        await newSummary.save();

        res.json({ summary});
      } catch (error) {
        res.status(500).json({ error: "Summarization failed" , err : error});
       }
}

  export const getSummarizationHistory = async (req, res) => {

  try {
      const userId = req.user && req.user.id;
     if (!userId) return res.status(401).json({ message: 'User not authenticated' });
       const  Redisfullhistroy= await client.get(`userid:${userId}`)
     

      if(Redisfullhistroy>0){
        return  res.status(200).json(JSON.parse(Redisfullhistroy));

      }
    const history = await summmerizerSchema.find({ userid: userId }).sort({ date: -1 }).limit(50);
     if(!history.length>0) return res.status(202).json({message:'no histroy availble'})
     await client.set(`userid:${userId}`,JSON.stringify(history))
      await client.expire(`userid:${userId}`, 60000); // min

    res.status(200).json(history);
  }
  catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

 export const getSummarizationHistoryByid = async (req, res) => {
  try {
    const summaryId = req.params.id || req.query.id;
    const userId = req.user.id;
    console.log(userId)

    if (!summaryId) {
      return res.status(400).json({ message: "Summary ID is required" });
    }

     const cachedData = await client.get(`summarybyid:${summaryId}-userid:${userId}`);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

     const summaryHistory = await summmerizerSchema.findOne({id: summaryId,userid: userId,});

    if (!summaryHistory) {
      return res.status(404).json({ message: "Summary not found for this user" });
    }

    await client.set(`summarybyid:${summaryId}-userid:${userId}`,JSON.stringify(summaryHistory));
    await client.expire(`summarybyid:${summaryId}-userid:${userId}`, 600);

    return res.status(200).json(summaryHistory);
  } catch (err) {
    // console.error("Error in getSummarizationHistoryByid:", err);
    res.status(500).json({ message: "Server error" });
  }
};





export const clearSummarizationHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const summaryId = Number(req.params.id || req.query.id);

    if (summaryId) {
      const result = await summmerizerSchema.deleteOne({ id: summaryId, userid: userId });

      // ✅ Clear specific Redis keys
      await client.del(`summarybyid:${summaryId}-userid:${userId}`);
      await client.del(`userid:${userId}`);

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Summary not found or not authorized" });
      }

      return res.status(200).json({ message: "Summary deleted successfully" });
    }

    // ✅ Clear all user summaries
    await summmerizerSchema.deleteMany({ userid: userId });
    await client.del(`userid:${userId}`);

    res.status(200).json({ message: "History cleared successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};



export  const getjob= async(req,res)=>{
  const  {id}= req.params.id || req.query.id;
  const job = await summarizeQueue.getJob(id);
  if (!job) return res.status(404).json({ error: "Job not found" });

  const state = await job.getState();
  const result = job.returnvalue;

  res.json({ state, result });

}