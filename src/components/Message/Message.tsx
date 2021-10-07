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
