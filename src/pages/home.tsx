import { cn } from '@/utils/cn';
import { useState } from 'react';

function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-2">
      <h3 className="text-2xl font-bold">Welcome Home!</h3>
      <button onClick={() => setCount(count + 1)} className="bg-blue-500 text-white p-2 rounded">
        Increment
      </button>
      <p className={cn('text-xl text-gray-500', count > 2 && 'text-red-500')}>Current count: {count}</p>
    </div>
  );
}

export default Home;
