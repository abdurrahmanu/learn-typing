import { auth } from '../firebase';
import { signInWithPopup, signOut, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { authStore } from '../store/authStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { mainStore } from '../store/mainStore';
import { isMobile } from './isMobile';
import { connectStore } from '../store/connectStore';

export function useAuth() {
  const router = useRouter()

  const authstore = authStore()
  const {result} = storeToRefs(authstore)

  const connectstore = connectStore()
  const {loadingApp} = storeToRefs(connectstore)

  const loginWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();

        provider.setCustomParameters({
            prompt: 'select_account'
        });
      
        if (isMobile()) {
          signInWithRedirect(auth, provider)
          result.value = await getRedirectResult(auth)
        } 
        
        else {
        result.value = await signInWithPopup(auth, provider)
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
