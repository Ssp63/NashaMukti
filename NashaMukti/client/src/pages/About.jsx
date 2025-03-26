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
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { translate } = useLanguage();

  const initiatives = [
    {
      title: translate('about.initiatives.rehabilitation.title'),
      description: translate('about.initiatives.rehabilitation.description'),
      icon: <LocalHospitalIcon fontSize="large" color="primary" />,
      points: [
        translate('about.initiatives.rehabilitation.points.0'),
        translate('about.initiatives.rehabilitation.points.1'),
        translate('about.initiatives.rehabilitation.points.2'),
      ],
    },
    {
      title: translate('about.initiatives.community.title'),
      description: translate('about.initiatives.community.description'),
      icon: <GroupsIcon fontSize="large" color="primary" />,
      points: [
        translate('about.initiatives.community.points.0'),
        translate('about.initiatives.community.points.1'),
        translate('about.initiatives.community.points.2'),
      ],
    },
    {
      title: translate('about.initiatives.education.title'),
      description: translate('about.initiatives.education.description'),
      icon: <SchoolIcon fontSize="large" color="primary" />,
      points: [
        translate('about.initiatives.education.points.0'),
        translate('about.initiatives.education.points.1'),
        translate('about.initiatives.education.points.2'),
      ],
    },
    {
      title: translate('about.initiatives.policy.title'),
      description: translate('about.initiatives.policy.description'),
      icon: <PolicyIcon fontSize="large" color="primary" />,
      points: [
        translate('about.initiatives.policy.points.0'),
        translate('about.initiatives.policy.points.1'),
        translate('about.initiatives.policy.points.2'),
      ],
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Mission Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          {translate('about.title')}
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph align="center">
          {translate('about.subtitle')}
        </Typography>
        <Typography variant="body1" paragraph align="center" sx={{ mt: 4 }}>
          {translate('about.description')}
        </Typography>
      </Box>

      <Divider sx={{ mb: 8 }} />

      {/* Government Initiatives */}
      <Typography variant="h4" component="h2" gutterBottom align="center">
        {translate('about.initiatives.title')}
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
          {translate('about.impact.title')}
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h3" align="center" color="primary">
              {translate('about.impact.centers.number')}
            </Typography>
            <Typography variant="h6" align="center">
              {translate('about.impact.centers.label')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h3" align="center" color="primary">
              {translate('about.impact.lives.number')}
            </Typography>
            <Typography variant="h6" align="center">
              {translate('about.impact.lives.label')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h3" align="center" color="primary">
              {translate('about.impact.districts.number')}
            </Typography>
            <Typography variant="h6" align="center">
              {translate('about.impact.districts.label')}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default About; 