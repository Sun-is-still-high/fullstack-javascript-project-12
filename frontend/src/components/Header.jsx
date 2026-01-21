import { Navbar, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    auth.logOut();
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          {t('header.brand')}
        </Navbar.Brand>
        {auth.user && (
          <Button variant="primary" onClick={handleLogout}>
            {t('header.logout')}
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
