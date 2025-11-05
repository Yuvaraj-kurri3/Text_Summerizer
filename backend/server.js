import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import connectDB from './config/db.js';
import userroutes from './routes/userroute.js';
import summarizedtextroutes from './routes/summerizedtextRoute.js';
import middlewaresroute from './routes/middlewareroute.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { console } from 'inspector';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
const app = express();

 app.use(cors({
    origin: ["http://localhost", "http://localhost:5173"], 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

 app.use(cookieParser());  
app.use(bodyParser.json());
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'textsummarizersecret',
    resave: false,
    saveUninitialized: true,   
    samesite: 'none',

}))

 
connectDB();

app.use('/api/user',userroutes);
app.use('/api/summarize',summarizedtextroutes);
app.use('/api/middleware',middlewaresroute);
app.get('/health',(req,res)=>{
    res.send('Welcome to Suvidha Foundation..');
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})