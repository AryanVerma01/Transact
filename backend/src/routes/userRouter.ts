import { Router } from "express";
import { Request ,Response } from "express";
export const userRouter = Router();
import mongoose from "mongoose";
import { z } from "zod";
import { userModel } from "../model/Usermodel";
import jwt from "jsonwebtoken";
const JWT_SECRET = "hellopaytm"
import { authmiddleware } from "../middleware/authmiddleware";
import { accModel } from "../model/Usermodel";

mongoose.connect(MONGO_DB_URL);

userRouter.post('/signup',async (req:Request,res:Response) =>{
   try{
        const signinValidation = z.object({
            firstName:z.string().min(4,{message:"at least 4 letters"}).max(20,{message:"at max 20 letters"}),
            lastName:z.string().min(4,{message:"at least 4 letters"}).max(20,{message:"at max 20 letters"}),
            email:z.string().email({message:"should be valid email address"}),
            password:z.string().min(8,{message:"password must be 8 letters"}).max(16,{message:"password at max 16 letters"})
        })

        const parsedbody = signinValidation.safeParse(req.body);

        const firstName =  parsedbody.data?.firstName
        const lastName = parsedbody.data?.lastName
        const email = parsedbody.data?.email
        const password = parsedbody.data?.password

        const response =await userModel.create({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password
        });
        console.log(response);

        const _id = response._id;
        const id = _id.toString();

        const accresponse = await accModel.create({
            userid:id,
            balance:Math.floor(Math.random()*10000)  
          })
        console.log(accresponse)

        res.status(200).json({
            msg:"User Created",
            hashedpassword:password
        })
   }
   catch(error){
        res.status(411).json({
            msg:"Email already taken / Incorrect inputs"
        })
   }
});

userRouter.post('/signin',async (req:Request,res:Response) =>{  
    try{
        const email = req.body.email
        const password = req.body.password

        const verifieduser = await userModel.findOne({
            email:email,
            password:password
        })

        if(!verifieduser){
            throw Error
        }
        else{
            const _id = verifieduser._id;
            const id = _id.toString();
            console.log(id);
            const token:string = jwt.sign( { id } ,JWT_SECRET);   // always use { id } in jwt.sign 

            res.json({
                token:token                
            })
        }
    }
    catch(error){
        res.status(411).json({
            msg:"Error while logging in"
        })
    }
})


userRouter.use(authmiddleware);        // this middleware verifies the user for all ungoing request
// before accessing these rquest user token gets verfied in middleware if tken is valid then user can send these requests

userRouter.put("/updateinfo",async (req:Request,res:Response) =>{

    try{
        //@ts-ignore
        const userid = req.userid;
        console.log(userid);

        const updateValidation = z.object({
            firstName:z.string().min(4,{message:"at least 4 letters"}).max(20,{message:"at max 20 letters"}),
            lastName:z.string().min(4,{message:"at least 4 letters"}).max(20,{message:"at max 20 letters"}),
            password:z.string().min(8,{message:"password must be 8 letters"}).max(16,{message:"password at max 16 letters"})
        })

        const parseBody = updateValidation.safeParse(req.body);

        if(!parseBody){
            throw Error
        }

        const updateUser = await userModel.updateOne({
            _id:userid
        },
        req.body)                        // req.body is dynamic which feilds only gets updated 

        console.log(updateUser);

        res.status(200).json({
            msg:"Update Successfully"
        })
    }
    catch(error){
        res.status(411).json({
            msg:"Error while Updating"
        })
    }
})

userRouter.get("/bulk",async (req:Request,res:Response) => {
    
    const firstName = req.body.firstName;

    const founduser = await userModel.find({
        firstName:firstName
    });

    res.json({
        founduser
    })

})