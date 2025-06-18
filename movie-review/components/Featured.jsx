import { PlayIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Featured = ({ kage }) => {
   return (
      <>
         {kage &&
            <Link href={`/detail/${kage.id}${kage.title?`movie${kage.title}`:`tv${kage.name}`}`}>
               <div className="relative w-full my-5 sm:my-10 sm:h-[30rem] h-[15rem]">
                  <Image fill alt="kage" sizes={100} className="object-cover bbg-top" src={`https://image.tmdb.org/t/p/original/${kage.backdrop_path}`} />
                  <div className="absolute z-20 w-full h-full bg-black opacity-60"></div>
                  <div className="absolute z-30 w-full h-full flex flex-col justify-end sm:justify-center px-3 sm:px-16">
                     <h3 className="sm:text-4xl text-xl text-white font-bold">{kage.name}</h3>
                     <div className="flex gap-6">
                        <p className=" text-gray-200 text-base font-bold my-1 sm:my-4">{new Date(kage.first_air_date).getFullYear()}</p>
                        <p className=" text-white text-xs font-bold my-1 sm:my-4 px-2 py-1 rounded-sm bg-[#313036e7] bg-opacity-85">{(kage.vote_average).toFixed(1)}</p>
                     </div>

                     <div className="w-2/4 hidden sm:block">
                        {kage.overview.slice(0, 200)}...
                     </div>
                     <div className="text-xs sm:hidden">
                        {kage.overview.slice(0, 100)}...
                     </div>
                     <div className="sm:my-7 my-3 flex gap-3 w-36 rounded-md bg-[#313036e7] hover:bg-[#222225] px-4 py-2">
                        <PlayIcon width={20} />
                        <button className="text-sm font-medium">Watch Now</button>
                     </div>
                  </div>
               </div>
            </Link>
         }
      </>
   )
}

export default Featured