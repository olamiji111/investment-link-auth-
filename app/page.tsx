"use client";
import Image from "next/image";
import Link from "next/link";
import Header from "../sections/header";
import Content from "../sections/content";
import { useEffect } from "react";

const SignIn = () => {

  return (
    <main className="h-dvh ">
      <Header />
      <div className="py-12">
        <Content />
      </div>
    </main>
  );
}

export default SignIn 
