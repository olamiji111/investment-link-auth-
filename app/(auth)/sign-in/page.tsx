"use client"
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import Header from '@/sections/header';
import { Eye, EyeOff, Mail, Lock, MessageSquareMore } from 'lucide-react';
import Link from 'next/link';
import { socialsMediaLogins } from '@/constants';
import { Checkbox } from "@/components/ui/checkbox"

interface FormData {
    email: string;
    password: string;
};

interface LoginStateProps {
    loginState: LoginState;
    setLoginState: Dispatch<SetStateAction<LoginState>>;
}

interface LoginState {
    state: "Sign In" | "Forget Password";
}


const LoginState = ({ loginState, setLoginState }: LoginStateProps) => {
    const formRef = useRef<HTMLFormElement | null>(null);

    const [form, setFormData] = useState<FormData>({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const onChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev, [name]: value
        }))
    }
    return (
        <div>
            <form ref={formRef} className='flex flex-col gap-6 w-full p-8 pb-0' >

                <div data-slot='email input' className=' w-full border-b border-zinc-300  bg-transparent py-2 px-2 mt-1'>
                    <div className='flex flex-row gap-x-2 items-center '>
                        <Mail className='size-6 text-zinc-400' strokeWidth={2} />
                        <input
                            onChange={onChangeEvent}
                            value={form.email}
                            name="email"
                            type="email"
                            placeholder='Email'
                            className='text-black text-[16px] font-normal w-full pr-8 pl-2 brder-none outline-none bg-transparent placeholder:text-zinc-400 placeholder:text-[17px] placeholder:font-medium'
                        />
                    </div>
                </div>

                <div data-slot='password input' className='w-full overflow-hidden border-b border-zinc-300  bg-transparent py-2 px-2 mt-1'>
                    <div className='flex flex-row gap-x-2 items-center  justify-between'>
                        <Lock className='size-6 text-zinc-400' strokeWidth={2} />
                        <input
                            type={!showPassword ? "text" : "password"}
                            onChange={onChangeEvent}
                            value={form.password}
                            name="password"
                            placeholder='Password'
                            className={` text-black text-[16px] font-normal w-full pl-1 pr-2  brder-none outline-none bg-transparent placeholder:text-zinc-400 placeholder:text-[16px] placeholder:font-medium ${showPassword ? 'tracking-[0.18rem]' : 'tracking-normal'}  placeholder:tracking-normal`}
                        />
                        <button onClick={() => setShowPassword(!showPassword)} className='text-zinc-400 cursor-pointer transition-all duuration-300'>
                            {!showPassword ?
                                <EyeOff className='size-5 ' strokeWidth={3} />
                                :
                                <Eye className='size-5 ' strokeWidth={3} />
                            }
                        </button>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full py-3  text-[hsla(0,0%,100%,.949)] text-md font-bold rounded-[0.3rem] cursor-pointer transition-all duration-300
                                bg-link-color hover:bg-link-hover  active:scale-[0.98]"

                >
                    Log in
                </button>

                <button onClick={() => setLoginState({ state: "Forget Password" })} className=" -mt-4 text-link-color hover:text-link-hover text-md font-medium  duration-300 transition-all">
                    Forgot Password?
                </button>

            </form>
            <div className='py-6 flex flex-col items-center justify-center gap-4'>
                <p className='text-zinc-500 text-lg font-medium'> or log in with </p>

                <div data-slot="socials media Logins" className='flex flex-row gap-x-3 items-center'>
                    {socialsMediaLogins.map(({ name, icon: Icon }, idx) => (
                        <button key={idx} className='cursor-pointer flex items-center justify-center shrink-0 p-2 border border-[#dadce0] rounded-[0.25rem] transition-colors duration-300 hover:bg-[rgba(66,133,244,.08)]  hover:border-[rgb(210,227,252)] active:bg-[rgba(66,133,244,.12)]'>
                            <Icon className='size-5' />
                        </button>
                    ))}
                </div>

                <div className='flex flex-row gap-x-2 items-center mt-4'>
                    <Checkbox id="keep-logged-in" className=' cursor-pointer data-checked:bg-link-hover data-checked:border-transparent' />
                    <label htmlFor="keep-logged-in" className='text-black text-sm font-medium cursor-pointer'> Keep me logged in </label>
                </div>
            </div>
        </div>
    )
};

const ForgotPasswordState = ({ loginState, setLoginState }: LoginStateProps) => {
    const [email, setEmail] = useState<string>("");

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    return (
        <div className='p-10 flex flex-col gap-5 items-center justify-center w-full'>
            <h2 className='text-[1.85rem] text-link-color font-medium text-center'> Forgot your password?</h2>
            <p className='text-link-color text-md text-center font-medium'>We can send you an email to help you get back into your account. </p>

            <div data-slot='email input' className=' w-full border-b border-zinc-300  bg-transparent py-2 px-2 mt-1'>
                <div className='flex flex-row gap-x-2 items-center '>
                    <Mail className='size-6 text-zinc-400' strokeWidth={2} />
                    <input
                        onChange={onChangeEmail}
                        value={email}
                        name="email"
                        type="email"
                        placeholder='Email'
                        className='text-black text-[16px] font-normal w-full pr-8 pl-2 brder-none outline-none bg-transparent placeholder:text-zinc-400 placeholder:text-[17px] placeholder:font-medium'
                    />
                </div>
            </div>

            <button
                type="submit"
                className="mt-2 w-full py-3  text-[hsla(0,0%,100%,.949)] text-md font-bold rounded-[0.3rem] cursor-pointer transition-all duration-300
                                bg-link-color hover:bg-link-hover  active:scale-[0.98]"

            >
                Send Email
            </button>

            <button onClick={() => setLoginState({ state: "Sign In" })} className='text-md font-medium transition-colors duration-300  text-link-color hover:text-link-hover bg-none border-none '> Cancel </button>

        </div>
    )
}

const SignIn = () => {

    const chatRef = useRef<HTMLButtonElement | null>(null);
    const [loginState, setLoginState] = useState<LoginState>({ state: "Sign In" });

    const handleLiveChatClick = () => {
        if (chatRef.current) {
            chatRef.current.click();
        } else {
            console.log("Live chat button not found");
        }
    }

    return (
        <main className=" h-dvh" >
            <Header />
            <div className='h-full py-12 px-4 sm:px-6 lg:px-8 '>
                <div className='px-1 py-8 flex flex-col items-center justify-center '>
                    <div className='mt-4 w-full sm:w-11/12 md:w-7/12  border  border-zinc-300 overflow-hidden  bg-transparent rounded-xs  '>
                        {loginState.state === "Sign In" ?
                            <LoginState loginState={loginState} setLoginState={setLoginState} />
                            :
                            <ForgotPasswordState loginState={loginState} setLoginState={setLoginState} />
                        }
                        <div className='mt-5'>
                            <button ref={chatRef} onClick={handleLiveChatClick} className=' flex items-center justify-center shrink-0  flex-row gap-x-1 space-x-1 cursor-pointer transition-colors duration-300 select-none text-[14px] font-normal border border-transparent text-link-color hover:text-white   ease-in-out bg-[#f3f4f9] hover:bg-[#2e86fe] font-semibold w-full h-10'>
                                <MessageSquareMore className='size-5 ' strokeWidth={2} />
                                <span> Live Support </span>
                            </button>
                        </div>
                    </div>
                    {loginState.state === "Sign In" &&
                        <Link href="/" className='mt-4 text-md font-normal text-link-color hover:text-link-hover transition-colors duration-300 '> Don&apos;t have an account? create one </Link>
                    }


                </div>
            </div>
        </main>
    )
}

export default SignIn;
