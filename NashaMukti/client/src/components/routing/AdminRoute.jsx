import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const AdminRoute = ({ element }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated && user?.role === 'admin' ? (
    element
  ) : (
    <Navigate to="/login" />
  );
};

AdminRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default AdminRoute; 