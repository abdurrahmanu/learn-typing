import { auth } from '../firebase';
import { signInWithPopup, signOut, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { authStore } from '../store/authStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { mainStore } from '../store/mainStore';
import { addSingleDoc, getSingleDoc } from './firestoreDocs';
import { isMobile } from './isMobile';
import {ref} from 'vue'
import { updateConfig } from './updateConfig';

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

      if (isMobile()) {
        result.value = await signInWithRedirect(auth, provider)
        console.log('asdfasdf')
      } else {
        if (route.value === 'user') {
          provider.setCustomParameters({
            prompt: 'select_account'
          });
        }

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
