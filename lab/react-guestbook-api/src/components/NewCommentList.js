import React from "react";
import axios from "axios";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "screen-xl",
    margin: "0 auto",
    padding: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(6),
    },
    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(4, 8),
    },
  },
  listItem: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: theme.shadows[5],
    transition: "box-shadow 0.5s ease-out",
    "&:hover": {
      boxShadow: theme.shadows[10],
    },
  },
  title: {
    fontWeight: "bold",
    color: theme.palette.text.primary,
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
  message: {
    color: theme.palette.text.secondary,
  },
}));

function CommentsList() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState(false);
  const [commentsList, setCommentsList] = React.useState([]);

  React.useEffect(() => {
    async function getAllComments() {
      setIsLoading(true);
      const {
        data: { results: comments },
      } = await axios.get(process.env.REACT_APP_BASEURL + "guestbook");
      setCommentsList(comments);
      setIsLoading(false);
    }
    getAllComments();
  }, []);

  return (
    <div className={classes.root}>
      {isLoading ? (
        <div className="text-center">
          <CircularProgress />
        </div>
      ) : (
        <List>
          {commentsList.map((comment, i) => (
            <ListItem key={i} className={classes.listItem}>
              <ListItemText
                primary={
                  <Typography className={classes.title} variant="h6">
                    {comment.pseudo}
                  </Typography>
                }
                secondary={
                  <Typography className={classes.message} variant="body1">
                    {comment.message}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

export default CommentsList;
