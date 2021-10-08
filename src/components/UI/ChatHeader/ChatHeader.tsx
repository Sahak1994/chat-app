import { useTranslation } from "react-i18next";

import classes from './ChatHeader.module.css';

const ChatHeader = () => {
  const {t} = useTranslation();
  
  return (
    <div className={classes.header}>
      <div className={classes.title}>
        <p>{t("welcome_to")}</p>
        <p>{t('title')}</p>
      </div>
      <p className={classes.subText}>
        {t('subtitle')}
      </p>
    </div>
  );
}

export default ChatHeader;