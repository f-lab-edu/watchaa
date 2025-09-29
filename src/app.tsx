import './styles.css';
import reactSvg from './assets/svgs/react.svg';

const App = () => {
  return (
    <div className="container">
      <h1>Hello, React with TypeScript and Webpack!</h1>
      <img src={reactSvg} alt="Sample" />
    </div>
  );
};

export default App;
