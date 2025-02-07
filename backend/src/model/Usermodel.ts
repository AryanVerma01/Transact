import mongoose from "mongoose";
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

// restrict UserSchema using TypeScript interface
interface IUser{
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    createdAt:Date
}

const UserSchema = new Schema<IUser>({
    firstName:{
        type:String,
        required:[true,"Firstname is required"]
    },
    lastName:{
        type:String,
        required:[true,"Lastname is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email already exist"],
        match:[/^[a-zA-Z0-9_.+\-]+[\x40][a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,"Invalid email address"]
    },
    password:{
        type:String,
        required:true
    }
});
 
interface IAcc {
    userid:any,
    balance:number
}

const accountSchema = new Schema<IAcc>({
    userid:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:[true,"Userid is required"]
    },
    balance:{
        type:Number,
        required:[true,"Balance is required"]
    }
})

export const accModel = mongoose.model("account",accountSchema);
export const userModel = mongoose.model("user",UserSchema);