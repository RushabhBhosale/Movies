import React from 'react'
import MovieCard from './MovieCard'

const SearchList = ({popularMovie}) => {
   return (
      <div className="sm:mt-5 overflow-auto">
         <div className="flex flex-wrap justify-evenly gap-5">
            {popularMovie && (popularMovie ? popularMovie : popularMovie.items).map((movie, index) => (
               <MovieCard movie={movie} key={index} />
            ))}
         </div>
      </div>
   )
}

export default SearchList