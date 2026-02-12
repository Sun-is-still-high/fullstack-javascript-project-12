import { useState } from 'react'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap'
import { appRoutes } from '../routes'
import { useAuth } from '../contexts/AuthContext'

const LoginPage = () => {
  const { t } = useTranslation()
  const auth = useAuth()
  const [authError, setAuthError] = useState(null)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthError(null)
      try {
        await auth.logIn(values)
      }
      catch (error) {
        if (error.response?.status === 401) {
          setAuthError('login.errors.invalidCredentials')
        }
        else {
          setAuthError('login.errors.networkError')
        }
        console.error('Login error:', error)
      }
    },
  })

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} lg={6} xxl={4}>
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <h1 className="text-center mb-4">{t('login.title')}</h1>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>{t('login.username')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder={t('login.username')}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={!!authError}
                    required
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>{t('login.password')}</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder={t('login.password')}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={!!authError}
                    required
                  />
                  {authError && (
                    <Form.Control.Feedback type="invalid">
                      {t(authError)}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? t('login.submitting') : t('login.submit')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>
                  {t('login.noAccount')}
                  {' '}
                </span>
                <Link to={appRoutes.signup}>{t('login.signup')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
