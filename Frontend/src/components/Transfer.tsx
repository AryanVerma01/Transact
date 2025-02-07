import LabeledInput from "./LabeledInput";
import { useState } from "react";
import axios from "axios";

export default function Transfer(){
    const [firstName,SetfirstName] = useState("");
    const [lastName,SetlastName] = useState("");
    const [balance,Setbalance] = useState("");

    async function sendMoney(){

        const intbalance = Math.floor(parseFloat(balance)); 
        console.log(intbalance)
    
        const t = localStorage.getItem("token");
        const token = t?.toString();
        console.log(token)

        const response = await axios.post('http://localhost:3001/api/v1/account/transfer',{
            firstName,
            lastName,
            balance:intbalance
        },{
            headers:{
                authorization:token
            }
        })
        console.log(response)
    }

    return <div className="bg-slate-100 h-screen w-screen flex justify-center">
        <div className="bg-white drop-shadow-2xl h-96 w-72 my-auto flex justify-center py-6">
            <div>
                <div className="p-2"><LabeledInput title="firstName" type="text" placeholder="John" size="sm" onChange={(e) => { SetfirstName(e.target.value) }}/></div>
                <div className="p-2"><LabeledInput title="lastName" type="text" placeholder="Snow" size="sm" onChange={(e) => { SetlastName(e.target.value) } }/></div>           
                <div className="p-2"><LabeledInput title="Balance" type="text" placeholder="Snow" size="sm" onChange={(e) => { Setbalance(e.target.value) } }/></div>     
                <div className="p-2 mx-18"><button className="bg-slate-950 text-white font-semibold w-28 h-10 rounded-3xl" onClick={()=>{sendMoney()}}>Transfer</button></div>
            </div>
        </div>
    </div>
}