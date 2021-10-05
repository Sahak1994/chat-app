import { useEffect, useState } from 'react';
import {db} from 'firebase';
import {collection, getDocs, addDoc} from 'firebase/firestore';

import Message from 'components/Message/Message';

import classes from './Chat.module.css';
import InputField from 'elements/Input/InputField';
import { Button } from '@mui/material';

interface MessageType {
  uid: string;
  displayName: string;
  createdAt: string;
  text: string;
}

const Chat = ({ 
  uid, 
  displayName, 
  photoUrl ,
} : ChatProps) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    async function getData() {
      const messages = await getDocs(collection(db, 'messages'));

      console.log('messages', messages);
      const data: MessageType[] = [];

      messages.forEach((doc) => {
        data.push(doc.data() as MessageType);
      });

      setMessages(data);
    }

    getData();
  }, []);

  // const bottomListRef = useRef();

  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, [inputRef]);

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
      })

      // Clear input field
      setNewMessage('');

      setMessages(prevState => {
        return [
          ...prevState,
          { uid, displayName, createdAt, text: trimmedMessage }
        ]
      })
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
                    photoUrl={photoUrl} />
                </li>
              ))
              }
          </ul>
          {/* <div ref={bottomListRef} /> */}
        </div>
      </div>
      <div className="mb-6 mx-4">
        <form
          onSubmit={handleOnSubmit}
          className="flex flex-row bg-gray-200 dark:bg-coolDark-400 rounded-md px-4 py-3 z-10 max-w-screen-lg mx-auto dark:text-white shadow-md"
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
