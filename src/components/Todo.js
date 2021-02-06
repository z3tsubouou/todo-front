import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Paper } from "@material-ui/core";

//icons
import DeleteIcon from "@material-ui/icons/Delete";
import ClearIcon from "@material-ui/icons/Clear";

//function
import api from "../hook/api";
import history from "../function/history";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        width: 400,
        height: 350,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        padding: 10,
        margin: 10,
    },
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        overflowY: "auto",
    },
    name: {
        marginBottom: "5%",
    },
    inputContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    input: {
        width: "80%",
    },
    todoContainer: {
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#efefef",
        marginTop: 10,
        borderRadius: 5,
    },
    todoEndContainer: {
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: "#333333",
    },
    todo: {
        overflowX: "auto",
        marginLeft: 10,
    },
    todoEnd: {
        overflowX: "auto",
        marginLeft: 10,
        textDecorationLine: "line-through",
        backgroundColor: "black-grey",
        color: "white",
    },
    edit: {
        display: "flex",
        flexDirection: "column",
    },
    button: {
        width: "20%",
        height: 35,
        margin: 5,
    },
    icon: {
        cursor: "pointer",
    },
}));

export default function Todo(props) {
    const classes = useStyles();
    const [todo, setTodo] = useState("");

    async function onChange(e) {
        setTodo(e.target.value);
    }

    async function addTodo() {
        const result = await api({
            method: "POST",
            url: "/user/addTodo",
            data: {
                _id: props.data._id,
                description: todo,
            },
            token: localStorage.getItem("authorization"),
        });

        if (result.success === true) {
            props.getTodo();
        } else {
            alert(result.message);
            if (result.message === "Invalid token") {
                localStorage.clear();
                history.push("/login");
            }
        }
    }

    async function deleteTodo(todo_id) {
        const result = await api({
            method: "POST",
            url: "/user/deleteTodo",
            data: {
                _id: props.data._id,
                todo_id: todo_id,
            },
            token: localStorage.getItem("authorization"),
        });

        if (result.success === true) {
            props.getTodo();
        } else {
            alert(result.message);
            if (result.message === "Invalid token") {
                localStorage.clear();
                history.push("/login");
            }
        }
    }

    async function endTodo(todo_id) {
        const result = await api({
            method: "POST",
            url: "/user/endTodo",
            data: {
                _id: todo_id,
            },
            token: localStorage.getItem("authorization"),
        });

        if (result.success === true) {
            props.getTodo();
        } else {
            alert(result.message);
            if (result.message === "Invalid token") {
                localStorage.clear();
                history.push("/login");
            }
        }
    }

    return (
        <Paper elevation={3} className={classes.mainContainer}>
            <div elevation={3} className={classes.container}>
                <div className={classes.name}>{props.data.name}</div>
                <div className={classes.inputContainer}>
                    <TextField
                        name="todo"
                        type="text"
                        label="Todo"
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        className={classes.input}
                        onChange={(e) => onChange(e)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => addTodo()}
                    >
                        Нэмэх
                    </Button>
                </div>
                <div>
                    {props.data.todo &&
                        props.data.todo
                            .filter((item) => item.end === false)
                            .map((item, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        className={classes.todoContainer}
                                    >
                                        <div className={classes.todo}>
                                            {item.description}
                                        </div>
                                        <div className={classes.edit}>
                                            <DeleteIcon
                                                color="primary"
                                                className={classes.icon}
                                                onClick={() =>
                                                    deleteTodo(item._id)
                                                }
                                            />
                                            <ClearIcon
                                                color="primary"
                                                className={classes.icon}
                                                onClick={() =>
                                                    endTodo(item._id)
                                                }
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                    {props.data.todo &&
                        props.data.todo
                            .filter((item) => item.end === true)
                            .map((item, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        className={classes.todoEndContainer}
                                    >
                                        <div className={classes.todoEnd}>
                                            {item.description}
                                        </div>
                                        <div className={classes.edit}>
                                            <DeleteIcon
                                                color="primary"
                                                className={classes.icon}
                                                onClick={() =>
                                                    deleteTodo(item._id)
                                                }
                                            />
                                            <ClearIcon
                                                color="primary"
                                                className={classes.icon}
                                                onClick={() =>
                                                    endTodo(item._id)
                                                }
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                </div>
            </div>
        </Paper>
    );
}
