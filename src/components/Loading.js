import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}));

function Loading(props) {
    const classes = useStyles();
    console.log(props.height);
    return (
        <div
            className={classes.container}
            style={{ height: `calc(100vh - ${props.height}px)` }}
        >
            <CircularProgress />
        </div>
    );
}

export default Loading;
