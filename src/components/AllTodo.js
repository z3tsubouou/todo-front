import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

//component
import Todo from "./Todo";
import Header from "./Header";
import Loading from "./Loading";

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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllUserData();
        return () => {};
    }, []);

    async function getAllUserData() {
        setLoading(true);
        api({
            method: "POST",
            url: "/user/getAllUserData",
            data: {
                _id: localStorage.getItem("_id"),
            },
            token: localStorage.getItem("authorization"),
        })
            .then((result) => {
                if (result.success === true) {
                    setUsers(result.data.user);
                    setLoading(false);
                } else {
                    alert(result.message);
                    if (result.message === "Invalid token") {
                        localStorage.clear();
                        history.push("/login");
                        setLoading(false);
                    }
                    setLoading(false);
                }
            })
            .catch((error) => {
                alert(error);
                setLoading(false);
            });
    }

    return (
        <>
            <Header />
            {loading ? (
                <Loading height={100} />
            ) : (
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
            )}
        </>
    );
}
