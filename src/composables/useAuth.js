import { auth } from '../firebase';
import { signInWithPopup, signOut, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { authStore } from '../store/authStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { mainStore } from '../store/mainStore';
import { addSingleDoc, getSingleDoc } from './firestoreDocs';
import { isMobile } from './isMobile';
import {ref} from 'vue'

export function useAuth() {
  const router = useRouter()

  const authstore = authStore()
  const {login, user, data} = storeToRefs(authstore)

  const mainstore = mainStore()
  const {route} = storeToRefs(mainstore)

  const loginWithGoogle = async () => {
    const result = ref(null)

    try {
        const provider = new GoogleAuthProvider();

        if (route.value === 'user') {
          provider.setCustomParameters({
              prompt: 'select_account'
          });
        }

        if (isMobile()) {
          signInWithRedirect(auth, provider)
          result.value = await getRedirectResult(auth)
        } 
        
        else {
        result.value = await signInWithPopup(auth, provider)
      }

      user.value = result.value.user;
      
      if (user.value?.emailVerified) {
        login.value = true
        let userExists = await getSingleDoc(user.value.uid)
        if (!userExists) {
          addSingleDoc(user.value.uid)
        }
      }

      if (user.value?.emailVerified && route.value === 'user') router.push('/')
      
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const logout = async () => {
    await signOut(auth);
    user.value = null;
  };

  return {
    loginWithGoogle,
    logout,
  };
}
