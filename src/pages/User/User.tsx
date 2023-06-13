import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getAuth, signOut, updateEmail, updatePassword } from "firebase/auth";
import { setUser } from '../../redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { updateAdditionalUserData } from '../../helpers/updateAdditionalUserData';
import './User.scss';

const User = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);

  const [firstName, setFirstName] = useState(user.firstName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [isChange, setIsChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();

  const onClickSave = async () => {
    setIsLoading(true);
    setIsShowPassword(false);

    if (auth.currentUser) {
      let emailOrPasswordIsChanged;

      if (email !== user.email) {
        emailOrPasswordIsChanged = true;
      }

      if (password !== user.password) {
        emailOrPasswordIsChanged = true;
      }

      if (user.firstName !== firstName || password !== user.password) {
        await updateAdditionalUserData(
          auth.currentUser.uid,
          { firstName, password }
        );
      }

      if (emailOrPasswordIsChanged) {
        await updateEmail(auth.currentUser, email);
        await updatePassword(auth.currentUser, password);

        onClickExit();
      }
    }

    setIsChange(false);
    setIsLoading(false);
  };

  const onClickExit = () => {
    setIsLoading(true);
    setIsShowPassword(false);

    signOut(auth).then(() => {
      dispatch(setUser({
        firstName: "",
        password: "", 
        email: "" 
      }));
      
      navigate('/signIn');
    }).catch(error => console.log(error))
    .finally(() => setIsLoading(false));
  };

  const onCancel = () => {
    setFirstName(user.firstName);
    setEmail(user.email);
    setPassword(user.password);
    setIsChange(false);
    setIsShowPassword(false);
  };

  const onShowPassword = () => {
    setIsShowPassword(currValue => !currValue);
  };

  useEffect(() => {
    if (!email.length) {
      navigate("/signIn");
    }
  }, []);

  if (!email.length) {
    return <></>;
  }

  return (
    <>
      <section className="page__section user">
        <div className="container">
          <div className="user__wrapper">
            <button
              className="user__sign-out"
              onClick={onClickExit}
            >
              <img
                className="user__icon"
                src="./assets/icons/quit.svg"
                alt="icon"
              />
            </button>
  
            <div className="user__input-wrapper">
              <label className="user__label">
                First name
                <input
                  className="input"
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  disabled={!isChange}
                />
              </label>
        
              <label className="user__label">
                Email
                <input
                  className="input"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={!isChange}
                />
              </label>
    
              <label className="user__label">
                Password

                <div className="user__password__wrapper">
                  <input
                    className="input user__password"
                    type={isShowPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={!isChange}
                  />

                  <button onClick={onShowPassword}>
                    <img
                      className="user__password__icon"
                      src={isShowPassword ? "./assets/icons/eye.svg" : "./assets/icons/closed-eye.svg"}
                      alt="icon"
                    />
                  </button>
                </div>
              </label>
            </div>
  
            <div className="user__btns">
              {isChange
                ? (
                  <>
                    <button
                      className="btn"
                      onClick={onClickSave}
                    >
                      Save
                    </button>
    
                    <button
                      className="btn"
                      onClick={onCancel}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="btn"
                    onClick={() => setIsChange(true)}
                  >
                    Change
                  </button>
                )}
            </div>
          </div>
        </div>
      </section>

      {isLoading && <p>Loading...</p>}
    </>
  );
};

export default User;