import { auth } from '../firebase';
import { signInWithPopup, signOut, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';
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
        const provider = new GoogleAuthProvider();

        provider.setCustomParameters({
            prompt: 'select_account'
        });
      
        if (isMobile()) {
          await signInWithRedirect(auth, provider)
          data.value = await getRedirectResult(auth)
        } 
        
        else {
        await signInWithPopup(auth, provider)
      }

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
