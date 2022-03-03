import React from "react";
import {AppBar, Toolbar, Typography, Button, ThemeProvider} from '@material-ui/core'
import { IconButton } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    appBar:{
        background:"#53c653",
    },
    button:{
        margin:"1.5rem"
    }
}));

export default function Header(){

    const signedOutButtons = (() => {
        return (
            <Button variant="contained" style={{background:"red"}} className={classes.button}>
                <Typography>
                        Loginfff
                </Typography>
            </Button>
                    
        );
    })

    const classes = useStyles();
    return(
        <React.Fragment>
            <AppBar 
            className={classes.appBar}
            position="sticky">
                <Toolbar>
                    <IconButton style={{color:"white"}}>
                        <MenuIcon/>
                    </IconButton>
                    <nav style={{flexGrow:1}}>
                        <Typography style={{margin:"1rem", color:"white"}} component={NavLink} to="/">
                            Chatter App
                        </Typography>
                    </nav>
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
                    component={NavLink}
                    to="/login"
                    >
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );

}