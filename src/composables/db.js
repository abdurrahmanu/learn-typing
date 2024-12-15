import { storeToRefs } from 'pinia';
import {customizeStore} from '../store/customizeStore'
import { mainStore } from '../store/mainStore';
import { connectStore } from '../store/connectStore';
import { doc, getDoc } from 'firebase/firestore'
import { configUpdate } from './updateConfig';
import { collection, onSnapshot, where, query } from "firebase/firestore"; 
import {db} from '../firebase'
import {ref} from 'vue'

// if !update arg then it is onmount
export const DB = async (update) => {
    const main = mainStore()
    const {preferredConfigs} = storeToRefs(main)
    
    const connect = connectStore()
    const {hasInternetConnection, connectingServer, connectionStrength, showConnectionStrength} = storeToRefs(connect)

    const customize = customizeStore()
    const { cookies_ } = storeToRefs(customize)

    const getSingleDoc = async (ID) => {
        let user = doc(db, "user", ID )
        return await getDoc(user).then((data) => data.exists() ? data.data() : false )
    }

    if (!update) {
        if (hasInternetConnection.value) connectingServer.value = true
        else {
            connectingServer.value = false
            preferredConfigs.value = await getSingleDoc(localStorage.getItem('kiboardID'))

            configUpdate()
            return
        }
    }

    if (localStorage.getItem('kiboard')) localStorage.clear()
    if (localStorage.getItem('kicookies')) {
        connectingServer.value = false
        return
    }

    if (localStorage.getItem('kiboardID')) {
        cookies_.value = true
        let timedOut = ref(false)

        setTimeout(() => {
            if (!preferredConfigs.value) {
                timedOut.value = true
                connectingServer.value = false
                showConnectionStrength.value = true
                connectionStrength.value = 'unable to connect'
            }
        }, 6000);

        preferredConfigs.value = await getSingleDoc(localStorage.getItem('kiboardID'))

        if (!timedOut.value) {
            if (update && preferredConfigs.value) {
                // Not standard... 
                showConnectionStrength.value = true
                connectionStrength.value = 'connected'
            }
    
            if (!preferredConfigs.value) {
                connectingServer.value = false
                showConnectionStrength.value = true
                connectionStrength.value = 'connection is not strong'
                return
            }

            configUpdate()
        }
    } else connectingServer.value = false
}
