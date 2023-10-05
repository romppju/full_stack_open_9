const Notification = ({ message }: { message: string }) => {
  const style = { color: 'red' };

  if (message === '') {
    return null;
  }

  return <p style={style}>{message}</p>;
};

export default Notification;
