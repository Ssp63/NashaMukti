import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useLanguage } from '../context/LanguageContext';

const NotFound = () => {
  const navigate = useNavigate();
  const { translate } = useLanguage();

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h1" component="h1" gutterBottom>
          {translate('error.notFound.title')}
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          {translate('error.notFound.heading')}
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          {translate('error.notFound.message')}
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            size="large"
          >
            {translate('common.goToHomepage')}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default NotFound; 