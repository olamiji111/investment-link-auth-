"use client";
import React, { useState } from 'react';
import Header from '@/components/shared/header';
import PageTemplate from '@/components/shared/pagetemplate';

const Order = () => {
    const header = "You have no future orders";
    const content = "An order is a request to open a position at a specified rate. You can open an order by checking Buy when rate is in the buy/sell screen."
    return (
        <div className="h-dvh flex flex-col relative ">
            <Header headerTitle="Orders" />
            <PageTemplate header={header} content={content} />

        </div>
    )
}

export default Order;
