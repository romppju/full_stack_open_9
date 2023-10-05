const Notification = ({ message }: { message: string }) => {
  if (message === '') {
    return null;
  }

  return <p style={{ color: 'red' }}>{message}</p>;
};

export default Notification;
