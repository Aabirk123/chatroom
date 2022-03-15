import { Container, CssBaseline, Grid, TextField, Button, Typography } from "@material-ui/core";
import { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Cookies from 'js-cookie';

export default function GetRoom(){

    const intialMessage = Object.freeze({
        message:'',
        user_id:'',

    });

    const {roomid} = useParams()
    const [messages, setMessages]= useState({messages:[]})
    const [messageSend, setMessageSend] = useState(intialMessage);
    


    const client = new W3CWebSocket('ws://127.0.0.1:7000/ws/chat/' + roomid + '/');

    


    useEffect(() => {

        const token = Cookies.get('access_token');
        if(token){
            const tokenParts = JSON.parse(atob(token.split('.')[1]));
            const now = Math.ceil(Date.now()/ 1000);
            setMessageSend({...messageSend, user_id:tokenParts.user_id});
            
        }
        client.onopen = () =>{
            console.log('connected')
        }
        client.onmessage = (response) => {
            const dataFromServer = JSON.parse(response.data);
            console.log(dataFromServer.data)
            setMessages({messages:dataFromServer.data});
        }
    },[])

    const handleChange = (e) =>{
        setMessageSend({...messageSend, message:e.target.value})
    }
    
    const handleSubmit = (e) => {
        client.send(JSON.stringify(messageSend));
        client.onmessage = (response) => {
            const dataFromServer = JSON.parse(response.data);
            console.log(dataFromServer.data)
            setMessages({messages:dataFromServer.data});
        }
        setMessageSend({ message:''})
    }

    return(
        <Container maxWidth="sm" component="main" style={{marginTop:'2rem'}}>
            <CssBaseline/>
            <Grid spacing={3} container style={{flexDirection:'column', display:'flex'}}>
                {messages.messages.map((message) =>{
                    if(message.sender == messageSend.user_id){
                        return(
                            <Grid item key={message.id}>
                                <div style={{display:'flex', justifyContent:'flex-end'}}>
                                    <div style={{display:'flex', flexDirection:'column'}}>
                                        <Typography>{message.user_sent}</Typography>
                                        <Typography>{message.content}</Typography>
                                    </div>
                                </div>
                            </Grid>
                        )
                    }
                    return(
                        <Grid item key={message.id}>
                            <div style={{display:'flex', justifyContent:'flex-start'}}>
                                <div style={{display:'flex', flexDirection:'column', justifyContent:'flex-start'}}>
                                    <Typography>{message.user_sent}</Typography>
                                    <Typography>{message.content}</Typography>
                                </div>
                            </div>
                        </Grid>
                    )
                })    
                }
                <Grid key={100000} item>
                    <TextField value={messageSend.message} onChange={handleChange}></TextField>
                    <Button onClick={handleSubmit} variant="outlined">Send</Button>
                </Grid>
            </Grid>
        </Container>
    )
}