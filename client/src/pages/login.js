import React, { useState } from "react";
import axios from "axios";
// import { Redirect } from "react-router-dom";

function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    // const [success, setSuccess] = useState(false)

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (userName === "" || password === "") {
            return alert("Please fill out all fields before submitting.")
        }

        axios.post("/api/login", {
            username: userName,
            password: password
        })
            .then(function (response) {
                console.log(response.status)
                if (response.status === 200) {
                    console.log(response);
                    // setSuccess(true);
                    // window.location.href = "/login"
                    axios.get("/api/user")
                        .then((res) => {
                            console.log(res.data.isTrainer);
                            (res.data.isTrainer === false ?
                                window.location.href = "/clienthome" :
                                window.location.href = "/trainer")
                        })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            {/* {(success ? <Redirect to="/clienthome" /> : */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Username:</label><br />
                <input
                    type="text"
                    value={userName}
                    onChange={event => setUserName(event.target.value)}
                /><br />
                <label htmlFor="password">Password:</label><br />
                <input
                    type="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                /><br />
                <input type="submit" value="Log In" />
            </form>
            {/* )} */}
        </>
    );
}

export default Login;