import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import {
  Person as PersonIcon,
  LocationOn as LocationIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { events } = useSelector((state) => state.events);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Filter events based on user's district if they are a block officer
  const userEvents = user?.role === 'block_officer'
    ? events.filter(event => event.district === user.district)
    : [];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      {/* User Profile Card */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: 'primary.main',
                  mb: 2,
                  fontSize: '3rem',
                }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {user?.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {user?.role?.replace('_', ' ').toUpperCase()}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="body1">
                  <strong>Name:</strong> {user?.name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="body1">
                  <strong>Email:</strong> {user?.email}
                </Typography>
              </Box>
              {user?.district && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="body1">
                    <strong>District:</strong> {user?.district}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Block Officer's Events Section */}
      {user?.role === 'block_officer' && (
        <>
          <Typography variant="h5" gutterBottom sx={{ mt: 6 }}>
            Your District Events
          </Typography>
          <Grid container spacing={3}>
            {userEvents.map((event) => (
              <Grid item xs={12} md={6} key={event._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Date: {new Date(event.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Location: {event.location}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            {userEvents.length === 0 && (
              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary">
                  No events found in your district.
                </Typography>
              </Grid>
            )}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Dashboard; 