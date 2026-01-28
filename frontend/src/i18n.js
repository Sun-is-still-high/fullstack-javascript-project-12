import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  ru: {
    translation: {
      header: {
        brand: 'Hexlet Chat',
        logout: 'Выйти',
      },
      login: {
        title: 'Войти',
        username: 'Ваш ник',
        password: 'Пароль',
        submit: 'Войти',
        submitting: 'Вход...',
        noAccount: 'Нет аккаунта?',
        signup: 'Регистрация',
        errors: {
          invalidCredentials: 'Неверные имя пользователя или пароль',
          networkError: 'Произошла ошибка. Попробуйте еще раз',
        },
      },
      signup: {
        title: 'Регистрация',
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        submit: 'Зарегистрироваться',
        hasAccount: 'Уже есть аккаунт?',
        login: 'Войти',
        errors: {
          userExists: 'Такой пользователь уже существует',
          signupError: 'Ошибка регистрации',
        },
      },
      validation: {
        required: 'Обязательное поле',
        usernameLength: 'От 3 до 20 символов',
        passwordLength: 'Не менее 6 символов',
        passwordsMustMatch: 'Пароли должны совпадать',
        unique: 'Должно быть уникальным',
      },
      chat: {
        channels: 'Каналы',
        messages: 'сообщений',
        messages_one: '{{count}} сообщение',
        messages_few: '{{count}} сообщения',
        messages_many: '{{count}} сообщений',
        channelDescription: 'Описание канала',
        selectChannel: 'Выберите канал',
        loading: 'Загрузка...',
        loadError: 'Не удалось загрузить данные',
        retry: 'Попробовать снова',
        noMessages: 'Нет сообщений',
      },
      channels: {
        add: 'Добавить канал',
        rename: 'Переименовать',
        remove: 'Удалить',
        manage: 'Управление каналом',
      },
      modals: {
        add: {
          title: 'Добавить канал',
          submit: 'Отправить',
          cancel: 'Отменить',
          placeholder: 'Имя канала',
          error: 'Ошибка создания канала',
        },
        rename: {
          title: 'Переименовать канал',
          submit: 'Отправить',
          cancel: 'Отменить',
          error: 'Ошибка переименования канала',
        },
        remove: {
          title: 'Удалить канал',
          body: 'Уверены?',
          submit: 'Удалить',
          cancel: 'Отменить',
        },
      },
      messages: {
        newMessage: 'Новое сообщение',
        enterMessage: 'Введите сообщение...',
        send: 'Отправить',
        errors: {
          sendError: 'Ошибка',
          networkError: 'Сеть недоступна. Проверьте подключение к интернету.',
          statusError: 'Ошибка отправки: {{status}}',
          genericError: 'Не удалось отправить сообщение',
        },
      },
      notFound: {
        title: '404',
        heading: 'Страница не найдена',
        message: 'К сожалению, запрашиваемая страница не существует.',
        backHome: 'Вернуться на главную',
      },
      notifications: {
        channelCreated: 'Канал создан',
        channelRenamed: 'Канал переименован',
        channelRemoved: 'Канал удалён',
        networkError: 'Ошибка соединения',
        dataLoadError: 'Не удалось загрузить данные',
      },
      error: {
        title: 'Что-то пошло не так',
        message: 'Произошла ошибка. Мы уже работаем над её исправлением.',
        backHome: 'Вернуться на главную',
      },
    },
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
