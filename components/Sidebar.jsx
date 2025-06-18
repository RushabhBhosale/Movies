'use client'
import { ak } from '@/utils/api'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Sidebar = () => {

  const [genre, setGenre] = useState()

  useEffect(() => {
    fetchGenres()
  }, [])

  const fetchGenres = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/genre/list?${ak}`);
      setGenre(response.data);
    } catch (error) {
      console.error("Error fetching TV data:", error);
    }
  };

  return (
    <div className='ps-8 pages'>
      <p className='font-bold p-2 my-2'>GENRE</p>
      {genre && genre.genres.map((gen, index) => (
        <Link key={index} href={`/discover/${gen.id}`}>
        <p className='text-gray-600 hover:text-gray-400 p-2 cursor-pointer'>{gen.name}</p>
        </Link>
      ))}
      <p className='font-bold p-2 my-2'>Languages</p>
      <p className='text-gray-600 hover:text-gray-400 p-2 cursor-pointer'>Marathi</p>
      <p className='text-gray-600 hover:text-gray-400 p-2 cursor-pointer'>Hindi</p>
      <p className='text-gray-600 hover:text-gray-400 p-2 cursor-pointer'>Japanese</p>
      <p className='text-gray-600 hover:text-gray-400 p-2 cursor-pointer'>English</p>
      <p className='text-gray-600 hover:text-gray-400 p-2 cursor-pointer'>Korean</p>
      <p className='text-gray-600 hover:text-gray-400 p-2 cursor-pointer'>English</p>

      <div className='p-2'>
        <Image src='/tmdb-logo.png' className='py-3' width={150} height={40} alt='tmdblogo' />
        <p className='text-gray-500'>Copyright 2024</p>
        <p className='text-gray-500'>Rushabh Bhosale</p>
      </div>
    </div>
  )

}

export default Sidebar