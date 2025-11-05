import client  from '../redisClient.js'


const getdatafromredis = async(req,res)=>{
 await client.set("testKey", "Hello Yuvraj");
  const value = await client.get("myname");
  res.send(`Redis is working ✅ — ${value}`);

}
 
export default getdatafromredis;