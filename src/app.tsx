import './styles.css';
import reactSvg from './assets/svgs/react.svg';
import { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);
  console.log('API_URL:', process.env.API_URL); // .env 파일의 API_URL 출력
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
