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


    const handleDrawer = () =>{
        drawerState ? setDrawerState(false) : setDrawerState(true);
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
                        <Container>
                            <Grid container spacing={3} style={{flexDirection:'column'}}>
                                <Grid item>
                                    <IconButton onClick={handleDrawer}>
                                        <ClearIcon/>    
                                    </IconButton> 
                                </Grid>
                                <Grid item xs={12}>
                                    hello
                                </Grid>
                                <Grid item xs={12}>
                                    whatever
                                </Grid>
                            </Grid>
                        </Container>
                    </Drawer>
                    <nav style={{flexGrow:1}}>
                        <Typography style={{margin:"1rem", color:"white"}} component={NavLink} to="/">
                                Chatter
                        </Typography>
                    </nav>
                    {Cookies.get('access_token') ? <SignedInButtons/> : <SignedOutButtons/>}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );

}