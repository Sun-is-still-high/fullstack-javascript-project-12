import { useFormik } from 'formik';

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log('Form values:', values);
    },
  });

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Войти</h1>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Ваш ник
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Пароль
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-control"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Войти
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
