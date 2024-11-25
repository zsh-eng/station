import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Greet } from '@wailsjs/go/main/App';
import { useState } from 'react';
import '@/App.css';

function App() {
  const [resultText, setResultText] = useState(
    'Please enter your name below 👇'
  );
  const [name, setName] = useState('');
  const updateName = (e: any) => setName(e.target.value);
  const updateResultText = (result: string) => setResultText(result);

  async function greet() {
    const result = await Greet(name);
    updateResultText(result);
  }

  return (
    <div
      id='App'
      className='flex flex-col items-center justify-center h-screen'
    >
      <div id='result' className='result'>
        {resultText}
      </div>
      <div id='input' className='max-w-md mx-auto flex flex-col gap-2'>
        <Input
          id='name'
          className='input'
          onChange={updateName}
          autoComplete='off'
          name='input'
          type='text'
        />
        <Button variant={'outline'} onClick={greet} className='w-full'>
          Greet
        </Button>
      </div>
    </div>
  );
}

export default App;
