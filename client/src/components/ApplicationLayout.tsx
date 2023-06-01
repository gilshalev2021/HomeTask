import { AppBar, Box, CssBaseline, Drawer, Toolbar, Typography } from '@mui/material';
import QueryResults from './QueryResults';
import PastQueries from './PastQueries';
import SearchButton from './SearchButton';
import FindButton from './FindButton';

const drawerWidth = 240;

const ApplicationLayout = () => {
 
    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <img src="./D_B_Logo.png" alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
            <Typography variant="h6" noWrap component="div">
              Dun & Bradstreet Israel Group
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}/>
            <SearchButton/>
            <FindButton/>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
              <PastQueries />
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <QueryResults />
        </Box>
      </Box>
    );
}

export default ApplicationLayout;

