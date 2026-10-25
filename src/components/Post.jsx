const Post = ({ title, body }) => {
  return (
    <div style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
};

export default Post;