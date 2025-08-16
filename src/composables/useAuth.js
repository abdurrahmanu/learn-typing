import { auth, provider } from '../firebase';
import { signInWithPopup, signOut, signInWithRedirect, getRedirectResult } from 'firebase/auth';

export function useAuth() {
  const router = useRouter()

  const authstore = authStore()
  const {data} = storeToRefs(authstore)

  const loginWithGoogle = async () => {
    try {
        provider.setCustomParameters({
            prompt: 'select_account'
        });
      
      await signInWithPopup(auth, provider)
      router.push('/')

    } catch (err){
      
    }
  }

  const logout = async () => {
    await signOut(auth);
  };

  return {
    loginWithGoogle,
    logout,
  };
}
