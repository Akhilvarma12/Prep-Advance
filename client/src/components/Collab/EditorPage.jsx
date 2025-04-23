import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Client from './Client';
import CodeEditor from './CodeEditor';
import { initSocket } from '../../Socket';
import { Navigate, useLocation,useNavigate,useParams } from 'react-router-dom';

function EditorPage() {
  const socketRef=useRef(null);
  const location=useLocation();
  const navigate=useNavigate();
  const {roomId}=useParams
  useEffect(()=>{
    const init=async()=>{
      socketRef.current=await initSocket();
      socketRef.current.on('connect_error',(err)=> handleError(err))
      socketRef.current.on('connect_failed',(err)=> handleError(err))
       
      const handleError=(err)=>{
        console.log('socket error :',err);
        toast.error('Socket conection failed');
        Navigate('/dashboard/collab')
      }

      socketRef.current.emit('join',{
        roomId,
        username: location.state?.username,

      })
    }
    init();
  },[])
  const [clients,setClients]=useState([
    {socketId:'1',username:'Akhil',},
    {socketId:'2',username:'Kishore'}
  ]);
  
  if(!location.state){
    return <Navigate to='/dashboard/collab'/>
  }

  return (
    <Box sx={{ height: '100vh' }}>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={12} md={2}>
          <Paper
            sx={{
              height: '100%',
              backgroundColor: 'primary.dark',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              p: 2,
            }}
            square
          >
            <Typography variant="h6">Member</Typography>
            {clients.map((client)=>(
              <Client key={client.socketId} username={client.username}/>
            ))}
            <div style={{marginTop:300,}}>
            <button>copy room id</button>
            <button>Leave room</button>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={10}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h5">
              <CodeEditor/>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EditorPage;
