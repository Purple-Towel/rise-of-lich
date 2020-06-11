import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import GitHubIcon from '@material-ui/icons/GitHub';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { AUTO } from 'phaser';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      maxWidth: 360,
      margin: 'auto',
    },
  })
);

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}

export default function SimpleList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="Github links">
        <ListItemLink href="#simple-list">
          <ListItemIcon>
            <GitHubIcon />
          </ListItemIcon>
          <ListItemText primary="Angad Grewal" />
        </ListItemLink>
        <ListItemLink href="#simple-list">
          <ListItemIcon>
            <GitHubIcon />
          </ListItemIcon>
          <ListItemText primary="Diogo Pinto" />
        </ListItemLink>
        <ListItemLink href="#simple-list">
          <ListItemIcon>
            <GitHubIcon />
          </ListItemIcon>
          <ListItemText primary="Rance Campbell" />
        </ListItemLink>
      </List>
    </div>
  );
}
