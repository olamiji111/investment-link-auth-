'use client';
import React, { useState, useRef } from 'react'
import Image from "next/image";
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, User, MessageSquareMore, Check } from 'lucide-react';
import { socialsMediaLogins, tradingFeatures } from '@/constants';
import TradingViewOilChart from '@/components/shared/tradingview';
import { useRouter } from 'next/navigation';
import { SignUpSchema } from '@/lib/validations/signupschema';
import { signUpUser } from '@/lib/actions/auth.action';
import { auth } from "@/firebase/client";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { sendEmailVerification } from 'firebase/auth';
import { toast } from "sonner";
import { useSocialLogin } from "@/lib/actions/socialsignup";

; interface FormData {
    name: string;
    email: string;
    password: string;
};

interface FormError {
    name: string;
    email: string;
    password: string;
}
const Content = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const chatRef = useRef<HTMLButtonElement | null>(null);
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const { handleSocialLogin, socialloading } = useSocialLogin();

    const [form, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState<FormError>({
        name: "",
        email: "",
        password: ""
    });

    const onChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev, [name]: value
        }))
    }


    const [showPassword, setShowPassword] = useState<boolean>(false);

    const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = SignUpSchema.safeParse(form);

        if (!result.success) {
            const errors = result.error.issues;

            const formatted = {
                name: "",
                email: "",
                password: "",
            };

            errors.forEach((err) => {
                const field = err.path[0] as keyof typeof formatted;

                if (field in formatted) {
                    formatted[field] = err.message;
                }
            });

            setError(formatted);
            return;
        }

        setError({
            name: "",
            email: "",
            password: ""
        });

        setLoading(true);

        let interval: NodeJS.Timeout | null = null;
        let finished = false;

        try {
            const { name, email, password } = result.data;

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;
            const uid = user.uid;

            await sendEmailVerification(user);

            toast.success("Verification email sent. Please check your inbox.", {
                duration: 4000
            });

            const res = await signUpUser({
                uid,
                name,
                email,
                password
            });

            if (!res.success) {
                await userCredential.user.delete();
                toast.error(res.message);
                setLoading(false);
                return;
            }


            interval = setInterval(async () => {
                await user.reload();

                if (user.emailVerified && !finished) {
                    finished = true;

                    if (interval) clearInterval(interval);

                    toast.success("Email verified successfully!");

                    setLoading(false);

                    router.push(`/profile/${uid}/trade`);
                }
            }, 3000);


            setTimeout(() => {
                if (!finished) {
                    finished = true;

                    if (interval) clearInterval(interval);

                    setLoading(false);

                    toast.error("Verification timed out. Please try again.");
                }
            }, 60000);

        } catch (err: unknown) {
            console.error("SIGNUP ERROR:", err);

            if (interval) clearInterval(interval);

            setLoading(false);

            if (err && typeof err === "object" && "code" in err) {
                const firebaseError = err as { code: string; message: string };

                if (firebaseError.code === "auth/email-already-in-use") {
                    setError((prev) => ({
                        ...prev,
                        email: "This email is already in use."
                    }));
                } else {
                    toast.error(firebaseError.message || "An unexpected error occurred.");
                }
            } else if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("An unknown error occurred.");
            }
        }
    };

    const handleLiveChatClick = () => {
        if (chatRef.current) {
            chatRef.current.click();
        } else {
            console.log("Live chat button not found");
        }
    };

    return (
        <>
            <div className='relative py-8 mt-2  px-4 sm:px-6'>
                {(loading || socialloading) && (

                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-none">

                        <div className="flex flex-row items-center gap-x-2">

                            <Image
                                alt="loading"
                                src="/asset/images/loading.webp"
                                width={20}
                                height={20}
                                className="w-16 h-16 object-contain"
                            />

                            <p className="text-link-color text-[17px] font-semibold">Loggin In...</p>

                        </div>

                    </div>

                )}
                <form ref={formRef} onSubmit={formSubmitHandler} className='flex  flex-col gap-y-6 items-center px-4 '>
                    <h2 className='text-[1.75rem] text-logo-color leading-9 text-center font-semibold'> Join 33+ million who have chosen TradeBot</h2>
                    {/* Email Input*/}
                    <div className='flex flex-col items-start gap-y-2 w-full'>
                        <div data-slot='FullName input' className='relative w-full overflow-hidden border border-zinc-400 rounded-[0.35rem] bg-transparent py-2.5 px-3 mt-1'>
                            <div className='flex flex-row gap-x-2 items-center '>
                                <User className='size-5 text-zinc-400' strokeWidth={1.5} />
                                <input
                                    onChange={onChangeEvent}
                                    value={form.name}
                                    name="name"
                                    type="text"
                                    placeholder='Full Name'
                                    onFocus={() => { }}
                                    onBlur={() => { }}
                                    className='text-black text-[16px] font-normal w-full pr-8 pl-2 brder-none outline-none bg-transparent placeholder:text-zinc-400 placeholder:text-[16px]'
                                />
                            </div>
                        </div>
                        {error.name && (
                            <span className='text-red-600 text-xs'> {error.name} </span>
                        )}

                    </div>
                    {/* Email Input*/}
                    <div className='flex flex-col items-start gap-y-2 w-full'>
                        <div data-slot='email input' className='relative w-full overflow-hidden border border-zinc-400 rounded-[0.35rem] bg-transparent py-2.5 px-3 mt-1'>
                            <div className='flex flex-row gap-x-2 items-center '>
                                <Mail className='size-5 text-zinc-400' strokeWidth={1.5} />
                                <input
                                    onChange={onChangeEvent}
                                    value={form.email}
                                    name="email"
                                    type="text"
                                    placeholder='Email'
                                    onFocus={() => { }}
                                    onBlur={() => { }}
                                    className='text-black text-[16px] font-normal w-full pr-8 pl-2 brder-none outline-none bg-transparent placeholder:text-zinc-400 placeholder:text-[16px]'
                                />
                            </div>
                        </div>
                        {error.email && !error.name && (
                            <span className='text-red-600 text-xs'> {error.email} </span>
                        )}
                    </div>
                    {/* Password Input */}
                    <div className='flex flex-col items-start gap-y-2 w-full'>
                        <div data-slot='password input' className='relative w-full overflow-hidden border border-zinc-400 rounded-[0.35rem] bg-transparent py-2.5 px-3 mt-1'>
                            <div className='flex flex-row gap-x-2 items-center  justify-between'>
                                <Lock className='size-4 text-zinc-400' strokeWidth={2} />
                                <input
                                    type={!showPassword ? "text" : "password"}
                                    onChange={onChangeEvent}
                                    value={form.password}
                                    name="password"
                                    placeholder='Password'
                                    onFocus={() => { }}
                                    onBlur={() => { }}
                                    className={` text-black text-[16px] font-normal w-full pl-1 pr-2  brder-none outline-none bg-transparent placeholder:text-zinc-400 placeholder:text-[16px] ${showPassword ? 'tracking-[0.18rem]' : 'tracking-normal'}  placeholder:tracking-normal`}
                                />
                                <button onClick={() => setShowPassword(!showPassword)} className='text-zinc-500 cursor-pointer transition-all duuration-300'>
                                    {!showPassword ?
                                        <EyeOff className='size-4' />
                                        :
                                        <Eye className='size-4 ' />
                                    }
                                </button>
                            </div>
                        </div>
                        {error.password && !error.name && !error.email && (
                            <span className='text-red-600 text-xs'> {error.password} </span>
                        )}
                    </div>
                    {/* Submit Button  */}
                    <button
                        type="submit"
                        className="w-full py-3.5 mt-4 text-[hsla(0,0%,100%,.949)] text-lg font-bold rounded-[0.55rem] cursor-pointer transition-all duration-300
                                bg-[linear-gradient(90deg,#11afff_5%,#2e86fe_33%)]
                                hover:brightness-110 active:scale-[0.98]"
                    >
                        Create Account
                    </button>
                </form>
                <div className='flex flex-col gap-y-2 py-3 items-center justify-center'>
                    <span className='text-[#000000b2] text-[0.8125rem] font-bold'> or create an account with </span>
                    <div data-slot="socials media Logins" className='flex flex-row gap-x-3 items-center mt-2'>
                        {socialsMediaLogins.map(({ name, icon: Icon }, idx) => (
                            <button

                                onClick={() => handleSocialLogin(name.trim().toLowerCase())}
                                key={idx}
                                className='cursor-pointer flex items-center justify-center shrink-0 p-3 border border-[#dadce0] rounded-[0.25rem] transition-colors duration-300 hover:bg-[rgba(66,133,244,.08)]  hover:border-[rgb(210,227,252)] active:bg-[rgba(66,133,244,.12)]'
                            >
                                <Icon className='size-6' />
                            </button>
                        ))}
                    </div>
                </div>
                <div className="pt-6  mt-3 flex flex-row items-center justify-between w-full px-2">
                    <Link href="/sign-in" className='cursor-pointer transition-colors duration-300 select-none text-[15px] font-[500] text-link-color hover:text-link-hover active:text-link-hover'>
                        Already have an account?
                    </Link>
                    <button ref={chatRef} onClick={handleLiveChatClick} className='z-10 flex shrink-0  flex-row gap-x-1  items-center space-x-1 cursor-pointer transition-colors duration-300 select-none text-[14px] font-normal border border-transparent text-link-color hover:text-white rounded-full px-3 py-2.5   ease-in-out bg-[#f3f4f9] hover:bg-[#2e86fe] font-semibold'>
                        <MessageSquareMore className='size-5 ' strokeWidth={2} />
                        <span> Live Support </span>
                    </button>
                </div>
            </div>
            <div className='flex flex-col gap-5 items-center justify-center'>
                <p className='text-xs text-zinc-600 font-normal text-center'> 33+ million registered customers with the Plus500 Group. </p>

                <div data-slot="about plus500" className='relative py-6 bg-[#0c2780] w-full  border border-transparent shadow shadow-gradie'>
                    <div
                        className="
                            absolute inset-0 pointer-events-none

                            [background-image:linear-gradient(to_bottom,rgba(0,0,0,0.15),transparent_2rem,transparent_calc(100%-2rem),rgba(0,0,0,0.15)),url('/asset/images/signin-plus-bg.svg')]

                            [background-position:0_0,left_100%_bottom_-3rem]
                            [background-repeat:no-repeat,no-repeat]
                            [background-size:100%_100%,23rem_auto]
                        "
                    />
                    <div className="flex justify-center w-full">
                        <div className="flex flex-col gap-y-8 w-fit">
                            {tradingFeatures.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-x-2">

                                    <div className="p-0.5 shrink-0 rounded-full flex items-center justify-center border-2 border-[#11afff]">
                                        <Check className="size-3 text-[#11afff]" strokeWidth={3.5} />
                                    </div>

                                    <span className="text-white text-[15px] font-normal leading-tight">
                                        {feature}
                                    </span>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='py-8 mt-12 flex flex-col gap-4 items-center  justify-center px-4 sm:px-6 lg:px-8'>
                <span className='text-center text-link-color text-[14px] font-normal'> Remember that CFDs are a leveraged product and can result in the loss of your entire capital. Trading CFDs may not be suitable for you. Please ensure you fully understand the risks involved. </span>
                <div className='mt-2 text-zinc-400 text-[12px] font-medium'>
                    This site is protected by reCAPTCHA and by Google&apos;s
                    <Link href="/" className='cursor-pointer text-link-color hover:text-link-hover active:text-link-hover transition-colors duration-300 mx-1 '>
                        Privacy Policy
                    </Link>
                    and
                    <Link href="/" className='cursor-pointer text-link-color hover:text-link-hover active:text-link-hover transition-colors duration-300 mx-1 '>
                        Terms of Service
                    </Link>
                </div>
                <span className='text-zinc-400 font-medium text-[12px]'>
                    TradeBot is a trademark of Plus500 Ltd.
                </span>
            </div>
        </>
    );
};

export default Content;