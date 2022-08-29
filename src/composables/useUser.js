import {useRouter} from 'vue-router';
import {auth, firebase} from '../firebase'

export const useUser = () => {

    const router = useRouter()

    const signIn = async () =>{
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            await auth.signInWithPopup(provider)
            router.push('/crud')
        } catch (error) {
            console.log(error)
        }
    }

    const signOut = async () =>{
        try {
            await auth.signOut()
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    return {signIn, signOut}

};
