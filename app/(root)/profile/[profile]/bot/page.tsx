import React from 'react'
import Header from "@/components/shared/header";


const Bot = () => {
    return (
        <div className='h-dvh flex col overflow-y-auto relative '>
            <Header headerTitle="" />
            <div
                className="absolute top-0  left-0 size-full bg-no-repeat"
                style={{
                    backgroundImage: `
      url('/asset/images/IMG_6352.WEBP'),
      linear-gradient(to bottom, transparent 14rem, #fff 24rem),
      linear-gradient(to bottom left, #57d7f0 0%, #2e86fe 26rem)
    `,

                    backgroundRepeat: "no-repeat",
                }}
            ></div>
        </div>
    )
}

export default Bot