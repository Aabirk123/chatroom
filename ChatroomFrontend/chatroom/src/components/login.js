import { Avatar, Button, Container, CssBaseline, makeStyles, TextField, ThemeProvider, Typography  } from "@material-ui/core";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../Axios";
import Cookies from 'js-cookie';

const useStyles = makeStyles((theme) =>({
    paper:{
        marginTop:theme.spacing(8),
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
    },
    avatar:{
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form:{
        width:'100%',
        marginTop:theme.spacing(1),
    },
    submit:{
        margin:theme.spacing(3, 0, 2)
    }
}));

export default function SignIn(){
    const navigate = useNavigate();
    const intialFormData = Object.freeze({
        username:'',
        password:'',
    })

    const [formData, updateFormData] = useState(intialFormData)
    
    const handleChange = (e) =>{
        updateFormData({...formData, [e.target.name]:e.target.value.trim()})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance
            .post('token/', {
                username:formData.username,
                password:formData.password,
            })
            .then((res) =>{
                Cookies.set('access_token', res.data.access);
                Cookies.set('refresh_token', res.data.refresh);
                axiosInstance.defaults.headers['Authorization'] = 
                    'JWT ' + Cookies.get('access_token');
                navigate('/');
                window.location.reload();          
            })
    }

    const classes = useStyles();

    return(
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}></Avatar>    
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        marign="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Sign In
                    </Button>

                </form>
            </div>
        </Container>
    )
}