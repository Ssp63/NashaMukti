import { useEffect, useRef } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HelpIcon from '@mui/icons-material/Help';
import WarningIcon from '@mui/icons-material/Warning';
import HealingIcon from '@mui/icons-material/Healing';
import CallIcon from '@mui/icons-material/Call';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PsychologyIcon from '@mui/icons-material/Psychology';
import GroupsIcon from '@mui/icons-material/Groups';
import heroImage from '../assets/images/hero-image.jpeg';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Parallax effect
  const heroRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (heroRef.current) {
        heroRef.current.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle spotlight effect for cards with custom mouse movement
  useEffect(() => {
    const spotlightCards = document.querySelectorAll('.spotlight-hover');
    
    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    };
    
    spotlightCards.forEach(card => {
      card.addEventListener('mousemove', handleMouseMove);
    });
    
    return () => {
      spotlightCards.forEach(card => {
        card.removeEventListener('mousemove', handleMouseMove);
      });
    };
  }, []);

  const effects = [
    {
      title: 'Physical Health',
      description:
        'Drug addiction can lead to severe physical health problems including organ damage, respiratory issues, and increased risk of infectious diseases.',
      icon: <WarningIcon fontSize="large" color="error" />,
    },
    {
      title: 'Mental Health',
      description:
        'Substance abuse often results in depression, anxiety, and other mental health disorders that require professional treatment.',
      icon: <HealingIcon fontSize="large" color="primary" />,
    },
    {
      title: 'Social Impact',
      description:
        'Addiction affects not just the individual but their family, friends, and the entire community through broken relationships and social isolation.',
      icon: <HelpIcon fontSize="large" color="warning" />,
    },
  ];

  const helplines = [
    {
      name: 'National Drug Helpline',
      number: '1800-11-0031',
      description: '24/7 confidential support and guidance',
    },
    {
      name: 'De-Addiction Centers',
      number: '1800-11-0032',
      description: 'Find treatment centers near you',
    },
    {
      name: 'Crisis Helpline',
      number: '1800-11-0033',
      description: 'Emergency assistance and intervention',
    },
  ];

  const services = [
    {
      title: 'Counseling Services',
      icon: <PsychologyIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
      description: 'Professional therapy sessions to address mental health aspects of addiction recovery.'
    },
    {
      title: 'Support Groups',
      icon: <GroupsIcon sx={{ fontSize: 50, color: 'secondary.main' }} />,
      description: 'Connect with others facing similar challenges in a safe, supportive environment.'
    },
    {
      title: 'Rehabilitation Programs',
      icon: <RocketLaunchIcon sx={{ fontSize: 50, color: 'success.main' }} />,
      description: 'Comprehensive treatment programs to help rebuild life skills and sustain recovery.'
    }
  ];

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section with parallax effect */}
      <Paper
        ref={heroRef}
        sx={{
          position: 'relative',
          backgroundColor: 'grey.900',
          color: '#fff',
          mb: 0,
          height: { xs: '80vh', md: '90vh' },
          minHeight: { xs: '500px', md: '700px' },
          display: 'flex',
          alignItems: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'url(https://source.unsplash.com/random?addiction-recovery)',
          backgroundAttachment: 'fixed',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.5)',
            backgroundImage: 'linear-gradient(to top, rgba(27, 94, 32, 0.9) 0%, rgba(27, 94, 32, 0.5) 50%, rgba(27, 94, 32, 0.7) 100%)',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: { xs: 3, md: 6 },
                  pr: { md: 0 },
                }}
              >
                <div className="animate-fadeIn delay-200">
                  <Typography 
                    component="h1" 
                    variant="h2" 
                    sx={{ 
                      fontWeight: 800,
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      background: 'linear-gradient(90deg, #1b5e20 0%, #4caf50 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 2
                    }}
                  >
                    Nasha Mukti Abhiyan
                  </Typography>
                </div>
                
                <div className="animate-fadeIn delay-400">
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: 'rgba(255, 255, 255, 1)',
                      fontWeight: 400,
                      mb: 4,
                      maxWidth: '600px',
                      lineHeight: 1.6,
                      textShadow: '0 1px 3px rgba(0,0,0,0.4)'
                    }}
                  >
                    Join our mission to create a drug-free society. Together, we can overcome
                    addiction and build a healthier community.
                  </Typography>
                </div>
                
                <div className="animate-fadeIn delay-500">
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      size="large"
                      component={RouterLink}
                      to="/events"
                      endIcon={<ArrowForwardIcon />}
                      className="ripple"
                      sx={{ 
                        px: 4, 
                        py: 1.5,
                        background: 'linear-gradient(45deg, #2e7d32 0%, #66bb6a 100%)',
                        boxShadow: '0 4px 20px rgba(46, 125, 50, 0.4)',
                        fontSize: '1rem',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #1b5e20 0%, #4caf50 100%)',
                          boxShadow: '0 6px 25px rgba(46, 125, 50, 0.6)',
                        }
                      }}
                    >
                      View Our Events
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      component={RouterLink}
                      to="/about"
                      sx={{ 
                        px: 4, 
                        py: 1.5,
                        borderWidth: 2,
                        borderColor: 'rgba(255,255,255,0.7)',
                        color: 'white',
                        backgroundColor: 'rgba(27, 94, 32, 0.3)',
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(27, 94, 32, 0.5)',
                        }
                      }}
                    >
                      Learn More
                    </Button>
                  </Box>
                </div>
              </Box>
            </Grid>
            
            {/* Hero Image */}
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              <Box 
                className="float-animation"
                sx={{ 
                  position: 'relative',
                  p: 2,
                  mx: 'auto',
                  maxWidth: '450px',
                  width: '100%'
                }}
              >
                <Box
                  className="spotlight-hover"
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '20px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    transform: 'perspective(1000px) rotateY(-5deg)',
                    transition: 'all 0.5s ease',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(45deg, rgba(46, 125, 50, 0.2), rgba(200, 230, 201, 0.2))',
                      zIndex: 2
                    },
                    '&:hover': {
                      transform: 'perspective(1000px) rotateY(0deg) scale(1.03)',
                      boxShadow: '0 30px 50px rgba(0,0,0,0.4)',
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={heroImage}
                    alt="Drug Free Life"
                    sx={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      transition: 'transform 0.5s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: 3,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                      color: 'white',
                      textAlign: 'center',
                      transform: 'translateY(20px)',
                      opacity: 0,
                      transition: 'all 0.3s ease',
                      '.spotlight-hover:hover &': {
                        transform: 'translateY(0)',
                        opacity: 1,
                      }
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                      Embrace a Healthier Tomorrow
                    </Typography>
                  </Box>
                </Box>
                
                {/* Decorative elements */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -15,
                    right: -15,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    border: '4px solid #4caf50',
                    opacity: 0.4,
                    zIndex: -1
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -20,
                    left: -20,
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    border: '6px solid #2e7d32',
                    opacity: 0.3,
                    zIndex: -1
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
        
        {/* Floating Scroll Indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 5
          }}
        >
          <div className="scroll-indicator"></div>
        </Box>
      </Paper>

      {/* Services Section */}
      <Box sx={{ 
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #f1f8e9 0%, white 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Elements */}
        <Box 
          sx={{ 
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(46, 125, 50, 0.15) 0%, rgba(0,0,0,0) 70%)',
            top: '-250px',
            left: '10%',
            zIndex: 0
          }} 
        />
        
        <Box 
          sx={{ 
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 195, 74, 0.1) 0%, rgba(0,0,0,0) 70%)',
            bottom: '-150px',
            right: '5%',
            zIndex: 0
          }} 
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <div className="animate-slideUp" data-scroll-reveal>
            <Typography 
              variant="h3" 
              component="h2" 
              align="center" 
              sx={{ 
                mb: 1,
                fontWeight: 700,
                background: 'linear-gradient(90deg, #1b5e20 0%, #4caf50 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Our Services
            </Typography>
            
            <Typography 
              variant="h6" 
              align="center" 
              sx={{ 
                mb: 6, 
                color: 'text.secondary',
                maxWidth: '700px',
                mx: 'auto'
              }}
            >
              We provide comprehensive support for individuals and families affected by addiction
            </Typography>
          </div>
          
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} md={4} key={service.title}>
                <div 
                  className="animate-slideUp"
                  style={{ animationDelay: `${index * 200}ms` }}
                  data-scroll-reveal
                >
                  <Card 
                    className="gradient-border spotlight-hover"
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      textAlign: 'center',
                      padding: 3,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      backgroundColor: 'white',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 10px 30px rgba(46, 125, 50, 0.15)'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                      {service.icon}
                    </Box>
                    <Typography 
                      gutterBottom 
                      variant="h5" 
                      component="h3" 
                      sx={{ fontWeight: 600 }}
                    >
                      {service.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                      {service.description}
                    </Typography>
                    <Button 
                      variant="outlined" 
                      color="primary"
                      endIcon={<ArrowForwardIcon />}
                      component={RouterLink}
                      to="/services"
                      sx={{ 
                        alignSelf: 'center',
                        mt: 'auto',
                        borderRadius: '50px',
                        px: 3
                      }}
                    >
                      Learn More
                    </Button>
                  </Card>
                </div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Effects of Drug Addiction */}
      <Box sx={{ 
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, white 0%, #f1f8e9 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="lg">
          <div className="animate-slideUp" data-scroll-reveal>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom 
              align="center"
              sx={{ 
                mb: 1,
                fontWeight: 700,
                background: 'linear-gradient(90deg, #1b5e20 0%, #4caf50 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Effects of Drug Addiction
            </Typography>
            
            <Typography 
              variant="h6" 
              align="center" 
              sx={{ 
                mb: 6, 
                color: 'text.secondary',
                maxWidth: '700px',
                mx: 'auto'
              }}
            >
              Understanding the impact of addiction is the first step toward recovery
            </Typography>
          </div>
          
          <div className="grid">
            {effects.map((effect, index) => (
              <Grid item xs={12} md={4} key={effect.title}>
                <div className="animate-slideUp" style={{ animationDelay: `${index * 200}ms` }}>
                  <Card 
                    className="card-hover"
                    sx={{ 
                      height: '100%', 
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      backgroundColor: 'white',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(46, 125, 50, 0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 10px 30px rgba(46, 125, 50, 0.2)',
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          mb: 3,
                        }}
                      >
                        {effect.icon}
                      </Box>
                      <Typography 
                        gutterBottom 
                        variant="h5" 
                        component="h3" 
                        align="center"
                        sx={{ fontWeight: 600 }}
                      >
                        {effect.title}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        color="text.secondary" 
                        align="center"
                        sx={{ flexGrow: 1 }}
                      >
                        {effect.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            ))}
          </div>
        </Container>
      </Box>

      {/* Helplines Section */}
      <Box sx={{ 
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #f1f8e9 0%, #e8f5e9 100%)',
        position: 'relative'
      }}>
        {/* Decorative elements */}
        <Box 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(46, 125, 50, 0.3) 50%, transparent 100%)'
          }} 
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <div className="animate-slideUp" data-scroll-reveal>
            <Typography 
              variant="h3" 
              component="h2" 
              align="center"
              sx={{ 
                mb: 1,
                fontWeight: 700,
                background: 'linear-gradient(90deg, #1b5e20 0%, #4caf50 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              24/7 Helplines
            </Typography>
            
            <Typography 
              variant="h6" 
              align="center" 
              sx={{ 
                mb: 6, 
                color: 'text.secondary',
                maxWidth: '700px',
                mx: 'auto'
              }}
            >
              Reach out for professional support anytime, anywhere
            </Typography>
          </div>
          
          <Grid container spacing={4}>
            {helplines.map((helpline, index) => (
              <Grid item xs={12} md={4} key={helpline.name}>
                <div 
                  className="animate-slideUp" 
                  style={{ animationDelay: `${index * 200}ms` }}
                  data-scroll-reveal
                >
                  <Card sx={{ 
                    height: '100%',
                    backgroundColor: 'white',
                    backdropFilter: 'blur(5px)',
                    borderRadius: 3,
                    border: '1px solid rgba(46, 125, 50, 0.1)',
                  }}>
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 2,
                        }}
                      >
                        <CallIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                          {helpline.name}
                        </Typography>
                      </Box>
                      <div className="pulse-animation">
                        <Typography
                          variant="h4"
                          color="primary"
                          gutterBottom
                          sx={{ fontWeight: 'bold', mb: 2 }}
                        >
                          {helpline.number}
                        </Typography>
                      </div>
                      <Typography variant="body2" color="text.secondary">
                        {helpline.description}
                      </Typography>
                      <Button 
                        variant="contained" 
                        color="primary"
                        fullWidth
                        startIcon={<CallIcon />}
                        href={`tel:${helpline.number.replace(/-/g, '')}`}
                        sx={{ 
                          mt: 3,
                          py: 1.5,
                          background: 'linear-gradient(45deg, #2e7d32 0%, #66bb6a 100%)'
                        }}
                      >
                        Call Now
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            ))}
          </Grid>
          
          <div className="animate-slideUp" data-scroll-reveal>
            <Box sx={{ textAlign: 'center', mt: 8 }}>
              <Button 
                component={RouterLink}
                to="/support"
                variant="outlined"
                color="primary"
                size="large"
                sx={{ 
                  borderRadius: 50,
                  px: 4,
                  py: 1.5,
                  borderWidth: 2
                }}
              >
                View All Support Resources
              </Button>
            </Box>
          </div>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 