import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Box,
  Pagination,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { getEvents } from '../store/slices/eventSlice';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Events = () => {
  const dispatch = useDispatch();
  const { events, loading, totalPages, currentPage } = useSelector(
    (state) => state.events
  );

  const [filters, setFilters] = useState({
    district: '',
    search: '',
  });

  useEffect(() => {
    dispatch(getEvents({ page: currentPage, ...filters }));
  }, [dispatch, currentPage, filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handlePageChange = (event, value) => {
    dispatch(getEvents({ page: value, ...filters }));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search Events"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="district-label">Filter by District</InputLabel>
              <Select
                labelId="district-label"
                id="district"
                name="district"
                value={filters.district}
                label="Filter by District"
                onChange={handleFilterChange}
              >
                <MenuItem value="">All Districts</MenuItem>
                <MenuItem value="District 1">District 1</MenuItem>
                <MenuItem value="District 2">District 2</MenuItem>
                <MenuItem value="District 3">District 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Events Grid */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : events.length === 0 ? (
        <Typography variant="h6" align="center">
          No events found
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {events.map((event) => (
            <Grid item xs={12} md={6} lg={4} key={event._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {event.images && event.images[0] && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={event.images[0].url}
                    alt={event.title}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {event.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EventIcon sx={{ mr: 1 }} color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(event.date)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOnIcon sx={{ mr: 1 }} color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {event.location}, {event.district}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      mb: 2,
                    }}
                  >
                    {event.description}
                  </Typography>
                  <Button
                    component={RouterLink}
                    to={`/events/${event._id}`}
                    variant="contained"
                    size="small"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default Events; 