import express from "express"
const app = express();
import { userRouter } from "./routes/userRouter";
import cors from "cors"
import { accRouter } from "./routes/accountRouter";

app.use(cors());               // enables all cross-origin request since backend and frontend are hosted in different directories
app.use(express.json());       // parse req.body

app.use('/api/v1/user',userRouter);        // routes begin with /api/user autmatically directs to userRouter
app.use("/api/v1/account",accRouter); 

ConnectToPort();

async function ConnectToPort(){
    await app.listen(3001);
    console.log("Connected to Port:3001");
    return;
}