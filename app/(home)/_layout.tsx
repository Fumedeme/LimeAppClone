import { Redirect, Slot } from 'expo-router';
import { useAuth } from '~/providers/authProvider';

export default function HomeLayout() {
  const { isAuthed } = useAuth();

  if (!isAuthed) {
    return <Redirect href={'/auth'} />;
  }

  return <Slot />;
}
