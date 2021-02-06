import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

//component
import Todo from "./Todo";
import Header from "./Header";

import api from "../hook/api";
import history from "../function/history";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        height: "calc(100vh - 100px)",
        backgroundColor: "#efefef",
        overflowY: "auto",
    },
}));

export default function AllTodo() {
    const classes = useStyles();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUserData();
        return () => {};
    }, []);

    async function getAllUserData() {
        const result = await api({
            method: "POST",
            url: "/user/getAllUserData",
            data: {
                _id: localStorage.getItem("_id"),
            },
            token: localStorage.getItem("authorization"),
        });
        if (result.success === true) {
            setUsers(result.data.user);
        } else {
            alert(result.message);
            if (result.message === "Invalid token") {
                localStorage.clear();
                history.push("/login");
            }
        }
    }

    return (
        <>
            <Header />
            <div className={classes.container}>
                {users &&
                    users.map((item, idx) => {
                        return (
                            <Todo
                                key={idx}
                                data={item}
                                getTodo={getAllUserData}
                            />
                        );
                    })}
            </div>
        </>
    );
}
