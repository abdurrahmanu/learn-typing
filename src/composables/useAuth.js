import { auth, provider } from '../firebase';
import { signInWithPopup, signOut, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { authStore } from '../store/authStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { isMobile } from './isMobile';

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

    } catch (err){console.log('sfsasd')}
  }

  const logout = async () => {
    await signOut(auth);
  };

  return {
    loginWithGoogle,
    logout,
  };
}
