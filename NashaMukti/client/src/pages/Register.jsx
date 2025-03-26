import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { register } from '../store/slices/authSlice';
import { useLanguage } from '../context/LanguageContext';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const { translate } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'public',
    district: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      return;
    }

    try {
      await dispatch(register(formData)).unwrap();
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {translate('auth.register.title')}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label={translate('auth.register.nameLabel')}
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label={translate('auth.register.emailLabel')}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label={translate('auth.register.passwordLabel')}
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>{translate('auth.register.roleLabel')}</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              label={translate('auth.register.roleLabel')}
            >
              <MenuItem value="public">{translate('auth.register.roles.public')}</MenuItem>
              <MenuItem value="block_officer">{translate('auth.register.roles.blockOfficer')}</MenuItem>
            </Select>
          </FormControl>

          {formData.role === 'block_officer' && (
            <TextField
              fullWidth
              label={translate('auth.register.districtLabel')}
              name="district"
              value={formData.district}
              onChange={handleChange}
              margin="normal"
              required
            />
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? translate('auth.register.registering') : translate('auth.register.registerButton')}
          </Button>
        </form>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2">
            {translate('auth.register.hasAccount')}{' '}
            <Link component={RouterLink} to="/login" underline="hover">
              {translate('nav.login')}
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register; 