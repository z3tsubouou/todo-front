import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
    },
}));

function Loading() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <CircularProgress />
        </div>
    );
}

export default Loading;
