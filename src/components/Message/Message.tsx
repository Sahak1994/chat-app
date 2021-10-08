import classes from './Message.module.css';

const Message = ({
  createdAt,
  text = '',
  displayName = '',
  photoUrl,
} : MessageProps) => {

  if (!text) return null;

  return (
    <div className={classes.message}>
      {photoUrl ? (
        <img
          src={photoUrl}
          alt="Avatar"
          className={classes.avatar}
          width={45}
          height={45}
        />
      ) : null}
      <div className={classes['message-info']}>
        <div>
          <div className={classes.description}>
            {displayName ? (
              <p className={classes.name}>{displayName}</p>
            ) : null}
              <span className={classes.date}>
                {createdAt}
              </span>
          </div>
          <p className={classes.message}>{text}</p>
        </div>
        <div className={classes['new-message']}>
          <div>New Messages</div>
          <div className={classes['message-count']}>0</div>
        </div>
      </div>
    </div>
  );
};

interface MessageProps {
  text: string;
  createdAt: string;
  displayName: string;
  photoUrl: string;
};

export default Message;
