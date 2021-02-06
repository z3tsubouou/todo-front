import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        backgroundColor: "#3f51b5",
        boxShadow:
            "0px -2px 4px -1px rgba(0,0,0,0.2),0px -4px 5px 0px rgba(0,0,0,0.14),0px -1px 10px 0px rgba(0,0,0,0.12)",
        fontFamily: "Open Sans",
        color: "#fff",
    },
}));

export default function Footer() {
    const classes = useStyles();

    return <div className={classes.container}>Made by Davgatseren</div>;
}
