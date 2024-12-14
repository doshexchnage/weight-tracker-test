import { useEffect, useState } from 'react';
import isMobile from 'is-mobile';
import Store from './store/store';
import LoginPage from './pages/Login/login';
function App() {
  const [IsMobile, setIsMobile] = useState<boolean>(isMobile());
  const store = new Store();
  useEffect(() => {
    setIsMobile(isMobile());
    //  get();
    //  create();
    //  getall();
    //  put();
    //  deletex();
    //  getall();
  }, []);

  const create = async () => {
    const data = {
      W_unit: 'g',
      W_value: 890
    }
    const weigth = await store.createWeight(data);
    console.log(weigth)
  };
  const getall = async () => {
    const weigth = await store.getWeights();
    console.log(weigth)
  };
  const put = async () => {
    const data = {
      W_unit: 'kg',
      W_value: 0
    }
    const weigth = await store.updateWeight(data);
    console.log(weigth)
  };
  const deletex = async () => {
    const weigth = await store.deleteWeight("6758aedc084ca17bd9c40e88");
    console.log(weigth)
  };
  const get = async () => {
    const pass = { Password: 'Test@1234' };
    const email = 'test@test.com';
    const isLoggedIn = await store.login(email, pass);
    console.log(isLoggedIn)
  }
  return (
    <div className="flex flex-col justify-center items-center bg-custom-gradient mx-auto p-4 w-screen h-screen container md:p">
      <LoginPage />
    </div>
  );
}

export default App;