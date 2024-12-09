import { useEffect, useState } from 'react';
import './App.css';
import isMobile from 'is-mobile';


function App() {
  const [IsMobile, setIsMobile] = useState<boolean>(isMobile());

  useEffect(() => {
    setIsMobile(isMobile());
  }, [IsMobile]);

  console.log(IsMobile)
  return (
    <div className="container mx-auto p-4  bg-custom-gradient h-screen w-screen flex flex-col justify-center items-center">
      {IsMobile ? <h1 className="text-3xl font-bold bg-green-400 ">Hello, World!</h1>
        
        :

        <div className="bg-red-400 h-80 w-80"></div>
      }
    </div>
  );
}

export default App;