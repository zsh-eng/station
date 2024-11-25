import ApiClientView from '@/components/ApiClientView';
import { SendStationHttpRequest } from '@wailsjs/go/main/App';

function App() {
  return (
    <div
      id='App'
      className='flex flex-col items-center justify-center h-screen'
    >
      <ApiClientView
        onSubmit={async (data) => {
          await SendStationHttpRequest(data);
        }}
      />
    </div>
  );
}

export default App;
