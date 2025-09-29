import './styles.css';
import reactSvg from './assets/svgs/react.svg';
import { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="container">
      <h1>Hello, React with TypeScript and Webpack!</h1>
      <img src={reactSvg} alt="Sample" />
      <div>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <p>Count: {count}</p>
      </div>
    </div>
  );
};

export default App;
