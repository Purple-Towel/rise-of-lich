import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import About from './About';
import Tutorial from './Tutorial';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,

    // backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{
          background: 'transparent',
          boxShadow: 'none',
          color: '#000',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Tutorial and about tabs"
          centered
        >
          <Tab
            style={{ fontSize: 32, fontFamily: 'Metal Mania' }}
            label="Tutorial"
            {...a11yProps(0)}
          />
          <Tab
            style={{ fontSize: 32, fontFamily: 'Metal Mania' }}
            label="About"
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Tutorial />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <About />
      </TabPanel>
    </div>
  );
}
