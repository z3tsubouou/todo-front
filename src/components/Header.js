import { AppBar, Toolbar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//icons
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import PersonIcon from "@material-ui/icons/Person";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

//function
import history from "../function/history";

const useStyles = makeStyles((theme) => ({
    toolbarContainer: {
        minHeight: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "Open Sans",
    },
    button: {
        color: "#fff",
        textTransform: "none",
    },
}));

export default function Navbar() {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbarContainer}>
                <Logo />
                {localStorage.getItem("authorization") ? (
                    <LoggedIN />
                ) : (
                    <LogIn />
                )}
            </Toolbar>
        </AppBar>
    );
}

function Logo() {
    const classes = useStyles();

    return (
        <Button
            startIcon={<HomeIcon />}
            className={classes.button}
            onClick={() => history.push("/home")}
        >
            To do
        </Button>
    );
}

function LogIn() {
    const classes = useStyles();

    return (
        <div>
            <Button
                startIcon={<PersonIcon />}
                className={classes.button}
                onClick={() => history.push("/login")}
            >
                Login
            </Button>
            <Button
                startIcon={<VpnKeyIcon />}
                className={classes.button}
                onClick={() => history.push("/register")}
            >
                Register
            </Button>
        </div>
    );
}

function LoggedIN() {
    const classes = useStyles();

    function logOut() {
        localStorage.clear();
        history.push("/login");
    }

    return (
        <div>
            {localStorage.getItem("admin") ? (
                <Button
                    startIcon={<FormatListBulletedIcon />}
                    className={classes.button}
                    onClick={() => history.push("/all")}
                >
                    All users to do
                </Button>
            ) : (
                <></>
            )}
            <Button
                startIcon={<ExitToAppIcon />}
                className={classes.button}
                onClick={() => logOut()}
            >
                Log out
            </Button>
        </div>
    );
}
