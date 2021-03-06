import React, { useState } from "react";
import { Redirect } from "react-router-dom"
import axios from "axios";
import Background from "../../assets/images/backgroundImg.jpg"
import Header from "../../components/Header"
import TextField from '@material-ui/core/TextField';

function Signup() {

    const { isLoggedIn, isTrainer } = JSON.parse(localStorage.getItem("user")) || ""

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [trainer, setTrainer] = useState();

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        if (!userName || !password || !firstName || !lastName || !email || trainer === undefined) {
            return alert("Please fill out all fields before submitting.")
        } else if (validateEmail(email) !== true) {
            return alert("Please enter a valid email address.")
        } else if (password !== passwordConfirm) {
            return alert("Password does not match password confirmation.")
        }

        axios.post("/api/signup",
            {
                username: userName,
                email: email,
                password: password,
                isTrainer: trainer,
                firstName: capitalizeFirstLetter(firstName),
                lastName: capitalizeFirstLetter(lastName)
            })
            .then(function (res) {
                // console.log(res);

                alert(`Profile ${userName} has been created. Please login with this information`)
                window.location.href = "/login"
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            {(!isLoggedIn ?

                <div style={{
                    backgroundImage: `url(${Background})`,
                    backgroundRepeat: 'no-repeat', width: '100%', height: '100%'
                }}>
                    <Header />
                    <div style={{ background: "rgba(255, 255, 255, 0.6)" }}>
                        <br />
                        <h1>Sign Up</h1>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <TextField label="First Name" variant="outlined"
                                autoFocus
                                style={{ margin: "5px" }}
                                type="text"
                                value={firstName}
                                onChange={event => setFirstName(event.target.value)}
                            />
                            <br />
                            <TextField label="Last Name" variant="outlined"
                                style={{ margin: "5px" }}
                                type="text"
                                value={lastName}
                                onChange={event => setLastName(event.target.value)}
                            />
                            <br />
                            <TextField label="Email" variant="outlined"
                                type="text"
                                style={{ margin: "5px" }}
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                            <br />
                            <TextField label="Username" variant="outlined"
                                type="text"
                                style={{ margin: "5px" }}
                                value={userName}
                                onChange={event => setUserName(event.target.value)}
                            />
                            <br />
                            <TextField label="Password" variant="outlined"
                                type="password"
                                style={{ margin: "5px" }}
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                            />
                            <br />
                            <TextField label="Confirm Password" variant="outlined"
                                type="password"
                                style={{ margin: "5px" }}
                                value={passwordConfirm}
                                onChange={event => setPasswordConfirm(event.target.value)}
                            />
                            <br />
                            <div className="custom-control custom-radio">
                                <input type="radio"
                                    id="customRadio1"
                                    name="customRadio"
                                    className="custom-control-input"
                                    value={false}
                                    onChange={event => setTrainer(event.target.value)}
                                />
                                <label className="custom-control-label" htmlFor="customRadio1" style={{ fontSize: "15px", paddingRight: "6px" }}>
                                    I am a Client
                                </label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input type="radio"
                                    id="customRadio2"
                                    name="customRadio"
                                    className="custom-control-input"
                                    value={true}
                                    onChange={event => setTrainer(event.target.value)} />
                                <label className="custom-control-label" htmlFor="customRadio2" style={{ fontSize: "15px" }}>
                                    I am a Trainer
                                </label>
                            </div>
                            <br />
                            <input className="btn btn-primary" type="submit" value="Sign Up" />
                        </form>

                        <br />
                        <h6 style={{ fontSize: "18px" }}><a href="/login">I have an existing account.</a></h6>
                        <br />
                    </div>
                </div>
                :
                (isLoggedIn === true ? (isTrainer === true ? <Redirect to="/trainer" /> : <Redirect to="/clienthome" />) : null))}
        </>
    );
}

export default Signup;