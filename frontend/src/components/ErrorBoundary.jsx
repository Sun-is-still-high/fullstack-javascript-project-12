import { Component } from 'react';
import { withTranslation } from 'react-i18next';
import rollbar from '../rollbar';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    rollbar.error(error, errorInfo);
  }

  render() {
    const { t } = this.props;

    if (this.state.hasError) {
      return (
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
          <h1>{t('error.title')}</h1>
          <p>{t('error.message')}</p>
          <button
            className="btn btn-primary"
            onClick={() => window.location.href = '/'}
          >
            {t('error.backHome')}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);
