import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: {
          app_title: 'Perfect ToDo',
          app_author: 'created by Bergei',
          categories: 'Categories',
          todo_view_in_progress: 'In progress',
          todo_view_completed: 'Completed',
          tooltip_add_category: 'add new category',
          tooltip_add_todo: 'add new todo',
          modal_add_new_category_title: 'New category',
          input_add_category_placeholder: 'Please, enter a category name',
          button_text_create: 'create',
          greetings_account_preview: 'Hello',
          auth_title: 'Authorization',
          auth_input_placeholder: 'Login...',
          auth_redirect_text: 'Dont nave an account?',
          auth_create_acc_text: 'Create new account',
          auth_button_text: 'sign in',
          registration_title: 'Registration',
          registration_login_input: 'create login',
          registration_fname_input: 'First name',
          registration_lname_input: 'Last name',
          registration_redirect_text: 'Already have account?',
          registration_link_text: 'Log in',
          registration_button_text: 'sign up',
        },
      },
      ru: {
        translation: {
          app_title: 'Идеальный список дел',
          app_author: 'создатель Бергей',
          categories: 'Категории',
          todo_view_in_progress: 'В процессе',
          todo_view_completed: 'Выполнены',
          tooltip_add_category: 'добавить категорию',
          tooltip_add_todo: 'добавить задачу',
          modal_add_new_category: 'Новая категория',
          input_add_category_placeholder: 'Введите имя категории',
          button_text_create: 'создать',
          greetings_account_preview: 'Привет',
          modal_add_new_category_title: 'Новая категория',
          auth_title: 'Авторизация',
          auth_input_placeholder: 'Логин...',
          auth_redirect_text: 'У вас нет аккаунта?',
          auth_create_acc_text: 'Создать аккаунт',
          auth_button_text: 'войти',
          registration_title: 'Регистрация',
          registration_login_input: 'придумайте логин',
          registration_fname_input: 'Имя',
          registration_lname_input: 'Фамилия',
          registration_redirect_text: 'Уже есть аккаунт?',
          registration_link_text: 'Войти',
          registration_button_text: 'зарегестрироваться',
        },
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
