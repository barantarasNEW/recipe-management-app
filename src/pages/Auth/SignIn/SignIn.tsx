import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../../redux/slices/userSlice";
import { app } from "../../../config/firebase";
import { useAppDispatch } from "../../../hooks/useRedux";
import { checkValidInput } from "../../../helpers/checkValidInputs";
import { getAdditionalUserData } from "../../../helpers/getAdditionUserData";
import { AuthErrors } from "../../../types/AuthErrors";
import { User } from "../../../types/User";

type Props = {
  setIsLoading: (value: boolean) => void;
}

const SignIn: React.FC<Props> = ({ setIsLoading }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const auth = getAuth(app);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<AuthErrors[]>([]);
  const [userNotFound, setUserNotFound] = useState(false);

  const signIn = () => {
    let isError = false;
    const isValidEmail = checkValidInput(AuthErrors.EMAIL, email);
    const isValidPassword = checkValidInput(AuthErrors.PASSWORD, password);

    if (!isValidEmail) {
      setErrors(currentErrors => (
        [...currentErrors, AuthErrors.EMAIL]
      ));

      isError = true;
    }

    if (!isValidPassword) {
      setErrors(currentErrors => (
        [...currentErrors, AuthErrors.PASSWORD]
      ));

      isError = true;
    }
    
    if (isError) {
      return;
    }

    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(res => {
        getAdditionalUserData(res.user.uid)
          .then(data => {
            const fullData = {
              email,
              password,
              firstName: data?.firstName,
            };

            dispatch(setUser(fullData as User));
            setUserNotFound(false);
            navigate("/");
          });
      }).catch(() => setUserNotFound(true))
      .finally(() => setIsLoading(false));
  };

  const onChange = (
    e: ChangeEvent<HTMLInputElement>,
    errorType: AuthErrors,
    setInput: (value: string) => void,
  ) => {
    const value = e.target.value;
    const isValidInput = checkValidInput(errorType, value);

    setInput(value);
  
    if (isValidInput) {
      setErrors(currErrors => currErrors
        .filter(currError => currError !== errorType));
    }
  };

  return (
    <>
      <form
        className="auth-form"
        onSubmit={e => e.preventDefault()}
      >
        <label>
          <input
            className="input"
            type="email"
            placeholder="Email"
            autoComplete="true"
            value={email}
            onChange={e => onChange(e, AuthErrors.EMAIL, setEmail)}
          />

          <p className="error">
            {errors.includes(AuthErrors.EMAIL) && (
              "must incl. @ , ."
            )}
          </p>
        </label>
                
        <label>
          <input
            className="input"
            type="password"
            placeholder="Password"
            autoComplete="true"
            value={password}
            onChange={e => onChange(e, AuthErrors.PASSWORD, setPassword)}
          />
  
          <p className="error">
            {errors.includes(AuthErrors.PASSWORD) && (
              "more than 7 symbols"
            )}
          </p>
        </label>
      
        <button
          className="btn"
          onClick={signIn}
          disabled={!!errors.length}
        >
          Sign In
        </button>

        <Link to="/signUp" className="auth-form__link">
          Sign Up
        </Link>
      </form>

      {userNotFound && <p>User not found</p>}
    </>
  );
};

export default SignIn;