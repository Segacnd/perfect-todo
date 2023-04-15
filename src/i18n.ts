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
        },
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
