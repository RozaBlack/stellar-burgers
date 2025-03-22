import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';

import { useDispatch } from '../../services/store';
import { registerUser } from '../../services/slices/user';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const res = await dispatch(
        registerUser({ email, name: userName, password })
      ).unwrap();
      if (res.success) {
        return navigate('/');
      }
    } catch (_) {}
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
