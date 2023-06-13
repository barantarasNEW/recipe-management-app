import { useState } from 'react';
import { useLocation } from 'react-router';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import Loader from '../../components/Loader/Loader';
import './Auth.scss';

const Auth = () => {
  const location = useLocation().pathname;
  const isSignUp = location === '/signUp';

  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <>
      <section className="page__section auth">
        <div className="container">
          <div className="auth__wrapper">
            <h1 className="page__title">
              {isSignUp ? "Sign up" : "Sign In"}
            </h1>
  
            {isSignUp
              ? <SignUp setIsLoading={setIsLoading} />
              : <SignIn setIsLoading={setIsLoading} />}
          </div>
        </div>
      </section>
  
      {isLoading && <Loader />}
    </>
  );
};

export default Auth;