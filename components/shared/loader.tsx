import React from 'react'
import Image from "next/image";



const Loader = ({ loaderText }: { loaderText: string }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-none">

            <div className="flex flex-row items-center gap-x-2">

                <Image
                    alt="loading"
                    src="/asset/images/loading.webp"
                    width={20}
                    height={20}
                    className="w-16 h-16 object-contain"
                />

                <p className="text-link-color text-[17px] font-semibold">{loaderText}</p>

            </div>

        </div>
    )
}

export default Loader;
