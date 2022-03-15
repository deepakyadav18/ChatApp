const mongoose=require('mongoose')

const connectDatabase=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });

        console.log(`Connection successfully to MongoDB:${conn.connection.host}`);

    } catch(err){
        console.log(`Error:${err.message}`);
        process.exit();
    }
};

module.exports=connectDatabase;