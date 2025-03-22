import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';

import { useDispatch } from '../../services/store';
import { loginUser } from '../../services/slices/user';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../utils/cookie';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await dispatch(loginUser({ email, password }))
        .unwrap()
        .then((payload) => {
          setCookie('accessToken', payload.accessToken);
          localStorage.setItem('refreshToken', payload.refreshToken);
          if (payload.success) {
            return navigate('/');
          }
        });
    } catch (_) {}
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
