import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import store from './store';
import { LanguageProvider } from './context/LanguageContext';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';
import ScrollToTop from './components/layout/ScrollToTop';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import CreateEvent from './pages/CreateEvent';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

// Create enhanced theme with better shadows and palette
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2e7d32', // Green 800
      light: '#4caf50', // Green 500
      dark: '#1b5e20', // Green 900
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#66bb6a', // Green 400
      light: '#81c784', // Green 300
      dark: '#388e3c', // Green 700
      contrastText: '#ffffff',
    },
    background: {
      default: '#f1f8e9', // Light Green 50
      paper: 'rgba(255, 255, 255, 0.9)',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ff9800',
    },
    success: {
      main: '#43a047',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0,0,0,0.1)',
    '0 4px 6px rgba(0,0,0,0.12)',
    '0 6px 10px rgba(0,0,0,0.14)',
    '0 8px 12px rgba(0,0,0,0.16)',
    '0 10px 14px rgba(0,0,0,0.18)',
    '0 12px 16px rgba(0,0,0,0.2)',
    '0 14px 18px rgba(0,0,0,0.22)',
    '0 16px 20px rgba(0,0,0,0.24)',
    '0 18px 22px rgba(0,0,0,0.26)',
    '0 20px 24px rgba(0,0,0,0.28)',
    '0 22px 26px rgba(0,0,0,0.3)',
    '0 24px 28px rgba(0,0,0,0.32)',
    '0 26px 30px rgba(0,0,0,0.34)',
    '0 28px 32px rgba(0,0,0,0.36)',
    '0 30px 34px rgba(0,0,0,0.38)',
    '0 32px 36px rgba(0,0,0,0.4)',
    '0 34px 38px rgba(0,0,0,0.42)',
    '0 36px 40px rgba(0,0,0,0.44)',
    '0 38px 42px rgba(0,0,0,0.46)',
    '0 40px 44px rgba(0,0,0,0.48)',
    '0 42px 46px rgba(0,0,0,0.5)',
    '0 44px 48px rgba(0,0,0,0.52)',
    '0 46px 50px rgba(0,0,0,0.54)',
    '0 48px 52px rgba(0,0,0,0.56)',
  ],
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          color: 'text.primary',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 12px rgba(46, 125, 50, 0.15)',
          },
        },
        contained: {
          boxShadow: '0 2px 4px rgba(46, 125, 50, 0.1)',
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
        elevation2: {
          boxShadow: '0 4px 6px rgba(0,0,0,0.12)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
          },
        },
      },
    },
  },
});

// Page transition routes component
const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <div className="page-transition">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/create-event"
          element={<PrivateRoute element={<CreateEvent />} />}
        />
        
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={<AdminRoute element={<AdminDashboard />} />}
        />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LanguageProvider>
          <Router>
            <ScrollToTop />
            <div className="App">
              <Navbar />
              <main>
                <AppRoutes />
              </main>
              <Footer />
            </div>
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
