import { Navbar, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext'
import { appRoutes } from '../routes'

const Header = () => {
  const { t } = useTranslation()
  const auth = useAuth()

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container fluid>
        <Navbar.Brand as={Link} to={appRoutes.chat}>
          {t('header.brand')}
        </Navbar.Brand>
        {auth.user && (
          <Button variant="primary" onClick={auth.logOut}>
            {t('header.logout')}
          </Button>
        )}
      </Container>
    </Navbar>
  )
}

export default Header
