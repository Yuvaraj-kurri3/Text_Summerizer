import mongoose from 'mongoose';
// import AutoIncrementFactory from 'mongoose-sequence'
 

// const AutoIncrement = AutoIncrementFactory(mongoose.connection);
const summary_text=new mongoose.Schema({
    article:{
        type:String,
        required:true
    },
    summarizedText:{
        type:String,
        required:true   
    },
    date:{
        type:Date,
        default:Date.now
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    id:{
        type:Number
    }
})

 export default mongoose.model('Summerized_text',summary_text);