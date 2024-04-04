import express from 'express';
import bodyParser from 'body-parser'
import { idRouter } from "./src/routes/idRoute.js";
import { dbConnection } from "./src/config/db.js";

import { participantsRouter } from './src/routes/participantsRoute.js';
import 'dotenv/config';
import { pPollRouter } from './src/routes/pPollRoute.js';
import { voterRouter } from './src/routes/voterRoute.js';
const app = express();


app.use(express.json())
app.use(bodyParser.json());



app.use("/api",idRouter)
app.use("/api",participantsRouter)
app.use("/api",pPollRouter)
app.use("/api",voterRouter)



  const PORT = process.env.PORT || 5050;


(async function dbConnect()  {
    try {
            await dbConnection();
          
            app.listen(process.env.PORT, () => {
                console.log(`App is running on http://localhost:${process.env.PORT || 5050}`);
            });   

    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        throw error;
    }
})()

