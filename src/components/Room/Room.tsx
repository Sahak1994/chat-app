import { useEffect, useState, useContext } from 'react';
import {useParams} from 'react-router-dom';
import {db} from 'firebase';
import {collection, getDocs, addDoc, onSnapshot, where, query} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from "react-i18next";

import Message from 'components/Message/Message';
import ThemeContext from 'context/theme-context';
import ChatHeader from 'components/UI/ChatHeader/ChatHeader';

import InputField from 'elements/Input/InputField';
import { Button } from '@mui/material';

import classes from './Room.module.css';

type ParamsType ={
  userId: string;
}

interface MessageType {
  uid: string;
  displayName: string;
  createdAt: string;
  text: string;
  photoUrl: string;
}

const Room = ({
  uid: myId, 
  displayName, 
  photoUrl,
}: RoomProps) => {
  const {userId}: ParamsType = useParams();
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');

  console.log('userId', userId);
  console.log('myId', myId);

  console.log('messages', messages)

  useEffect(() => {
    async function getData() {
      const q = query(collection(db, 'contacts'), where('user_id_1', '==', myId));
      const myMessages = await getDocs(q);
      const data: MessageType[] = [];

      myMessages.forEach((doc) => {
        console.log('d', doc.data());
        if (doc.data().user_id_2 === userId) {
          data.push(doc.data() as MessageType);
        }
      });

      setMessages(data);
    }

    getData();
  }, [myId, userId]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "contacts"), (doc) => {
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

      await addDoc(collection(db, 'contacts'), {
        user_id_1: myId,
        user_id_2: userId,
        displayName,
        createdAt,
        text: trimmedMessage,
        photoUrl,
      })

      // Clear input field
      setNewMessage('');
    }
  };

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
                  key={uuidv4()}
                  style={{
                    cursor: message.uid === myId ? '' : 'pointer'
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
}

interface RoomProps {
  uid: string;
  displayName: string;
  photoUrl: string;
}

export default Room;
