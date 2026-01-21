import { Link } from 'react-router-dom';
import Header from '../components/Header';

const NotFoundPage = () => {
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="container mt-5 text-center">
        <h1>404</h1>
        <h2>Страница не найдена</h2>
        <p>К сожалению, запрашиваемая страница не существует.</p>
        <Link to="/" className="btn btn-primary">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
