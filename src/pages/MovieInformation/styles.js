import { makeStyles } from "@mui/styles";

const drawerWidth = 240;

export default makeStyles((theme) => ({
  containerSpaceAround: {
    display: "flex",
    justifyContent: "space-around",
    margin: "10px 0 !important",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      flexWrap: "wrap",
    },
  },

  poster: {
    borderRadius: "20px",
    boxShadow: "0.5em 1em 1em rgb(64, 64, 70)",
    width: "80%",

    [theme.breakpoints.down("md")]: {
      margin: "0 auto",
      width: "50%",
      height: "350px",
    },
    
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
      width: "100%",
      height: "350px",
      marginBottom: "30px",
    },

  },

  genreContainer: {
    display: "flex",
    justifyContent: "space-around",
    margin: "10px 0 !important",
    flexWrap: "wrap",
  },

  genreImage: {
    filter: theme.palette.mode === "dark" && "invert(1)",
    marginRight: "10px",
  },

  links: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      padding: "0.5rem 1rem",
      flexDirection: "column",
    },
  },

  castImage: {
    width: "100%",
    height: "8em",
    maxWidth: "7em",
    objectFit: "cover",
    borderRadius: "10px",
  },

  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    
  },

  videos: {
    width: "50%",
    height: "50%",

    [theme.breakpoints.down("sm")]: {
      width: "90%",
      height: "90%",
    },
  },


}));
