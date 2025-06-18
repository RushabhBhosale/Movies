'use client'
import { fetchDataFromApi } from '@/utils/api';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Search = () => {
   const [search, setSearch] = useState('');
   const [movies, setMovies] = useState();
   const [tv, setTv] = useState();

   useEffect(() => {
      fetchMovie()
      fetchTv()
   }, [search ])


   const fetchMovie = () => {
      fetchDataFromApi(`/search/movie?query=${search}`)
         .then((res) => {
            setMovies(res);
         })
   };
   const fetchTv = () => {
      fetchDataFromApi(`/search/tv?query=${search}`)
         .then((res) => {
            setTv(res);
         })
   };

   const handleClick = () => {
      setSearch('');
   }



   return (
      <div className='relative'>
         <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="relative w-40 h-8 sm:h-12 sm:w-96 bg-gray-50ring-0 bg-[#313036] outline-none border border-neutral-500 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-gray-500  focus:border-gray-500 block focus:px-3 transition-all px-6"
            placeholder="Search ..." />
         <MagnifyingGlassIcon className='lg:w-6 lg:h-6 w-3 h-3 absolute  top-3 right-3' />
         <div className={`absolute flex flex-col w-40 sm:w-96`}>
            {movies && movies.results.slice(0, 6).map((movie, index) => (
               <Link onClick={handleClick} key={index} href={`/detail/${movie.id}${movie.title ? `movie${movie.title}` : `tv${movie.name}`}`}>
                  <div  className={`flex gap-2 px-3 ${index % 2 === 0 ? 'bg-[#161616]' : 'bg-[#0f1115]'}`}>
                     <div className='w-8 my-2 sm:w-[4.5rem]'>
                        <Image width={70} alt='poster' height={60} src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} />
                     </div>
                     <div className='sm:py-4 my-2 w-full'>
                        <p className='font-semibold text-[0.6rem] sm:text-base mb-1'>{(movie.name || movie.title).slice(0, 36)}</p>
                        <div className="justify-between hidden sm:flex">
                           <span className='pe-4'>{new Date(movie.release_date || movie.first_air_date).getFullYear()}</span>
                           <span className='bg-[#313036] text-white text-xs rounded-sm px-2 py-1 font-semibold'>{movie.vote_average && movie.vote_average.toFixed(1)} </span>
                        </div>
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </div>
   )
}

export default Search;
