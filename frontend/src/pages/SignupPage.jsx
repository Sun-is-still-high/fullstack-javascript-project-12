import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';

const SignupPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [signupError, setSignupError] = useState(null);

  const validationSchema = yup.object({
    username: yup
      .string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: yup
      .string()
      .min(6, 'Не менее 6 символов')
      .required('Обязательное поле'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
      .required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setSignupError(null);
      try {
        const response = await axios.post('/api/v1/signup', {
          username: values.username,
          password: values.password,
        });
        const { token, username } = response.data;
        auth.logIn({ token, username });
        navigate('/');
      } catch (error) {
        console.error('Signup failed:', error);
        if (error.response?.status === 409) {
          setSignupError('Такой пользователь уже существует');
        } else {
          setSignupError('Ошибка регистрации');
        }
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Container fluid className="h-100">
        <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src="/signup-avatar.jpg"
                  className="rounded-circle"
                  alt="Регистрация"
                  style={{ width: '200px', height: '200px' }}
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">Регистрация</h1>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label className="visually-hidden">Имя пользователя</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Имя пользователя"
                    autoComplete="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={(formik.touched.username && !!formik.errors.username) || !!signupError}
                    disabled={formik.isSubmitting}
                    autoFocus
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label className="visually-hidden">Пароль</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    autoComplete="new-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={(formik.touched.password && !!formik.errors.password) || !!signupError}
                    disabled={formik.isSubmitting}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="confirmPassword">
                  <Form.Label className="visually-hidden">Подтвердите пароль</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Подтвердите пароль"
                    autoComplete="new-password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={(formik.touched.confirmPassword && !!formik.errors.confirmPassword) || !!signupError}
                    disabled={formik.isSubmitting}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                  {signupError && (
                    <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                      {signupError}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100"
                  disabled={formik.isSubmitting}
                >
                  Зарегистрироваться
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Уже есть аккаунт? </span>
                <Link to="/login">Войти</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default SignupPage;
