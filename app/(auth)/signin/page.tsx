// export const metadata = {
//   title: "Sign In - Simple",
//   description: "Page description",
// };
'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignIn() {
  const router=useRouter();
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [flag, setflag]=useState(null);
  const [signup, setSignup]=useState(false);
  const [home, setHome]=useState(false);

  useEffect(()=>{
    if(flag===true){alert();router.push('/nda');}
    if(flag===false){router.push('/');}
  },[flag]

  )
  useEffect(()=>{
    if(signup===true){
      router.push('/signup')
    }
  },[signup])
  useEffect(()=>{
    if(home===true){
      router.push('/')
    }
  },[home])
  const handleclick=()=>{
    if (email === "" || password === "") {
      alert("Please fill in both fields.");
      return;
    }else{
    const userdata=JSON.parse(localStorage.getItem('userdata'));
    if(userdata===null){alert("Please Sing up.");setflag(false);}
    else{
      var emails=[];
      var passwords=[];
      for(let i=0;i<userdata.length;i++){
       emails.push(userdata[i].email)
       passwords.push(userdata[i].password)
      }
      if(emails.indexOf(email)===null){
        alert('You are unregistered user. Plese register.');
        setflag(false);
      }
      else {
        if((emails.indexOf(email)!==passwords.indexOf(password))){
          alert('Incorrect email or password.')
        }else{
          const d = new Date();
          localStorage.setItem("session",d.getTime());
          setflag(true);

        }
      }
      }
    }
  }
  const handlehome=()=>{
    setHome(true);
  }
  const handlesignup=()=>{
    setSignup(true);

  }
  return (
    <>
      <>
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Sign in to your account</h1>
        </div>
        {/* Form */}
        <form>
          <div className="space-y-4">
            <div>
              <label
                className="mb-1 block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                name="email"
                id="email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                className="form-input w-full py-2"
                type="email"
                placeholder="corybarker@email.com"
                required
              />
            </div>
            <div>
              <label
                className="mb-1 block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                name="password"
                id="password"
                className="form-input w-full py-2"
                type="password"
                autoComplete="on"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          <div className="mt-6">
            <button onClick={handleclick} className="btn w-full bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%]">
              Sign In
            </button>
            <div style={{marginTop:'1rem', display:'flex', justifyContent:'space-around'}}>

            <button onClick={handlesignup} className="btn w-40% bg-gradient-to-t from-green-600 to-green-500 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%]">
              Sign up
            </button>

            <button onClick={handlehome} className="btn w-40% bg-gradient-to-t from-slate-600 to-slate-400 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%]">
              Home
            </button>
            </div>
          </div>
        </form>
        {/* Bottom link */}
        {/* <div className="mt-6 text-center">
          <Link
            className="text-sm text-gray-700 underline hover:no-underline"
            href="/reset-password"
          >
            Forgot password
          </Link>
        </div> */}
      </>
    </>
  );
}
