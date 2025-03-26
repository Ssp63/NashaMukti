import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Button,
  CircularProgress,
  ImageList,
  ImageListItem,
  Chip,
  Divider,
} from '@mui/material';
import {
  Event as EventIcon,
  LocationOn,
  Person,
  Description,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { getEvent, deleteEvent } from '../store/slices/eventSlice';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { event, loading } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getEvent(id));
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await dispatch(deleteEvent(id)).unwrap();
        navigate('/events');
      } catch (error) {
        console.error('Failed to delete event:', error);
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading || !event) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const canModifyEvent =
    user &&
    (user.role === 'admin' ||
      (user.role === 'block_officer' && event.createdBy._id === user.id));

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {event.title}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EventIcon sx={{ mr: 1 }} color="primary" />
                <Typography variant="body1">
                  {formatDate(event.date)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOn sx={{ mr: 1 }} color="primary" />
                <Typography variant="body1">
                  {event.location}, {event.district}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Person sx={{ mr: 1 }} color="primary" />
                <Typography variant="body1">
                  Organized by: {event.createdBy.name}
                </Typography>
              </Box>
            </Grid>
            {canModifyEvent && (
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                  gap: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => navigate(`/events/${id}/edit`)}
                >
                  Edit Event
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleDelete}
                >
                  Delete Event
                </Button>
              </Grid>
            )}
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Description Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <Description sx={{ mr: 1 }} />
            Description
          </Typography>
          <Typography variant="body1" paragraph>
            {event.description}
          </Typography>
        </Box>

        {/* Images Section */}
        {event.images && event.images.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Event Photos
            </Typography>
            <ImageList
              sx={{ width: '100%', height: 'auto' }}
              cols={3}
              rowHeight={300}
              gap={16}
            >
              {event.images.map((image, index) => (
                <ImageListItem key={index}>
                  <img
                    src={image.url}
                    alt={`Event photo ${index + 1}`}
                    loading="lazy"
                    style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        )}

        {/* Reports Section */}
        {event.reports && event.reports.length > 0 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Event Reports
            </Typography>
            <Grid container spacing={2}>
              {event.reports.map((report, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant="body1" sx={{ mr: 2 }}>
                      {report.title}
                    </Typography>
                    <Chip
                      label={report.fileType.toUpperCase()}
                      color="primary"
                      variant="outlined"
                      component="a"
                      href={report.fileUrl}
                      target="_blank"
                      clickable
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default EventDetails; 