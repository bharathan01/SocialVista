import React, { useEffect } from 'react'
import Post from '../../components/shared/posts/Post'

function Foryou() {
  useEffect(()=>{
    console.log("haii")
  },[])
  return (
    <div>
        <Post/>
    </div>
  )
}

export default Foryou