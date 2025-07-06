import { storeToRefs } from 'pinia';
import { mainStore } from '../store/mainStore';
import { connectStore } from '../store/connectStore';
import { cookiesStore } from '../store/cookiesStore';
import { configUpdate } from './updateConfig';

export const DB = async (onUpdate) => {
    if (localStorage.getItem('kiboard')) localStorage.clear()
    if (localStorage.getItem('kicookies')) return
    
    const store = mainStore()
    const {preferredConfigs} = storeToRefs(store)
    
    const cookies = cookiesStore()
    const {saveConfigs} = storeToRefs(cookies)

    const connect = connectStore()
    const {connectionAvailable, isConnectingServer, connectionStrength, loadingTimeout, showConnectionStrength} = storeToRefs(connect)

    if (onUpdate) connectionAvailable.value = true

    if (localStorage.getItem('kiboardID')) {
        isConnectingServer.value = onUpdate ? false : true
        saveConfigs.value = true

        setTimeout(() => {
            if (!preferredConfigs.value) {
                loadingTimeout.value = true
                isConnectingServer.value = false
                showConnectionStrength.value = true
                connectionStrength.value = 'Slow connection'
            }
        }, 6000)

        configUpdate()
    } else isConnectingServer.value = false
}











