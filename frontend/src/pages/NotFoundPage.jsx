import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="container mt-5 text-center">
        <h1>{t('notFound.title')}</h1>
        <h2>{t('notFound.heading')}</h2>
        <p>{t('notFound.message')}</p>
        <Link to="/" className="btn btn-primary">
          {t('notFound.backHome')}
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
