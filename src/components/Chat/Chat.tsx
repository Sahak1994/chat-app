import { useEffect, useState, useContext } from 'react';
import {useHistory} from 'react-router-dom';
import {db} from 'firebase';
import {collection, getDocs, addDoc, onSnapshot} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from "react-i18next";
import { logEvent } from '@firebase/analytics';
import { analytics } from 'firebase';

import Message from 'components/Message/Message';
import ThemeContext from 'context/theme-context';
import ChatHeader from 'components/UI/ChatHeader/ChatHeader';

import InputField from 'elements/Input/InputField';
import { Button } from '@mui/material';
import classes from './Chat.module.css';

interface MessageType {
  uid: string;
  displayName: string;
  createdAt: string;
  text: string;
  photoUrl: string;
}

const Chat = ({
  uid, 
  displayName, 
  photoUrl,
} : ChatProps) => {
  const {t} = useTranslation();
  const history = useHistory();
  const {theme} = useContext(ThemeContext);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {} 
    else {
      logEvent(analytics, 'Chat_page_visited');
    }
    async function getData() {
      const messages = await getDocs(collection(db, 'messages'));
      const data: MessageType[] = [];

      messages.forEach((doc) => {
        data.push(doc.data() as MessageType);
      });

      setMessages(data);
    }

    getData();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "messages"), (doc) => {
      const updatedMessages: MessageType[] = [];

      doc.docs.forEach(msg => {
        updatedMessages.push(msg.data() as MessageType);
      });

      setMessages(updatedMessages);
    });

    return unsubscribe;
  }, [])

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      // Add new message in Firestore
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate()
      const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

      const createdAt = `${year}-${month}-${day}-${time}`

      await addDoc(collection(db, 'messages'), {
        uid,
        displayName,
        createdAt,
        text: trimmedMessage,
        photoUrl,
      })

      // Clear input field
      setNewMessage('');
    }
  };

  const goToUserPage = (id: string) => {
    if (id !== uid) {
      history.push(id)
    }
  }

  return (
    <div
      style={{backgroundColor: theme.palette.secondary.main}} 
      className={classes.chat}>
      <div className={classes['chat_part']}>
        <div>
          <ChatHeader />
          <ul className={classes.list}>
            {messages.sort((first, second) =>
              new Date(first.createdAt).getTime() - new Date(second.createdAt).getTime()
            ).map((message) => (
                <li
                  onClick={() => goToUserPage(message.uid)}
                  key={uuidv4()}
                  style={{
                    cursor: message.uid === uid ? '' : 'pointer'
                  }}
                  className={classes.message}>
                    <Message 
                      createdAt={message.createdAt}
                      displayName={message.displayName}
                      text={message.text}
                      photoUrl={message.photoUrl} />
                </li>
              ))
              }
          </ul>
        </div>
      </div>
      <div>
        <form
          onSubmit={handleOnSubmit}
          className={classes.form}
        >
          <InputField
            type="text"
            value={newMessage}
            onChange={handleOnChange}
            label={t('message')}
          />
          <Button
            type="submit"
            variant='contained'
            disabled={!newMessage}
          >
            {t('send')}
          </Button>
        </form>
      </div>
    </div>
  );
};

interface ChatProps {
  uid: string;
  displayName: string;
  photoUrl: string;
};

export default Chat;
