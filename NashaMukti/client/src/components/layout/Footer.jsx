import { Box, Container, Typography, Grid, Link, IconButton, Divider, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import logo from '../../assets/images/logo.png';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const footerLinks = [
    {
      title: 'About Us',
      links: [
        { name: 'Our Mission', path: '/about#mission' },
        { name: 'Team', path: '/about#team' },
        { name: 'Testimonials', path: '/testimonials' },
        { name: 'Careers', path: '/careers' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Articles', path: '/articles' },
        { name: 'Videos', path: '/videos' },
        { name: 'Support Groups', path: '/support-groups' },
        { name: 'Recovery Programs', path: '/programs' }
      ]
    },
    {
      title: 'Get Help',
      links: [
        { name: 'Helpline', path: '/helpline' },
        { name: 'Treatment Centers', path: '/centers' },
        { name: 'FAQs', path: '/faqs' },
        { name: 'Contact Us', path: '/contact' }
      ]
    }
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: '#f1f8e9',
        backgroundImage: 'linear-gradient(to bottom, #f1f8e9 0%, white 100%)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(46, 125, 50, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        color: 'text.primary'
      }}
    >
      {/* Scroll to top button */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 20, 
          right: 20,
          zIndex: 10
        }}
      >
        <div className="btn-scale-hover">
          <IconButton 
            onClick={scrollToTop} 
            sx={{ 
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
                transform: 'translateY(-5px)',
                boxShadow: '0 5px 15px rgba(46, 125, 50, 0.3)'
              },
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
          >
            <ArrowUpwardIcon />
          </IconButton>
        </div>
      </Box>

      {/* Background gradient shapes */}
      <Box sx={{ 
        position: 'absolute', 
        width: '300px', 
        height: '300px', 
        borderRadius: '50%', 
        background: 'radial-gradient(circle, rgba(46, 125, 50, 0.1) 0%, rgba(0,0,0,0) 70%)',
        top: '-100px',
        left: '10%',
        pointerEvents: 'none',
      }} />
      
      <Box sx={{ 
        position: 'absolute', 
        width: '400px', 
        height: '400px', 
        borderRadius: '50%', 
        background: 'radial-gradient(circle, rgba(139, 195, 74, 0.08) 0%, rgba(0,0,0,0) 70%)',
        bottom: '-200px',
        right: '5%',
        pointerEvents: 'none',
      }} />

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and description */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 700,
                letterSpacing: '.05rem',
                color: 'primary.dark',
                textDecoration: 'none',
                mb: 2,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <img 
                src={logo} 
                alt="Nasha Mukti Logo" 
                style={{ 
                  width: '30px', 
                  height: '30px', 
                  marginRight: '10px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  borderRadius: '4px'
                }} 
              />
              Nasha Mukti
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Empowering individuals and communities to overcome addiction and build a healthier,
              drug-free future through education, support, and rehabilitation.
            </Typography>
            
            {/* Subscribe newsletter */}
            <Box 
              component="form" 
              sx={{ 
                display: 'flex', 
                mb: 2,
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 1, sm: 0 }
              }}
            >
              <Box 
                component="input"
                placeholder="Your email"
                sx={{
                  flex: 1,
                  py: 1,
                  px: 2,
                  borderRadius: '4px 0 0 4px',
                  border: '1px solid rgba(0, 0, 0, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: 'text.primary',
                  outline: 'none',
                  '&:focus': {
                    borderColor: 'primary.main',
                  },
                  width: { xs: '100%', sm: 'auto' },
                  borderRight: { xs: '1px solid rgba(0, 0, 0, 0.2)', sm: 'none' },
                  borderRadius: { xs: '4px', sm: '4px 0 0 4px' },
                }}
              />
              <Button 
                variant="contained" 
                startIcon={<EmailIcon />}
                sx={{ 
                  borderRadius: { xs: '4px', sm: '0 4px 4px 0' },
                  textTransform: 'none'
                }}
              >
                Subscribe
              </Button>
            </Box>
            
            {/* Social media */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <div className="icon-btn-hover">
                <IconButton 
                  aria-label="facebook" 
                  sx={{ 
                    color: 'white',
                    backgroundColor: '#3b5998',
                    '&:hover': { backgroundColor: '#2d4373' }
                  }}
                >
                  <FacebookIcon />
                </IconButton>
              </div>
              <div className="icon-btn-hover">
                <IconButton 
                  aria-label="twitter" 
                  sx={{ 
                    color: 'white', 
                    backgroundColor: '#1DA1F2',
                    '&:hover': { backgroundColor: '#0c85d0' }
                  }}
                >
                  <TwitterIcon />
                </IconButton>
              </div>
              <div className="icon-btn-hover">
                <IconButton 
                  aria-label="instagram" 
                  sx={{ 
                    color: 'white', 
                    backgroundColor: '#C13584',
                    '&:hover': { backgroundColor: '#a11069' }
                  }}
                >
                  <InstagramIcon />
                </IconButton>
              </div>
              <div className="icon-btn-hover">
                <IconButton 
                  aria-label="youtube" 
                  sx={{ 
                    color: 'white', 
                    backgroundColor: '#FF0000',
                    '&:hover': { backgroundColor: '#cc0000' }
                  }}
                >
                  <YouTubeIcon />
                </IconButton>
              </div>
            </Box>
          </Grid>
          
          {/* Footer links */}
          {footerLinks.map((column) => (
            <Grid item xs={12} sm={6} md={2.5} key={column.title}>
              <Typography variant="h6" color="text.primary" gutterBottom fontWeight="600">
                {column.title}
              </Typography>
              <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
                {column.links.map((link) => (
                  <Box 
                    component="li" 
                    key={link.name} 
                    sx={{ mb: 1 }}
                  >
                    <Link 
                      component={RouterLink} 
                      to={link.path} 
                      underline="none"
                      sx={{ 
                        color: 'text.secondary',
                        transition: 'all 0.2s ease',
                        display: 'inline-block',
                        '&:hover': { 
                          color: 'primary.main',
                          transform: 'translateX(5px)'
                        }
                      }}
                    >
                      {link.name}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(0, 0, 0, 0.1)' }} />
        
        <Box 
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Nasha Mukti Abhiyan. All rights reserved.
        </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: 3, 
            mt: { xs: 2, sm: 0 } 
          }}>
            <Link 
              component={RouterLink} 
              to="/privacy" 
              sx={{ color: 'text.secondary', fontSize: '0.875rem', '&:hover': { color: 'primary.main' } }}
            >
              Privacy
            </Link>
            <Link 
              component={RouterLink} 
              to="/terms" 
              sx={{ color: 'text.secondary', fontSize: '0.875rem', '&:hover': { color: 'primary.main' } }}
            >
              Terms
            </Link>
            <Link 
              component={RouterLink} 
              to="/sitemap" 
              sx={{ color: 'text.secondary', fontSize: '0.875rem', '&:hover': { color: 'primary.main' } }}
            >
              Sitemap
          </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 