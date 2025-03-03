import { useStorage } from "@vueuse/core";
// apis
import tauriHttp from "@/utils/http/tauri-http.ts";

const initialState = () => ({
	notSignedIn: true,
	isSignIn: false,
	accessToken: "",
	expires: "",
	refreshToken: "",
	tokenType: "",
});

export const userInfo = {};

export const getUserInfo = () => {
	return userInfo;
};

export const loginState = useStorage("login", initialState());

export const login = (params: Record<"username" | "password", string>) => {
	return new Promise((resolve, reject) => {
		tauriHttp.post("/login", params).catch(reject)
				.then((response: any) => {
					console.log("--登录返回结果--", { response });
					loginState.value = response;
					loginState.value.isSignIn = true;
					loginState.value.notSignedIn = false;
					resolve(response);
				});
	});
};

export const logout = () => {
	loginState.value = initialState();
};