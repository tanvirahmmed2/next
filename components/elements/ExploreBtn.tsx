'use client'
import React from 'react'

const ExploreBtn = () => {
  return (
    <button type='button' onClick={()=> console.log('Explore button hitted')} className='px-3 p-2 mt-6 border-2 rounded-2xl border-black/20 bg-black/5 hover:bg-black/10 cursor-pointer'>
      <a href="/events">Explore More</a>
    </button>
  )
}

export default ExploreBtn
