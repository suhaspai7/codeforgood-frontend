import * as React from 'react';

import Routers from './routes';

function App() {
  return (
    <div className="App"> 
   
        <React.Suspense fallback={null}>
          <Routers/>
        </React.Suspense>
    </div>
  );
}


export default App;
