import { Suspense } from 'react';
import ReactDOM from 'react-dom';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from 'i18next-http-backend';
import 'flag-icon-css/css/flag-icon.min.css';
import LanguageDetector from 'i18next-browser-languagedetector';

import App from 'App';

import {ThemeContextProvider} from 'context/theme-context';
import {theme} from 'theme';

import { ThemeProvider } from '@mui/material/styles';
import './index.css';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)option
    fallbackLng: "en",
    supportedLngs: ['en', 'ru'],
    detection: {
      order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain'],
      caches: ['cookie']
    },
    backend: {
      loadPath: '/assets/locals/{{lng}}/translation.json',
    },
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

ReactDOM.render(
  <ThemeContextProvider>
    <ThemeProvider theme={theme}>
      <Suspense fallback='Loading...'>
        <App />
      </Suspense>
    </ThemeProvider>
  </ThemeContextProvider>,
  document.getElementById('root')
);
