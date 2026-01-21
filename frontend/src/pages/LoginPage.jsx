import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (auth.user) {
      navigate('/');
    }
  }, [auth.user, navigate]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthError(null);
      try {
        const response = await axios.post('/api/v1/login', values);
        const { token, username } = response.data;
        auth.logIn({ token, username });
        navigate('/');
      } catch (error) {
        if (error.response?.status === 401) {
          setAuthError('Неверные имя пользователя или пароль');
        } else {
          setAuthError('Произошла ошибка. Попробуйте еще раз');
        }
        console.error('Login error:', error);
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} lg={6} xxl={4}>
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <h1 className="text-center mb-4">Войти</h1>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Ваш ник</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Введите ваш ник"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={!!authError}
                    required
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Введите пароль"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={!!authError}
                    required
                  />
                  {authError && (
                    <Form.Control.Feedback type="invalid">
                      {authError}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                {authError && (
                  <Alert variant="danger" className="mb-3">
                    {authError}
                  </Alert>
                )}
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? 'Вход...' : 'Войти'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
