import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header"
import Background from "../assets/images/backgroundImg.jpg"

function Signup() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [isTrainer, setTrainer] = useState();

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    // console.log(validateEmail(email))

    async function handleSubmit(evt) {
        evt.preventDefault();

        if (!userName || !password || !firstName || !lastName || !email || isTrainer === undefined) {
            return alert("Please fill out all fields before submitting.")
        } else if (validateEmail(email) !== true) {
            return alert("Please enter a valid email address.")
        } else if (password !== passwordConfirm) {
            return alert("Password does not match password confirmation.")
        }

        await axios.post("/api/signup",
            {
                username: userName,
                email: email,
                password: password,
                isTrainer: isTrainer,
                firstName: firstName,
                lastName: lastName
            })
            .then(async function (res) {
                console.log(res);
                console.log(res.data.hasOwnProperty('errors'));
                console.log("is trainer?", res.data.isTrainer);

                if (res.data.hasOwnProperty('errors') === true) {
                    alert(`Field ${res.data.errors[0].message}`)
                }

                await (res.data.isTrainer === true ? signupTrainer() : signupClient())

                async function signupTrainer() {
                    await axios.post("/api/trainer/signup", {
                        username: userName,
                        firstName: firstName,
                        lastName: lastName,
                        UserId: res.data.id
                    })
                        .then(res => {
                            console.log(res);
                            alert(`Trainer profile ${userName} has been created. Please login with this information`)
                            window.location.href = "/login"
                        })
                        .catch(err => console.log(err))
                }
                async function signupClient() {
                    await axios.post("/api/client/signup", {
                        username: userName,
                        firstName: firstName,
                        lastName: lastName,
                        UserId: res.data.id
                    })
                        .then(res => {
                            console.log(res);
                            alert(`Client profile ${userName} has been created. Please login with this information`)
                            window.location.href = "/login"
                        })
                        .catch(err => console.log(err))
                }

            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div style={{
                backgroundImage: `url(${Background})`,
                backgroundRepeat: 'no-repeat', width: '100%', height: '100%'
            }}>
                <Header />
                <h1 style={{ color: "white", fontFamily: "serif" }}>Signup</h1>
                <br />
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName" style={{ color: "white", fontFamily: "serif", fontSize: "20px" }}>First Name:</label><br />
                    <input
                        autoFocus
                        style={{ margin: "5px", padding: "5px", borderRadius: "5px", border: "2px solid gray" }}
                        type="text"
                        value={firstName}
                        onChange={event => setFirstName(event.target.value)}
                    />
                    <br />
                    <label htmlFor="lastName" style={{ color: "white", fontFamily: "serif", fontSize: "20px" }}>Last Name:</label><br />
                    <input
                        style={{ margin: "5px", padding: "5px", borderRadius: "5px", border: "2px solid gray" }}
                        type="text"
                        value={lastName}
                        onChange={event => setLastName(event.target.value)}
                    />
                    <br />
                    <label htmlFor="email" style={{ color: "white", fontFamily: "serif", fontSize: "20px" }}>Email:</label><br />
                    <input
                        type="text"
                        style={{ margin: "5px", padding: "5px", borderRadius: "5px", border: "2px solid gray" }}
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <br />
                    <label htmlFor="username" style={{ color: "white", fontFamily: "serif", fontSize: "20px" }}>Username:</label><br />
                    <input
                        type="text"
                        style={{ margin: "5px", padding: "5px", borderRadius: "5px", border: "2px solid gray" }}
                        value={userName}
                        onChange={event => setUserName(event.target.value)}
                    />
                    <br />
                    <label htmlFor="password" style={{ color: "white", fontFamily: "serif", fontSize: "20px" }}>Password:</label><br />
                    <input
                        type="password"
                        style={{ margin: "5px", padding: "5px", borderRadius: "5px", border: "2px solid gray" }}
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    <br />
                    <label htmlFor="password" style={{ color: "white", fontFamily: "serif", fontSize: "20px" }}>Confirm Password:</label><br />
                    <input
                        type="password"
                        style={{ margin: "5px", padding: "5px", borderRadius: "5px", border: "2px solid gray" }}
                        value={passwordConfirm}
                        onChange={event => setPasswordConfirm(event.target.value)}
                    />
                    <br />
                    <br />
                    <div className="custom-control custom-radio">
                        <input type="radio"
                            id="customRadio1"
                            name="customRadio"
                            className="custom-control-input"
                            value={false}
                            onChange={event => setTrainer(event.target.value)}
                        />
                        <label className="custom-control-label" htmlFor="customRadio1" style={{ color: "white", fontFamily: "serif", fontSize: "15px", paddingRight: "6px" }}>
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
                        <label className="custom-control-label" htmlFor="customRadio2" style={{ color: "white", fontFamily: "serif", fontSize: "15px" }}>
                            I am a Trainer
                    </label>
                    </div>
                    <br />

                    <input type="submit" value="Signup" />
                </form>

                <br />
                <h6 style={{ color: "white", fontFamily: "serif", fontSize: "18px" }}><a href="/login">I have a login</a></h6>
            </div>
        </>
    );
}

export default Signup;