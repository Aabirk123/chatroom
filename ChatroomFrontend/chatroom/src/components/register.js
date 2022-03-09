import React, {useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//Material UI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckBox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { Typography, makeStyles, Container, ThemeProvider } from '@material-ui/core';
import { GridOnRounded, RestaurantRounded } from '@material-ui/icons';
import axiosIntance from '../Axios'


const useStyles = makeStyles((theme) => ({
    paper:{
        marginTop: theme.spacing(8),
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
    },
    avatar:{
        marign:theme.spacing(3),
        backgroundColor: "#0080ff",
    },
    form:{
        width:"100%",
        marginTop:theme.spacing(3),
    },
    submit :{
        margin:theme.spacing(3,0,2)
    }
}));

export default function SignUp(){

    const navigate = useNavigate();
    const intialFormData = Object.freeze({
        email:'',
        username:'',
        password:'',
        repeatPassword:''
    });

    const hasError = {
        error:false,
        type:''
    }

    const [formData, setFormData] = useState(intialFormData);
    const [hasErrorData, setErrorData] = useState(hasError);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    
    }

    const classes = useStyles();

    const validateForm = () => {

        const {email, username, password, repeatPassword} = formData;
        if(formData.repeatPassword !== formData.password){
            setErrorData({error:true,type:'nopassmatch'})
        }
        else if(email === '' || username === '' || password === ''||repeatPassword ===''){
            setErrorData({error:true, type:'blankfield'})
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        validateForm();
        if(!hasErrorData.error){
            axiosIntance
            .post(`user/register/`, {
                email:formData.email,
                username:formData.username,
                password:formData.password
            })
            .then((res)=>{
                navigate('/')
                console.log(res.data);
            })
            .catch((e) =>{
                console.log(e);
            })
        };

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}/>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                error={hasErrorData.error}
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                error={hasErrorData.error}
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                autoComplete="current-password"
                                type="password"
                                error={hasErrorData.error}
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="repeatPassword"
                                label="Re-enter Password"
                                name="repeatPassword"
                                autoComplete="repeat-password"
                                type="password"
                                error={hasErrorData.error}
                                value={formData.repeatPassword}
                                onChange={handleChange}
                            />
                        </Grid>
                       
                    </Grid>
                    <Button 
                        type='submit'
                        style={{marginTop:'2rem'}}
                        color='primary'
                        fullWidth
                        variant='outlined' 
                        onClick={handleSubmit}
                        
                    >
                        <Typography >
                            Submit
                        </Typography>
                    </Button>
                </form>
                
            </div>
        </Container>
    );
}

 