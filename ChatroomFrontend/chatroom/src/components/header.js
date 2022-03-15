import React, { useEffect, useState } from "react";
import {AppBar, Toolbar, Typography, Button, ThemeProvider, CssBaseline} from '@material-ui/core'
import { IconButton } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { Drawer } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import axiosInstance from "../Axios";
import Link from "@material-ui/core/Link"

const useStyles = makeStyles((theme) => ({
    appBar:{
        background:"#53c653",
    },
    button:{
        margin:"1rem"
    },
    paper:{
      display:'flex',
      flexDirection:'column',  
    }
}));

export default function Header(){

    const classes = useStyles();

    const [drawerState, setDrawerState] = useState(false);
    const [roomsData, setRoomData] = useState({rooms:[]})


    const handleDrawer = async () =>{

        if(drawerState){
            setDrawerState(false);
        }
        else{
            const rooms = await axiosInstance.get('rooms/')
            setRoomData({rooms:rooms.data})
            setDrawerState(true);
            
        }
    }


    const SignedInButtons = (() => {
        return (
            <React.Fragment>
                <Button 
                    variant="contained" 
                    style={{background:"white"}} 
                    className={classes.button}
                    component={NavLink}
                    to="/logout"
                >
                    Logout
                </Button>
                <Button
                    variant="contained"
                    style={{background:"white"}}    
                    className={classes.button}
                    component={NavLink}
                    to="/"
                >
                    Profile
                </Button>
            </React.Fragment>         
        );
    });

    const SignedOutButtons = (() => {
        return (
            <React.Fragment>

                <Button 
                    variant="contained" 
                    style={{background:"white"}} 
                    className={classes.button}
                    component={NavLink}
                    to="/register"
                >
                    Register
                </Button>
                <Button
                    variant="contained"
                    style={{background:"white"}}    
                    className={classes.button}
                    component={NavLink}
                    to="/login"
                >
                    Sign In
                </Button>
            </React.Fragment>
                    
        );
    });

    
    return(
        <React.Fragment>
            <CssBaseline/>
            <AppBar 
            className={classes.appBar}
            position="sticky">
                <Toolbar>
                    <IconButton style={{color:"white"}} onClick={handleDrawer}>
                        <MenuIcon/>
                    </IconButton>
                    <Drawer
                        open={drawerState}
                        anchor="left"
                    >
                        <Container maxWidth="xs" >
                            <CssBaseline/>
                            <Grid container spacing={3}>
                                <Grid item>
                                    <div style={{display:"flex", justifyContent:'flex-end'}}>
                                        <IconButton onClick={handleDrawer}>
                                            <ClearIcon/>    
                                        </IconButton>
                                    </div> 
                                </Grid>
                            </Grid>
                            {roomsData.rooms.map((room)=>{
                                return (<Grid key={room.id} style={{textDecoration:"none"}}item component={NavLink} to="/">        
                                        <Typography style={{padding:"0.5rem", color:"black"}} variant="h5">{room.title}</Typography>
                                        <Typography style={{padding:"0.5rem", color:"black"}}>{room.last_message}</Typography>
                                </Grid>)
                            })}
                        </Container>
                    </Drawer>
                    <nav style={{flexGrow:1}}>
                        <IconButton component={NavLink} to="/"> 
                            <HomeIcon style={{color:"white"}}></HomeIcon>
                        </IconButton>
                    </nav>
                    {Cookies.get('access_token') ? <SignedInButtons/> : <SignedOutButtons/>}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );

}