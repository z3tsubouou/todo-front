import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import * as yup from "yup";

//components
import Header from "./Header";
import Loading from "./Loading";

//function
import history from "../function/history";
import api from "../hook/api";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 100px)",
        backgroundColor: "#efefef",
        overflowY: "auto",
    },
    paper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: 400,
        height: "auto",
        maxHeight: 500,
        overflowY: "auto",
        [theme.breakpoints.down("md")]: {
            width: 360,
        },
        [theme.breakpoints.down("sm")]: {
            width: 340,
        },
        [theme.breakpoints.down("xs")]: {
            width: 300,
        },
    },
    form: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
        width: "100%",
        height: "100%",
    },
    title: {
        marginTop: 20,
    },
    input: {
        width: "70%",
        marginTop: 20,
    },
    button: {
        marginTop: 20,
        marginBottom: 20,
    },
}));

export default function Login() {
    const classes = useStyles();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [valid, setValid] = useState({
        email: true,
        password: true,
    });

    const [loading, setLoading] = useState(false);

    function onValueChange(e) {
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        setValid((prevState) => ({
            ...prevState,
            [e.target.name]:
                e.target.name === "email"
                    ? yup
                          .string()
                          .email()
                          .required()
                          .isValidSync(e.target.value)
                    : yup
                          .string()
                          .min(8)
                          .required()
                          .isValidSync(e.target.value),
        }));
    }

    async function submit(e) {
        if (
            form.email !== "" &&
            form.password !== "" &&
            valid.email === true &&
            valid.password === true
        ) {
            setLoading(true);
            api({
                method: "POST",
                url: "/user/login",
                data: {
                    email: form.email,
                    password: form.password,
                },
            })
                .then((result) => {
                    if (result.success === true) {
                        localStorage.setItem(
                            "authorization",
                            result.data.jsonToken,
                        );
                        localStorage.setItem("_id", result.data.user._id);
                        localStorage.setItem("email", result.data.user.email);
                        localStorage.setItem("name", result.data.user.name);
                        if (result.data.user.admin) {
                            localStorage.setItem(
                                "admin",
                                result.data.user.admin,
                            );
                        }
                        setLoading(false);

                        history.push("/home");
                    } else {
                        alert(result.message);
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    alert(error);
                    setLoading(false);
                });
        }
    }

    return (
        <>
            <Header />
            {loading ? (
                <Loading height={100} />
            ) : (
                <div className={classes.container}>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography variant="h4" className={classes.title}>
                            To do
                        </Typography>
                        <form className={classes.form}>
                            <Input
                                name="email"
                                type="email"
                                func={onValueChange}
                                valid={valid.email}
                                msg="Email оруулна уу!"
                            />
                            <Input
                                name="password"
                                type="password"
                                func={onValueChange}
                                valid={valid.password}
                                msg="8-аас дээш утга оруулна уу!"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={(e) => submit(e)}
                            >
                                Нэвтрэх
                            </Button>
                        </form>
                    </Paper>
                </div>
            )}
        </>
    );
}

function Input({ name, type, func, valid, msg }) {
    const classes = useStyles();

    return (
        <TextField
            error={valid ? false : true}
            name={name}
            type={type}
            label={name}
            helperText={msg}
            onChange={(e) => func(e)}
            id="outlined-basic"
            variant="outlined"
            className={classes.input}
        />
    );
}
