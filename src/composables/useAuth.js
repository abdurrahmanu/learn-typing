import { auth } from '../firebase';
import { signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { authStore } from '../store/authStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { mainStore } from '../store/mainStore';
import { addSingleDoc, getSingleDoc } from './firestoreDocs';

export function useAuth() {
  const router = useRouter()

  const authstore = authStore()
  const {login, user} = storeToRefs(authstore)

  const mainstore = mainStore()
  const {route} = storeToRefs(mainstore)

  const loginWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();

      if (route.value === 'user') {
        provider.setCustomParameters({
          prompt: 'select_account'
        });
      }

      const result = await signInWithPopup(auth, provider)
      user.value = result.user;
      
      if (user.value?.emailVerified) {
        login.value = true

        let userExists = getSingleDoc(user.value.uid)
        if (userExists) {
          updateConfig()
        } else {
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
