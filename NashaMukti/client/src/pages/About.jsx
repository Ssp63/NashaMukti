import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import PolicyIcon from '@mui/icons-material/Policy';

const About = () => {
  const initiatives = [
    {
      title: 'Rehabilitation Centers',
      description:
        'Government-funded rehabilitation centers providing comprehensive treatment and support services.',
      icon: <LocalHospitalIcon fontSize="large" color="primary" />,
      points: [
        'Free medical treatment and counseling',
        'Residential rehabilitation programs',
        'Aftercare and follow-up services',
      ],
    },
    {
      title: 'Community Outreach',
      description:
        'Grassroots level programs to create awareness and prevent substance abuse.',
      icon: <GroupsIcon fontSize="large" color="primary" />,
      points: [
        'Street plays and awareness campaigns',
        'Community support groups',
        'Family counseling services',
      ],
    },
    {
      title: 'Education Programs',
      description:
        'School and college-based programs to educate youth about drug abuse.',
      icon: <SchoolIcon fontSize="large" color="primary" />,
      points: [
        'School prevention programs',
        'Peer education initiatives',
        'Teacher training workshops',
      ],
    },
    {
      title: 'Policy Measures',
      description:
        'Government policies and legal framework to combat drug abuse.',
      icon: <PolicyIcon fontSize="large" color="primary" />,
      points: [
        'Strict law enforcement',
        'Inter-state coordination',
        'International cooperation',
      ],
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Mission Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          About Nasha Mukti Abhiyan
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph align="center">
          A comprehensive campaign to combat drug abuse and create a healthier society
        </Typography>
        <Typography variant="body1" paragraph align="center" sx={{ mt: 4 }}>
          Nasha Mukti Abhiyan is a nationwide campaign that brings together government
          agencies, healthcare providers, community organizations, and citizens to fight
          against drug abuse. Our mission is to create a drug-free society through
          prevention, treatment, and rehabilitation programs.
        </Typography>
      </Box>

      <Divider sx={{ mb: 8 }} />

      {/* Government Initiatives */}
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Government Initiatives
      </Typography>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {initiatives.map((initiative) => (
          <Grid item xs={12} md={6} key={initiative.title}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  {initiative.icon}
                  <Typography variant="h6" component="h3" sx={{ ml: 2 }}>
                    {initiative.title}
                  </Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  {initiative.description}
                </Typography>
                <List>
                  {initiative.points.map((point) => (
                    <ListItem key={point}>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText primary={point} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Statistics Section */}
      <Box sx={{ mt: 8, bgcolor: 'grey.100', p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Our Impact
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h3" align="center" color="primary">
              1000+
            </Typography>
            <Typography variant="h6" align="center">
              Rehabilitation Centers
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h3" align="center" color="primary">
              50,000+
            </Typography>
            <Typography variant="h6" align="center">
              Lives Transformed
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h3" align="center" color="primary">
              200+
            </Typography>
            <Typography variant="h6" align="center">
              Districts Covered
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default About; 