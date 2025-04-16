import React from 'react'
import "../../index.css"
import { Pointer } from 'lucide-react'

function CollabHome() {
  return (
    <div className='collab-home' style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <div className='room-form' >
        <h4>Enter the room ID</h4>
        <input type='text' placeholder='Room Id'/>
        <input type='text' placeholder='Username'/>
        <button>Join </button>
        <p className='mt-3'>Dont have a room Id?<span style={{cursor:"pointer"}}>New Room</span></p>
        </div>

    </div>
  )
}

export default CollabHome