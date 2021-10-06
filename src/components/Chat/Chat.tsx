import { useEffect, useState } from 'react';
import {db} from 'firebase';
import {collection, getDocs, addDoc, onSnapshot} from 'firebase/firestore';

import Message from 'components/Message/Message';

import classes from './Chat.module.css';
import InputField from 'elements/Input/InputField';
import { Button } from '@mui/material';

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
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
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

  return (
    <div className={classes.chat}>
      <div className={classes['chat_part']}>
        <div>
          <div className={classes.header}>
            <div className={classes.title}>
              <p>Welcome to</p>
              <p>Chat Exalt</p>
            </div>
            <p className={classes.subText}>
              This is the beginning of this chat.
            </p>
          </div>
          <ul className={classes.list}>
            {messages.sort((first, second) =>
              new Date(first.createdAt).getTime() - new Date(second.createdAt).getTime()
            ).map((message, index) => (
                <li key={index.toString()} style={{listStyleType: 'none'}}>
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
      <div className="mb-6 mx-4">
        <form
          onSubmit={handleOnSubmit}
          className={classes.form}
        >
          <InputField
            type="text"
            value={newMessage}
            onChange={handleOnChange}
            label='Message'
          />
          <Button
            type="submit"
            variant='contained'
            disabled={!newMessage}
          >
            Send
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
