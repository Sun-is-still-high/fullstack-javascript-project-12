import { useNavigate } from 'react-router-dom';
import { Container, Navbar, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const ChatPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    auth.logOut();
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column h-100">
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand>Hexlet Chat</Navbar.Brand>
          <Button variant="primary" onClick={handleLogout}>
            Выйти
          </Button>
        </Container>
      </Navbar>
      <Container className="my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-12">
            <div className="d-flex flex-column h-100">
              <div className="chat-messages overflow-auto px-5">
                <h1>Добро пожаловать в чат!</h1>
                <p>Привет, {auth.user?.username}!</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ChatPage;
