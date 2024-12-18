import { storeToRefs } from 'pinia';
import { mainStore } from '../store/mainStore';
import { connectStore } from '../store/connectStore';
import { cookiesStore } from '../store/cookiesStore';
import { configUpdate } from './updateConfig';

export const DB = async (onUpdate) => {
    if (localStorage.getItem('kiboard')) localStorage.clear()
    if (localStorage.getItem('kicookies')) return
    
    const main = mainStore()
    const {preferredConfigs} = storeToRefs(main)
    
    const cookies = cookiesStore()
    const {saveConfigs} = storeToRefs(cookies)

    const connect = connectStore()
    const {hasInternetConnection, connectingServer, connectionStrength, loadingTimeout, showConnectionStrength} = storeToRefs(connect)

    if (onUpdate) hasInternetConnection.value = true

    if (localStorage.getItem('kiboardID')) {
        connectingServer.value = onUpdate ? false : true
        saveConfigs.value = true

        setTimeout(() => {
            if (!preferredConfigs.value) {
                loadingTimeout.value = true
                connectingServer.value = false
                showConnectionStrength.value = true
                connectionStrength.value = 'Slow connection'
            }
        }, 6000)

        configUpdate()
    } else connectingServer.value = false
}











