import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  useScrollTrigger,
  Slide,
  Fade,
  Badge,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TranslateIcon from '@mui/icons-material/Translate';
import { logout } from '../../store/slices/authSlice';
import { useLanguage } from '../../context/LanguageContext';
import logo from '../../assets/images/logo.png';

// Hide navbar on scroll down
function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElLang, setAnchorElLang] = useState(null);
  const [navbarTransparent, setNavbarTransparent] = useState(true);

  // Use language context
  const { language, setLanguage, translate } = useLanguage();

  // Make sure navbar is always transparent at first
  useEffect(() => {
    setNavbarTransparent(true);
  }, [location.pathname]);

  // Handle scroll events to change navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 50;
      if (navbarTransparent !== !show) {
        setNavbarTransparent(!show);
      }
    };

    setNavbarTransparent(true);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navbarTransparent]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenLangMenu = (event) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const handleCloseLangMenu = () => {
    setAnchorElLang(null);
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    handleCloseLangMenu();
  };

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
  };

  const pages = [
    { title: translate('nav.home'), path: '/' },
    { title: translate('nav.about'), path: '/about' },
    { title: translate('nav.events'), path: '/events' },
  ];

  const authPages = [
    { title: translate('nav.dashboard'), path: '/dashboard' },
    { title: translate('nav.createEvent'), path: '/create-event' },
  ];

  const settings = [
    { title: translate('nav.profile'), path: '/dashboard' },
    { title: translate('nav.settings'), path: '/settings' },
    { title: translate('nav.logout'), onClick: handleLogout },
  ];

  if (user?.role === 'admin') {
    authPages.push({ title: translate('nav.admin'), path: '/admin' });
  }

  return (
    <HideOnScroll>
      <AppBar 
        position="sticky" 
        elevation={navbarTransparent ? 0 : 2}
        sx={{
          background: navbarTransparent 
            ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.1) 90%, transparent 100%)' 
            : 'white',
          transition: 'all 0.5s ease',
          backdropFilter: 'blur(10px)',
          color: 'text.primary'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo - Desktop */}
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                letterSpacing: '.05rem',
                color: 'primary.dark',
                textDecoration: 'none',
                alignItems: 'center'
              }}
            >
              <img 
                src={logo} 
                alt={translate('appName')} 
                style={{ 
                  width: '30px', 
                  height: '30px', 
                  marginRight: '10px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  borderRadius: '4px'
                }} 
              />
              {translate('appName')}
            </Typography>

            {/* Mobile Menu */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
                {pages.map((page) => (
                  <MenuItem
                    key={page.title}
                    onClick={handleCloseNavMenu}
                    component={RouterLink}
                    to={page.path}
                    selected={location.pathname === page.path}
                  >
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                ))}
                {isAuthenticated &&
                  authPages.map((page) => (
                    <MenuItem
                      key={page.title}
                      onClick={handleCloseNavMenu}
                      component={RouterLink}
                      to={page.path}
                      selected={location.pathname === page.path}
                    >
                      <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>

            {/* Logo - Mobile */}
            <Typography
              variant="h5"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: '.05rem',
                color: 'primary.dark',
                textDecoration: 'none',
                alignItems: 'center'
              }}
            >
              <img 
                src={logo} 
                alt="Nasha Mukti Logo" 
                style={{ 
                  width: '28px', 
                  height: '28px', 
                  marginRight: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  borderRadius: '4px'
                }} 
              />
              Nasha Mukti
            </Typography>

            {/* Desktop Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page, index) => (
                <Button
                  key={page.title}
                  component={RouterLink}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  className="link-underline"
                  sx={{ 
                    my: 2, 
                    mx: 1,
                    color: location.pathname === page.path ? 'primary.dark' : 'text.primary',
                    display: 'block',
                    position: 'relative',
                    fontWeight: 500,
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: location.pathname === page.path ? '100%' : '0%',
                      height: '2px',
                      bottom: '5px',
                      left: '0',
                      backgroundColor: 'primary.main',
                      transition: 'width 0.3s ease'
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(46, 125, 50, 0.08)',
                      color: 'primary.main'
                    },
                    '&:hover::after': {
                      width: '100%'
                    }
                  }}
                >
                  {page.title}
                </Button>
              ))}
              {isAuthenticated &&
                authPages.map((page) => (
                  <Button
                    key={page.title}
                    component={RouterLink}
                    to={page.path}
                    onClick={handleCloseNavMenu}
                    className="link-underline"
                    sx={{ 
                      my: 2, 
                      mx: 1,
                      color: location.pathname === page.path ? 'primary.dark' : 'text.primary',
                      display: 'block',
                      position: 'relative',
                      fontWeight: 500,
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: location.pathname === page.path ? '100%' : '0%',
                        height: '2px',
                        bottom: '5px',
                        left: '0',
                        backgroundColor: 'primary.main',
                        transition: 'width 0.3s ease'
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(46, 125, 50, 0.08)',
                        color: 'primary.main'
                      },
                      '&:hover::after': {
                        width: '100%'
                      }
                    }}
                  >
                    {page.title}
                  </Button>
                ))}
            </Box>

            {/* Action Icons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Notifications */}
              {isAuthenticated && (
                <Tooltip title={translate('nav.notifications')}>
                  <IconButton color="primary" className="icon-btn-hover" sx={{ ml: 1 }}>
                    <Badge badgeContent={3} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              )}

              {/* Language Toggle */}
              <Tooltip title={translate('nav.changeLanguage')}>
                <IconButton 
                  onClick={handleOpenLangMenu}
                  color="primary"
                  sx={{ 
                    border: '1px solid',
                    borderColor: 'primary.main',
                    padding: '6px'
                  }}
                >
                  <TranslateIcon />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorElLang}
                open={Boolean(anchorElLang)}
                onClose={handleCloseLangMenu}
                sx={{ mt: 1 }}
              >
                <MenuItem 
                  onClick={() => handleLanguageChange('en')}
                  selected={language === 'en'}
                >
                  <Typography textAlign="center">English</Typography>
                </MenuItem>
                <MenuItem 
                  onClick={() => handleLanguageChange('mr')}
                  selected={language === 'mr'}
                >
                  <Typography textAlign="center">मराठी</Typography>
                </MenuItem>
              </Menu>

              {/* User Menu */}
              {isAuthenticated ? (
                <>
                  <Tooltip title={translate('nav.settings')}>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: 'primary.main',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.1)',
                            boxShadow: '0 0 8px rgba(46, 125, 50, 0.6)'
                          }
                        }}
                      >
                        {user?.name?.[0]}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting.title}
                        onClick={setting.onClick || handleCloseUserMenu}
                        component={setting.path ? RouterLink : 'li'}
                        to={setting.path}
                      >
                        <Typography textAlign="center">{setting.title}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    component={RouterLink}
                    to="/login"
                    variant="outlined"
                    sx={{ 
                      color: 'primary.main',
                      borderColor: 'primary.main',
                      '&:hover': {
                        borderColor: 'primary.dark',
                        backgroundColor: 'rgba(46, 125, 50, 0.05)'
                      }
                    }}
                  >
                    {translate('nav.login')}
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="contained"
                    color="primary"
                    sx={{ 
                      ml: 1,
                      boxShadow: '0 4px 20px rgba(46, 125, 50, 0.3)'
                    }}
                  >
                    {translate('nav.register')}
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar; 