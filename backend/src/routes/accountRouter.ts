import { Router } from "express";
export const accRouter = Router();
import { Request,Response } from "express";
import { authmiddleware } from "../middleware/authmiddleware";
import { accModel, userModel } from "../model/Usermodel";
import { z } from "zod" 

accRouter.use(authmiddleware);

accRouter.get("/balance",async (req:Request,res:Response) =>{
    try{
        //@ts-ignore
        const userid = req.userid

        const user = await accModel.findOne({
            userid:userid
        })
        const balance = user?.balance

        res.status(200).json({
            balance:balance
        })
    }
    catch(error){
        res.status(411).json({
            msg:"Unable to fetch balance"
        })
    }
})

accRouter.post("/transfer",async (req:Request,res:Response)=>{
    try{
        //@ts-ignore
        const userid = req.userid

        const transferValidation = z.object({
            firstName:z.string().min(4,{message:"at least 4 letters"}).max(20,{message:"at max 20 letters"}),
            lastName:z.string().min(4,{message:"at least 4 letters"}).max(20,{message:"at max 20 letters"}),
            balance:z.number().min(1,{message:"at least one digit"})
        });

        const parsedbody = transferValidation.safeParse(req.body);
        console.log(parsedbody);
        
        const toFirstname = parsedbody.data?.firstName
        const tolastName = parsedbody.data?.lastName
        const balance = parsedbody.data?.balance

        const toUser = await userModel.findOne({
            firstName:toFirstname,
            lastName:tolastName
        })
        console.log(toUser);

        //@ts-ignore
        const id = toUser._id ;
        const toUserid = id.toString();

        const response = await accModel.updateOne({
            userid:userid
        },{
            $inc:{
                balance: -balance!
            }
        })
        console.log(response);

        const response2 = await accModel.updateOne({
            userid:toUserid
        },{
            $inc:{
                balance:balance
            }
        })
        console.log(response2);

        res.status(200).json({
            msg:"Successfully Transfered"
        })
    }
    catch(error){
        res.status(400).json({
            msg:"Error in transfering"
        })
    }
})