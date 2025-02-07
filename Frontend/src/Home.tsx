export default function Home(){
    return <div className="bg-slate-950 h-screen w-screen text-white p-16">
        <div className="font-bold text-4xl">Transact</div>
        <div className="bg-white text-slate-950 text-xl font-bold h-12 m-8 w-32 rounded-xl text-center pt-2"><a href="/signup">Signup</a></div>
        <div className="bg-white text-slate-950 text-xl font-bold h-12 m-8 w-32 rounded-xl text-center pt-2"><a href="/signin">Signin</a></div>
        <div className="bg-white text-slate-950 text-xl font-bold h-12 m-8 w-32 rounded-xl text-center pt-2"><a href="/send">Send Money</a></div>
    </div>
}