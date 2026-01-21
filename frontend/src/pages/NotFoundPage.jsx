import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container mt-5 text-center">
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <p>К сожалению, запрашиваемая страница не существует.</p>
      <Link to="/" className="btn btn-primary">
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFoundPage;
