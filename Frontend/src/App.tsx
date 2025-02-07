import Home from "./Home"
import  { BrowserRouter, Route , Routes } from "react-router-dom"
import Signin from "./components/Signin"
import Signup from "./components/Signup"
import Transfer from "./components/Transfer"

export default function App(){
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/send" element={<Transfer/>}></Route>
    </Routes>
  </BrowserRouter>
}