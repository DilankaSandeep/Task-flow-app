import {useState} from "react";
import {auth} from "../../firebase.ts";
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import './signIn.css'


const provider = new GoogleAuthProvider();
export const SignIn = () => {


    console.log(auth);

    function  handlesignIn(){
        signInWithPopup(auth, provider).then(res=>{

        }).catch(err=>{
            console.log("Failed to sign-In"+ err);
        })
    }
    return (
        <>
        <div  className="flex flex-col items-center justify-center h-full gap-8 ">
            <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-4xl animate__animated animate__backInRight"><span
                className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-800">Task Flow</span> : Effortless To-Do Management</h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Welcome to Task Flow, the ultimate solution for streamlined task management designed to make your life easier and more organized. Task Flow is not just a to-do list; it's your personal productivity companion, accessible from anywhere, whether you're at your computer or on the go with your mobile device.</p>
            <div>
                <button type="button" onClick={handlesignIn}
                        className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                    <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                         fill="currentColor" viewBox="0 0 18 19">
                        <path fill-rule="evenodd"
                              d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                              clip-rule="evenodd"/>
                    </svg>
                    {}
                    Sign in with Google
                </button></div>
            <div className="background ">
                <img src={"src/images/todo.png"} alt="Description of the image" />

            </div>

        </div>
        </>
    );
};