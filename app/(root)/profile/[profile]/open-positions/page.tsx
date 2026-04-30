"use client";
import React, { useState } from 'react';
import Header from '@/components/shared/header';
import Image from "next/image";
import Link from "next/link";
import PageTemplate from "@/components/shared/pagetemplate"

const OpenPosition = () => {
    const header = "You have no open positions";
    const content = "Fund your account and let our automated Bot  start opening new positions."

    return (
        <div className="h-dvh flex flex-col relative overflow-hidden! ">
            <Header headerTitle="Open Positions" />
            <PageTemplate header={header} content={content} />
        </div>
    )
}

export default OpenPosition;
