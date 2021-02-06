import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

//component
import Todo from "./Todo";
import Header from "./Header";
import Loading from "./Loading";

//function
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

export default function Home() {
    const classes = useStyles();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getTodo();
        return () => {};
    }, []);

    async function getTodo() {
        setLoading(true);
        const result = await api({
            method: "POST",
            url: "/user/getTodo",
            data: {
                _id: localStorage.getItem("_id"),
            },
            token: localStorage.getItem("authorization"),
        });

        if (result.success === true) {
            setUser(result.data.user);
        } else {
            alert(result.message);
            if (result.message === "Invalid token") {
                localStorage.clear();
                history.push("/login");
            }
        }
        setLoading(false);
    }

    return (
        <>
            <Header />
            {loading ? (
                <Loading height={100} />
            ) : (
                <div className={classes.container}>
                    <Todo data={user} getTodo={getTodo} />
                </div>
            )}
        </>
    );
}
