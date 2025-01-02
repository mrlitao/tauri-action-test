import { useStorage } from '@vueuse/core'
// apis
import tauriHttp from "@/utils/http/tauri-http.ts";
export const userInfo = {}

export const getUserInfo = () => {
    return userInfo
}

export const loginState = useStorage('login', {
    notSignedIn: true,
    isSignIn: false,
    accessToken: '',
    expires: '',
    refreshToken: '',
    tokenType: '',
})
export const login = (params: Record<'username' | 'password', string>) => {
    return new Promise((resolve, reject) => {
        tauriHttp.post('/login', params).catch(reject)
            .then((response: any) => {
                console.log({ response });
                loginState.value = response
                loginState.value.isSignIn = true
                loginState.value.notSignedIn = false
                resolve(response)
            })
    })
}