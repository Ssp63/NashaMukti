import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Select,
  FormControl,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from '../store/slices/authSlice';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language, setLanguage, translate } = useLanguage();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {translate('appName')}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem component={RouterLink} to="/events" onClick={handleCloseNavMenu}>
                {translate('nav.events')}
              </MenuItem>
              <MenuItem component={RouterLink} to="/about" onClick={handleCloseNavMenu}>
                {translate('nav.about')}
              </MenuItem>
              {user && (
                <MenuItem component={RouterLink} to="/dashboard" onClick={handleCloseNavMenu}>
                  {translate('nav.dashboard')}
                </MenuItem>
              )}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              component={RouterLink}
              to="/events"
              sx={{ my: 2, color: 'inherit', display: 'block' }}
            >
              {translate('nav.events')}
            </Button>
            <Button
              component={RouterLink}
              to="/about"
              sx={{ my: 2, color: 'inherit', display: 'block' }}
            >
              {translate('nav.about')}
            </Button>
            {user && (
              <Button
                component={RouterLink}
                to="/dashboard"
                sx={{ my: 2, color: 'inherit', display: 'block' }}
              >
                {translate('nav.dashboard')}
              </Button>
            )}
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={language}
                onChange={handleLanguageChange}
                sx={{ color: 'inherit', '& .MuiSelect-icon': { color: 'inherit' } }}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="mr">मराठी</MenuItem>
              </Select>
            </FormControl>

            {user ? (
              <Button color="inherit" onClick={handleLogout}>
                {translate('nav.logout')}
              </Button>
            ) : (
              <Button
                component={RouterLink}
                to="/login"
                color="inherit"
              >
                {translate('nav.login')}
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 