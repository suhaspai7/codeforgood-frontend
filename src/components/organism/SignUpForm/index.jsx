import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Code for good
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
export default function SignUpForm (){
    const [emailError, setEmailError] = React.useState([false,'']);
    const [passwordError, setPasswordError] = React.useState([false,'']);
    const [confirmpasswordError,setconfirmpasswordError] = React.useState([false,'']);
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        let data = new FormData(event.currentTarget);
        let submit = true;
        data ={
          email: data.get('email'),
          password: data.get('password'),
          confirmpassword: data.get('confirmpassword'),
          name: data.get('name'),
          dateofbirth: `${data.get('dateofbirth')}`
        };
        console.log(data.dateofbirth)
        var re = /\S+@\S+\.\S+/;
        setEmailError([false,'']);
        setPasswordError([false,'']);
        setconfirmpasswordError([false,'']);
        if(!re.test(data.email)){
          setEmailError([true,'Email is not valid']);
          submit = false;
        }
        
        if (data.password.search(/[a-z]/i) < 0){
          setPasswordError([true,'Password must contain at least one letter']);
          submit = false;
        }
        if (data.password.search(/[0-9]/) < 0){
          setPasswordError([true,'Password must contain at least one number']);
          submit = false;
        }
        if(data.password.length < 8){
          setPasswordError([true,'Password must be at least 8 characters']);
          submit = false;
        }
        if(data.password !== data.confirmpassword){
          setconfirmpasswordError([true,'Password does not match']);
          submit = false;
        }
   
        if(submit){
          //make api call to end point signup using axios 
          //if success navigate to home page
          //if error show error message
           const response = signUpcall(data);
            response.then(
              response => {
                console.log(response.data.errors)
                if(response.status === 200 && response.data.errors == false){
                  swal("Success","Signup Successful","success");
                  
                }
                else{
                  const errormessage = response.data.errors.map(error => error.msg).join(', ');
                  swal("Error",errormessage,"error");
                }
              }
            );
          
        }


      };
      const signUpcall = async (data) => {
        const response = await axios({
          method: 'post',
          url: 'http://localhost:5000/auth/signup',
          data: data,
        });
        return response;
      }

  return(    
<Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                error={emailError[0]}
                helperText={emailError[1]}
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoFocus
              />
              <Typography  variant="h8">Date of Birth </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="dateofbirth"
                name="dateofbirth"
                type="date"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                error={passwordError[0]}
                helperText={passwordError[1]}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                error={confirmpasswordError[0]}
                helperText={confirmpasswordError[1]}
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                id="confirmpassword"
                
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="signin" variant="body2">
                    {"Have an Account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>)

        }