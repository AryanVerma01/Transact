import { NextFunction,Request,Response } from "express";
const JWT_SECRET = "hellopaytm"
import jwt from "jsonwebtoken"

export async function authmiddleware(req:Request,res:Response,next:NextFunction){
    try{
        const token = req.headers.authorization
        
        if(!token){
            throw Error
        }else{
            const decodeddata = jwt.verify(token,JWT_SECRET);
            //@ts-ignore
            req.userid = decodeddata.id;
            next();
        }
    }
    catch(error){
        res.status(411).json({
            msg:"Invalid Token"
        })
    }
}