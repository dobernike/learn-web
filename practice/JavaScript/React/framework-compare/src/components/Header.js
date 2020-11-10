const Header = () => (
  <div className="py-5 text-center">
    <img
      style={{ height: '150px' }}
      src={process.env.PUBLIC_URL + '/logo512.png'}
      alt=""
    />
    <h2>Keep Resources</h2>
    <p className="lead">Keep your resource at once place</p>
  </div>
);

export default Header;
