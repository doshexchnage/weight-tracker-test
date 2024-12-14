import { useEffect, useState } from 'react'; import './style.css';
import isMobile from 'is-mobile';
import Store from '../../store/store';

const LoginPage: React.FC = () => {
  const store = new Store();
  const [IsError, setIsError] = useState(false);
  const [ErrMsg,setErrMsg] =useState('')
  const [IsMobile, setIsMobile] = useState<boolean>(isMobile());
  const [Creds, setCreds] = useState({
    Email: '',
    Password: ''
  });

  useEffect(() => {
    setIsMobile(isMobile());
  }, []);

  function getCreds(e: { target: { id: string, value: string }, }) {
    let creds = { ...Creds };
    const ID = e.target.id;
    const VALUE = e.target.value;

    if (ID === 'email') {
      creds.Email = VALUE
    } else {
      creds.Password = VALUE
    };
    setIsError(false);
    setCreds(creds);
  };

  const handleLogin = async () => {
    console.log(Creds)
    if (Creds.Email === '') {
      setErrMsg('Email required');
      setIsError(true);
      return 
    };
    if (Creds.Password ===''){
      setErrMsg('Password required');
      setIsError(true);
      return 
    };
    const IsLogged = await store.login(Creds.Email, Creds);
    if (IsLogged) {

    } else {
      setIsError(true);
      setErrMsg('Authentication failed!')
    };

  };

  if (IsMobile) {
    return (
      <div className="login-container" >
        <div className='card'>
          <p>LET'S CREATE</p>
          <p className='slogan'>BE BOLD, BE COURAGEUOS, LET'S CRAFT</p>
          <input onChange={getCreds} id='email' type='text' placeholder='Email' />
          <input onChange={getCreds} id='pass' type='password' placeholder='Password' />
          {IsError ? <p className='font-medium text-lg text-red-600'>{ErrMsg}</p> : null}
          <span onClick={handleLogin}>Login</span>
        </div>
      </div>
    );
  } else {
    return (
      <div>Desktop view</div>
    )
  }
};

export default LoginPage;