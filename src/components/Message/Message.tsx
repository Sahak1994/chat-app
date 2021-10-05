const Message = ({
  createdAt,
  text = '',
  displayName = '',
  photoUrl,
} : MessageProps) => {
  if (!text) return null;

  return (
    <div className="px-4 py-4 rounded-md hover:bg-gray-50 dark:hover:bg-coolDark-600 overflow-hidden flex items-start">
      {photoUrl ? (
        <img
          src={photoUrl}
          alt="Avatar"
          className="rounded-full mr-4"
          width={45}
          height={45}
        />
      ) : null}
      <div>
        <div className="flex items-center mb-1">
          {displayName ? (
            <p className="mr-2 text-primary-500">{displayName}</p>
          ) : null}
            <span className="text-gray-500 text-xs">
              {createdAt}
            </span>
          )
        </div>
        <p>{text}</p>
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