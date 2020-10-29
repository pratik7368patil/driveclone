import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Description, MoreVert } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  fileStyle: {
    maxWidth: 300,
    width: 300,
    padding: "10px 20px 10px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  fileDataStyle: {
    flexGrow: 1,
    display: "flex",
    "&:hover": {
      cursor: "pointer",
    },
  },
  gridStyle: {
    display: "flex",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function FileList(props) {
  const { list, removeFile, currentUrl } = props;
  const classes = useStyles();

  function Item(props) {
    const { name } = props;
    return (
      <Paper variant="outlined" className={classes.fileStyle}>
        <Box className={classes.fileDataStyle}>
          <Box mr={3}>
            <Description />
          </Box>
          <Typography noWrap>{name}</Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {list.length > 0 ? (
          list.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              key={item.id}
              className={classes.gridStyle}
            >
              <Item name={item.name} id={item.id} />
              <GetMenu
                id={item.id}
                removeFile={removeFile}
                currentUrl={currentUrl}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sm={4} md={3}>
            Empty List
          </Grid>
        )}
      </Grid>
    </div>
  );
}

function GetMenu(props) {
  const { id, currentUrl, removeFile } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        aria-controls={`file-menu-${id}`}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id={`file-menu-${id}`}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Rename</MenuItem>
        <MenuItem onClick={() => removeFile(id, currentUrl)}>Delete</MenuItem>
      </Menu>
    </>
  );
}
