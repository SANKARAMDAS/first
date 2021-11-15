import './App.css';

const App = () => {

  const handleSubmit = (e) => {
    alert('Response submitted successfully!');
    e.preventDefault();
  }

  return (
    <div className="page">
      <div className="coming-soon">
        <div className="content">
          <h1 className="content__title">
            Polaris<br />Coming Soon
          </h1>
          <p className="content__para">
            Leave your email with us and we'll drop<br />you an email when its ready.
          </p>
          <form onSubmit={handleSubmit}>
            <input id="email" name="email" type="email" placeholder="Enter your Email Address" />
            <input type="submit" value="Subscribe" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
