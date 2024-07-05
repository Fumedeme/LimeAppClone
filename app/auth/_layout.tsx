import { Redirect, Slot } from 'expo-router';
import { useAuth } from '~/providers/authProvider';

export default function AuthLayout() {
  const { isAuthed } = useAuth();

  if (isAuthed) {
    return <Redirect href={'/'} />;
  }

  return <Slot />;
}
