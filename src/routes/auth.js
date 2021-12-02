import { Button, Container, Paper, TextField, form } from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { getUsers, emailSignIn, emailSignUp } from "../api/api"
import "../styles/auth.css"
import { useSelector, useDispatch } from 'react-redux';
const initialInfo = {
    name:null, email: null, password: null, reEnter: null
}
const Auth = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isSignup, setIsSignup] = useState(true)
    const [formDetails, setFormDetails] = useState(initialInfo)
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formDetails)

        if (isSignup) {
            if (formDetails.password === formDetails.reEnter) {
                try {
                    localStorage.setItem(formDetails,"form")
                    dispatch(emailSignUp(formDetails,history))          
                }
                catch (err) {
                }
            }
            else {
                alert("password doesnot match")
            }
        }
        else {
            try {
                dispatch(emailSignIn(formDetails,true,history))
            }
            catch (err) {

            }
        }
    }
    const handleChange = (e) => {
        setFormDetails({ ...formDetails, [e.target.name]: e.target.value })
    }

    const success = (res) => {
        console.log(res)

        const { profileObj } = res
        const { tokenId } = res
        localStorage.setItem("profile", JSON.stringify(profileObj))
        try {
            console.log(profileObj.email)
            dispatch(getUsers(profileObj.email, profileObj.givenName,history))
        }
        catch (err) {
            console.log(err)
        }
        
    }
    const failure = (err) => {
        console.log("failuer")
    }

    return (<Container className="container" maxWidth={30}>
        <Paper className="paper" elevation={4}>
            <form onSubmit={handleSubmit}>
                {isSignup && <TextField
                    id="outlined-password-input"
                    label="Name"
                    type="text"
                    name="name"
                    autoComplete="current-password"
                    variant="outlined"
                    fullWidth
                    className="inputfield"

                    required
                    onChange={handleChange}
                    value={formDetails.givenName}
                />}
                <TextField
                    id="outlined-password-input"
                    label="Email"
                    type="email"
                    name="email"
                    autoComplete="current-password"
                    variant="outlined"
                    fullWidth
                    className="inputfield"
                    required
                    onChange={handleChange}
                    value={formDetails.email}


                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    variant="outlined"
                    fullWidth
                    className="inputfield"
                    required
                    onChange={handleChange}
                    value={formDetails.password}

                />
                {isSignup && <TextField
                    id="outlined-password-input"
                    label="ReEnter Password"
                    type="password"
                    name="reEnter"
                    autoComplete="current-password"
                    variant="outlined"
                    fullWidth
                    className="inputfield"
                    required
                    onChange={handleChange}
                    value={formDetails.reEnter}

                />}
                <Button variant="contained" color="primary" type="submit" fullWidth className="submit">
                    {isSignup ? "signup" : "signin"}
                </Button>
            </form>

            <GoogleLogin
                clientId="487972617096-orsjf0pai6k4uo7imordnprk0oino04g.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={success}
                onFailure={failure}
                cookiePolicy={'single_host_origin'}
                className="googlebutton"
            />{
                console.log("loop")
            }
            {isSignup ? <Button onClick={() => { setIsSignup(!isSignup) }} className="signin">Already have an account?signin</Button> : <Button onClick={() => { setIsSignup(!isSignup) }} className="signin">don't have an account?signup</Button>}
        </Paper>

    </Container>)
}
export default Auth