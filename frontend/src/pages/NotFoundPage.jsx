import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { appRoutes } from '../routes'

const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <div className="container mt-5 text-center">
      <h1>{t('notFound.title')}</h1>
      <h2>{t('notFound.heading')}</h2>
      <p>{t('notFound.message')}</p>
      <Link to={appRoutes.chat} className="btn btn-primary">
        {t('notFound.backHome')}
      </Link>
    </div>
  )
}

export default NotFoundPage
