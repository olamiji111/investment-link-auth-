import React from 'react';
import Header from "@/components/shared/header";
import Loader from "@/components/shared/loader";

const NotFound = () => {
    return (
        <div className='h-dvh relative'>
            <Header headerTitle='' />

            <Loader loaderText='Please Wait...' />


        </div>
    )
}

export default NotFound;
