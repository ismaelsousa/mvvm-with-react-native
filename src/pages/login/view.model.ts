import {useState} from 'react';
import {Alert} from 'react-native';
import {login} from '../../repositories/auth.repository';
import {LoginViewModel} from './models';

const useLoginViewModel = (): LoginViewModel => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    console.log({email, password});
    try {
      setIsLoading(true);
      const response = await login({email, password});
      console.log(response);

      //TODO: navigate to home
    } catch (e) {
      console.log(e);
      Alert.alert('Oops!', 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Binding with the view.
   */
  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    onSubmit,
  };
};

export default useLoginViewModel;
