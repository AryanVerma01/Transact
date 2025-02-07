import LabeledInput from "./LabeledInput";
import { useState } from "react";
import axios from "axios";

export default function Signup(){
    const [firstName,SetfirstName] = useState("");
    const [lastName,SetlastName] = useState("");
    const [email,Setemail] = useState("");
    const [password,Setpassword] = useState("");
 

    return <div className="bg-slate-100 h-screen w-screen flex justify-center">
        <div className="bg-white drop-shadow-2xl h-96 w-72 my-auto flex justify-center py-6">
            <div>
                <div className="p-2"><LabeledInput title="firstName" type="text" placeholder="John" size="sm" onChange={(e) => { SetfirstName(e.target.value) }}/></div>
                <div className="p-2"><LabeledInput title="lastName" type="text" placeholder="Snow" size="sm" onChange={(e) => { SetlastName(e.target.value) } }/></div>           
                <div className="p-2"><LabeledInput title="email" type="text" placeholder="abcd@gmail.com" size="sm" onChange={(e) => { Setemail(e.target.value) }} /></div>
                <div className="p-2"><LabeledInput title="password" type="password" size="sm" onChange={ (e) => { Setpassword(e.target.value) } } /></div>
                <div className="p-2 mx-18"><button className="bg-slate-950 text-white font-semibold w-28 h-10 rounded-3xl" onClick={()=>{
                    axios.post('http://localhost:3001/api/v1/user/signup',{
                        firstName,
                        lastName,
                        email,
                        password
                    })
                }}>Signup</button></div>
            </div>
        </div>
    </div>
}