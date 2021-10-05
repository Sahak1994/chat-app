import { useEffect, useState, useRef } from 'react';
import {db} from 'firebase';
import {collection, getDocs, addDoc, onSnapshot, query} from 'firebase/firestore';
// import { useFirestoreQuery } from './hooks';
// Components
import Message from 'components/Message/Message';

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

  const inputRef = useRef() as (React.LegacyRef<HTMLInputElement> | undefined );
  // const bottomListRef = useRef();

  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, [inputRef]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      // const docRef = 
      const docRef = await addDoc(collection(db, 'messages'), {
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
    <div className="flex flex-col h-full">
      <div className="overflow-auto h-full">
        <div className="py-4 max-w-screen-lg mx-auto">
          <div className="border-b dark:border-gray-600 border-gray-200 py-8 mb-4">
            <div className="font-bold text-3xl text-center">
              <p className="mb-1">Welcome to</p>
              <p className="mb-3">React FireChat</p>
            </div>
            <p className="text-gray-400 text-center">
              This is the beginning of this chat.
            </p>
          </div>
          <ul>
            {messages.sort((first, second) =>
              new Date(first.createdAt).getTime() - new Date(second.createdAt).getTime()
            ).map((message, index) => (
                <li key={index.toString()}>
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
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={handleOnChange}
            placeholder="Type your message here..."
            className="flex-1 bg-transparent outline-none"
          />
          <button
            type="submit"
            disabled={!newMessage}
            className="uppercase font-semibold text-sm tracking-wider text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Send
          </button>
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
