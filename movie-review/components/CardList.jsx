import React from 'react'
import MovieCard from './MovieCard'

const CardList = ({popularMovie}) => {
   return (
      <div className="sm:mt-5 popular list overflow-x-auto">
         <div className="flex gap-5">
            {popularMovie && (popularMovie.results ? popularMovie.results : popularMovie.items).map((movie, index) => (
               <MovieCard movie={movie} key={index} />
            ))}
         </div>
      </div>
   )
}

export default CardList