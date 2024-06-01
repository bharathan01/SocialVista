import React from 'react'
import {Post} from '../../components'

function Following() {
  return (
    <div className='flex flex-col gap-10'>
        <Post/>
        <Post/>
        <Post/>
    </div>
  )
}

export default Following