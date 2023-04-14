import { makeStyles } from "@mui/styles";

const drawerWidth = 240;

export default makeStyles((theme) => ({
  featuredContainer: {
    marginBottom: "20px",
    height: "490px",
    textDecoration: "none",
    display: "flex",
    justifyContent: "center",
  },

  card: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
  },

  cardRoot: {
    position: "relative",
  },

  cardMedia: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: "0",
    right: "0",
    backgroundColor: "rgba(0,0,0,0.575)",
    backgroundBlendMode: "darken",
  },

  cardContent: {
    color: "#fff",
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  cardContentRoot: {
    position: "relative",
    backgroundColor: "transparent",
  },
}));
