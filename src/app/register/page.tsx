"use client"
import axios from "axios";
import Google from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

function Register() {
    const [name, setName]= useState("")
    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")

    const router =useRouter()

    const handleRegister = async (e:React.FormEvent)=>{
        e.preventDefault();
        try {
            const result =await axios.post('/api/auth/register',{
                name,email,password
            })
            router.push('/login')
            
        } catch (error) {
            console.log(error)
            
        }
    }
    
  return (
    <div className='min-h-screen flex justify-center items-center bg-black text-white px-4'>
        <div className='w-full max-w-md border-2 border-white rounded-2xl p-8 shadow-lg bg-gray-800'>

            <h1 className='text-2xl mb-6 font-semibold text-center'>Register</h1>

            <form onSubmit={handleRegister}>
                {/* Name Input Field */}
                <div>
                    <label className='block mb-1 font-medium'>Name </label>
                    <input type="text" placeholder='Enter Name'
                    className='w-full border-b border-white py-2 px-1 bg-gray-800 text-white outline-none plceholder-gray-400 mb-4'
                    onChange={(e)=>setName(e.target.value)}
                    value={name}
                    />
                </div>

                {/* Email Input Field */}
                 <div>
                    <label className='block mb-1 font-medium'>Email </label>
                    <input type="text" placeholder='Enter Email'
                    className='w-full border-b border-white py-2 px-1 bg-gray-800 text-white outline-none plceholder-gray-400 mb-4'
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                    />
                </div>

                {/* Password Input Field */}
                <div>
                    <label className='block mb-1 font-medium'>Password </label>
                    <input type="password" placeholder='Enter Password'
                    className='w-full border-b border-white py-2 px-1 bg-gray-800 text-white outline-none plceholder-gray-400 mb-4'
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                    />
                </div>

                <p className='text-sm text-center my-2' onClick={()=>router.push('/login')}>Already have an account ? <span className='text-blue-400 hover:underline'>login</span></p>

                <button className='w-full py-2 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-400 transition-color'>Register</button>

                </form>

                <div className='flex items-center justify-center gap-[5px]'>
                    <hr className='flex-grow border-gray-500'/>
                    <span>or</span>
                    <hr className='flex-grow border-gray-500'/>
                </div>

                <button className='w-full flex items-center justify-center gap-2 py-2 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-400 transition-color' onClick={()=>signIn('google',{callbackUrl:"/"})}><FcGoogle /><span>Sign Up with Google</span></button>
            
            
        </div>

    </div>
  )
}

export default Register