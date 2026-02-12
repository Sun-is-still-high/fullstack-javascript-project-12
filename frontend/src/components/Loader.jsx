import { useTranslation } from 'react-i18next'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  const { t } = useTranslation()

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">{t('chat.loading')}</span>
      </Spinner>
    </div>
  )
}

export default Loader
