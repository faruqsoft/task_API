import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { MAX_JASON_SIZE, PORT, REQUEST_NUMBERE, REQUEST_TIME, URL_ENCODE, WEB_CACHE, DATABASE  } from './app/config/config.js';
import router  from './routes/api.js';

const app = express();


//app use default middleware
app.use(cors());
app.use(express.json({limit:MAX_JASON_SIZE}));
app.use(express.urlencoded ({extended:URL_ENCODE}));
app.use (helmet());


//app use limiter

const limiter = rateLimit({windowMs:REQUEST_TIME,max:REQUEST_NUMBERE})
app.use(limiter);

//cache
app.set('etag',WEB_CACHE);


// database connect

mongoose.connect(DATABASE, {autoIndex:true})
    .then(()=>{
        console.log("Database Connected")
    }).catch((err)=>{
        console.log("Database Error",err)
});



app.use("/api",router);







app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
  });
