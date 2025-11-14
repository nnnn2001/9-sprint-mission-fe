import { defaultFetch, cookieFetch } from "./fetchClient";

export const authService = {
  // 쿠키 인증을 사용하는 로그인
  login: (email, password) =>
    cookieFetch("/auth/signIn", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  // 회원가입
  register: (nickname, email, password) =>
    defaultFetch("/auth/signUp", {
      method: "POST",
      body: JSON.stringify({
        email,
        nickname,
        password,
        passwordConfirmation: password,
      }),
      cache: "no-store",
    }),

  // 로그아웃
  logout: () => cookieFetch("/auth/logout", { method: "DELETE" }),
};
