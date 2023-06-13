import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../../redux/slices/userSlice";
import { app } from "../../../config/firebase";
import { useAppDispatch } from "../../../hooks/useRedux";
import { saveAdditionalUserData } from "../../../helpers/saveAdditionData";
import { checkValidInput } from "../../../helpers/checkValidInputs";
import { AuthErrors } from "../../../types/AuthErrors";

type Props = {
  setIsLoading: (value: boolean) => void;
}; 

const SignUp: React.FC<Props> = ({ setIsLoading }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const auth = getAuth(app);

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<AuthErrors[]>([]);
  const [userInUsed, setUserInUsed] = useState(false);

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

  const signUp = () => {
    let isError = false;
    const isValidEmail = checkValidInput(AuthErrors.EMAIL, email);
    const isValidPassword = checkValidInput(AuthErrors.PASSWORD, password);
    const isValidFirstName = checkValidInput(AuthErrors.FIRSTNAME, firstName);

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

    if (!isValidFirstName) {
      setErrors(currentErrors => (
        [...currentErrors, AuthErrors.FIRSTNAME]
      ));

      isError = true;
    }
    
    if (isError) {
      return;
    }

    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(res => {
        dispatch(setUser({ email, password, firstName }));
        saveAdditionalUserData(res.user.uid, { firstName, password });
        navigate("/");
      }).catch(() => setUserInUsed(true))
      .finally(() => setIsLoading(false));
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
            type="text"
            placeholder="First name"
            autoComplete="true"
            value={firstName}
            onChange={e => onChange(e, AuthErrors.FIRSTNAME, setFirstName)}
          />

          <p className="error">
            {errors.includes(AuthErrors.FIRSTNAME) && (
              "more than 3 symbols"
            )}
          </p>
        </label>
  
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
          onClick={signUp}
          disabled={!!errors.length}
        >
          Sign up
        </button>

        <Link to="/signIn" className="auth-form__link">
          Sign in
        </Link>
      </form>

      {userInUsed && <p>User already</p>}
    </>
  );
};

export default SignUp;