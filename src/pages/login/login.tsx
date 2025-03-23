import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';
import {
  loginUser,
  getLoginErrorMessageSelector
} from '../../services/slices/user';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../utils/cookie';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errorText = useSelector(getLoginErrorMessageSelector);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const res = await dispatch(loginUser({ email, password })).unwrap();
      if (res.success) {
        return navigate('/');
      }
    } catch (_) {}
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
