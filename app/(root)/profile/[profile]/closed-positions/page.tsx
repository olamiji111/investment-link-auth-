import React from 'react';
import Header from "@/components/shared/header";
import PageTemplate from '@/components/shared/pagetemplate';

const ClosedPosition = () => {
    const header = "No records have been found"
    return (
        <div className=' h-dvh flex flex-col relative overflow-hidden!'>
            <Header headerTitle="Closed Positions" />
            <PageTemplate header={header} />
        </div>
    )
}

export default ClosedPosition;
