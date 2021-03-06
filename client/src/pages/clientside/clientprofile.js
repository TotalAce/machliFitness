import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom"
import axios from 'axios';
import { TrainerNavBar, ClientNavBar } from "../../components/Navbar";
import ClientWorkouts from '../../components/ClientWorkouts'
import moment from 'moment'
import WorkoutForm from '../../components/WorkoutForm'

function ClientProfile() {
    const { isLoggedIn, isTrainer } = JSON.parse(localStorage.getItem("user")) || ""

    const [client, setClient] = useState({})
    const [workouts, setWorkouts] = useState([])
    const [muscleGroups, setMuscleGroups] = useState([])
    const [exercises, setExercises] = useState([])
    const [formObject, setFormObject] = useState({})
    const [submitted, setSubmitted] = useState(0)

    const params = window.location.href
    // console.log(params);
    const url = new URL(params)
    const ClientUserId = url.searchParams.get("UserId")
    // console.log(ClientUserId);
    const username = /[^/]*$/.exec(params)[0];
    // console.log(ClientId);

    useEffect(() => {

        axios.get("/api/client/" + username)
            .then(res => {
                // console.log(res);
                setClient(res.data[0])
                setWorkouts(res.data[0].WorkoutPlans)
            })
            .catch(err => console.log(err));

        axios.get("/api/workouts")
            .then(res => {
                // console.log(res);
                setMuscleGroups(res.data)

                    (!formObject.muscleGroup ? "" :
                        axios.post("/api/workouts/muscle", {
                            muscleGroup: formObject.muscleGroup
                        })
                            .then(res => {
                                // console.log(res);
                                setExercises(res.data)
                            })
                            .catch(err => console.log(err))
                    )
            })
            .catch(err => console.log(err));

    }, [formObject.muscleGroup, username, submitted])

    const date = moment().format('YYYY-MM-DD')
    const dateAddOne = moment().add(1, 'days').format("YYYY-MM-DD")
    const dateAddTwo = moment().add(2, 'days').format("YYYY-MM-DD")
    const dateAddThree = moment().add(3, 'days').format("YYYY-MM-DD")
    const dateAddFour = moment().add(4, 'days').format("YYYY-MM-DD")
    const dateAddFive = moment().add(5, 'days').format("YYYY-MM-DD")
    const dateAddSix = moment().add(6, 'days').format("YYYY-MM-DD")

    const todaysWorkout = workouts.filter(workout => workout.date === date)
    const todaysWorkoutAddOne = workouts.filter(workout => workout.date === dateAddOne)
    const todaysWorkoutAddTwo = workouts.filter(workout => workout.date === dateAddTwo)
    const todaysWorkoutAddThree = workouts.filter(workout => workout.date === dateAddThree)
    const todaysWorkoutAddFour = workouts.filter(workout => workout.date === dateAddFour)
    const todaysWorkoutAddFive = workouts.filter(workout => workout.date === dateAddFive)
    const todaysWorkoutAddSix = workouts.filter(workout => workout.date === dateAddSix)

    function handleInputChange(event) {
        let { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    function handleDelete(event) {
        event.preventDefault();
        event.stopPropagation();
        let { value } = event.target;
        let confirmDelete = window.confirm("Are you sure you want to delete this exercise?")
        // console.log(value);
        if (confirmDelete === true) {
            axios.delete("/api/workoutplan/" + value)
                .then(res => {
                    // console.log(res)
                    setSubmitted(submitted + 1)
                })
                .catch(err => console.log(err))
        }
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        if (formObject.date < date) {
            alert("Cannot post to a previous date")
        }
        if (formObject.date === undefined
            ||
            formObject.exercise === undefined
            ||
            formObject.sets === undefined
            ||
            formObject.reps === undefined) {
            alert("Please fill out all fields before adding an exercise")
        }
        else {
            axios.post("/api/workoutplan/" + ClientUserId, {
                date: formObject.date,
                exercise: formObject.exercise,
                sets: formObject.sets,
                reps: formObject.reps,
            })
                .then(res => {
                    // console.log(res)
                    alert(`Workout added to client ${client.firstName}'s plan`)
                    setSubmitted(submitted + 1)
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <>
            {(isLoggedIn === false || !isLoggedIn ?
                <Redirect to="/login" /> :

                <div>

                    {(isTrainer === true ? <TrainerNavBar /> : <ClientNavBar />)}
                    <div className="container">
                        <br />
                        <h1 className="justify-content-center">
                            {client.firstName} {client.lastName}
                        </h1>
                        <div className="img-container justify-content-center">
                            <img src={`https://randomuser.me/api/portraits/men/${ClientUserId}.jpg`}
                                alt="Client Img"
                                style={{ borderRadius: "50%", width: "200px", height: "200px" }}
                            />
                        </div>

                        <br />

                        {(isTrainer === false ? null :
                            <WorkoutForm
                                muscle={muscleGroups}
                                handleinputchange={handleInputChange}
                                onSubmit={handleFormSubmit}
                                exercise={(exercises.length > 0 ? exercises : [])}
                            />
                        )}

                        <br />

                        {workouts.length > 0 ?
                            <div className="week-workouts">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <ClientWorkouts
                                            date={date}
                                            array={todaysWorkout}
                                            delete={handleDelete}
                                            trainer={!isTrainer}
                                        />
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-lg-4" style={{ padding: "0" }}>
                                        <ClientWorkouts
                                            date={dateAddOne}
                                            array={todaysWorkoutAddOne}
                                            delete={handleDelete}
                                            trainer={!isTrainer}
                                        />
                                    </div>
                                    <div className="col-lg-4" style={{ padding: "0" }}>
                                        <ClientWorkouts
                                            date={dateAddTwo}
                                            array={todaysWorkoutAddTwo}
                                            delete={handleDelete}
                                            trainer={!isTrainer}
                                        />
                                    </div>
                                    <div className="col-lg-4" style={{ padding: "0" }}>
                                        <ClientWorkouts
                                            date={dateAddThree}
                                            array={todaysWorkoutAddThree}
                                            delete={handleDelete}
                                            trainer={!isTrainer}
                                        />
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-lg-4" style={{ padding: "0" }}>
                                        <ClientWorkouts
                                            date={dateAddFour}
                                            array={todaysWorkoutAddFour}
                                            delete={handleDelete}
                                            trainer={!isTrainer}
                                        />
                                    </div>
                                    <div className="col-lg-4" style={{ padding: "0" }}>
                                        <ClientWorkouts
                                            date={dateAddFive}
                                            array={todaysWorkoutAddFive}
                                            delete={handleDelete}
                                            trainer={!isTrainer}
                                        />
                                    </div>
                                    <div className="col-lg-4" style={{ padding: "0" }}>
                                        <ClientWorkouts
                                            date={dateAddSix}
                                            array={todaysWorkoutAddSix}
                                            delete={handleDelete}
                                            trainer={!isTrainer}
                                        />
                                    </div>
                                </div>
                            </div>
                            : ""}
                    </div>
                </div>
            )}
        </>
    )
}


export default ClientProfile;
