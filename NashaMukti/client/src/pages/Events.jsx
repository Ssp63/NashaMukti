import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import debounce from 'lodash/debounce';
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
  Alert,
} from '@mui/material';
import { getEvents } from '../store/slices/eventSlice';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useLanguage } from '../context/LanguageContext';


const Events = () => {
  const dispatch = useDispatch();
  const { events, loading, totalPages, currentPage, error } = useSelector(
    (state) => state.events
  );
  const { translate } = useLanguage();

  const [filters, setFilters] = useState({
    district: '',
    search: '',
  });
  
  const [districts, setDistricts] = useState([]);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [localPage, setLocalPage] = useState(1);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((value) => {
      setFilters(prev => ({ ...prev, search: value }));
      setLocalPage(1); // Reset to first page when searching
    }, 500),
    []
  );

  // Extract unique districts from events
  useEffect(() => {
    if (events && events.length > 0) {
      const uniqueDistricts = [...new Set(events.map(event => event.district))];
      const sortedDistricts = uniqueDistricts
        .filter(district => district) // Remove any null/undefined values
        .sort((a, b) => a.localeCompare(b));
      
      setDistricts(sortedDistricts);
    }
  }, [events]);

  // Fetch events when filters change
  useEffect(() => {
    dispatch(getEvents({ page: localPage, ...filters }));
  }, [dispatch, filters, localPage]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setLocalPage(1); // Reset to first page when changing filters
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handlePageChange = (event, value) => {
    setLocalPage(value);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{translate('events.error')}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {translate('events.title')}
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={translate('events.searchLabel')}
              name="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={translate('events.searchPlaceholder')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="district-label">{translate('events.districtLabel')}</InputLabel>
              <Select
                labelId="district-label"
                id="district"
                name="district"
                value={filters.district}
                label={translate('events.districtLabel')}
                onChange={handleFilterChange}
                disabled={loading}
              >
                <MenuItem value="">{translate('events.allDistricts')}</MenuItem>
                {districts.map((district) => (
                  <MenuItem key={district} value={district}>
                    {district}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Events Grid */}
      {events.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          {translate('events.noEvents')}
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
                    {translate('events.learnMore')}
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
            page={localPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default Events; 
