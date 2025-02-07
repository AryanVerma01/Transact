import LabeledInput from "./LabeledInput";
import { useState } from "react";
import axios from "axios";

export default function Signin(){
    const [email,Setemail] = useState("");
    const [password,Setpassword] = useState("");
 
    async function signinRequest(){
        const response = await axios.post('http://localhost:3001/api/v1/user/signin',{
            email,
            password
        })
        //@ts-ignore
        console.log(response.data.token);

        //@ts-ignore
        localStorage.setItem('token',response.data.token);
    }

    return <div className="bg-slate-100 h-screen w-screen flex justify-center">
        <div className="bg-white drop-shadow-2xl h-96 w-72 my-auto flex justify-center py-6">
            <div>
                <div className="p-2"><LabeledInput title="email" type="text" placeholder="abcd@gmail.com" size="sm" onChange={(e) => { Setemail(e.target.value) }} /></div>
                <div className="p-2"><LabeledInput title="password" type="password" size="sm" onChange={ (e) => { Setpassword(e.target.value) } } /></div>
                <div className="p-2 mx-18"><button className="bg-slate-950 text-white font-semibold w-28 h-10 rounded-3xl" onClick={()=>{signinRequest()}}>Signin</button></div>
            </div>
        </div>
    </div>
}