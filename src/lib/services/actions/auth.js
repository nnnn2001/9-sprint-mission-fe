"use server";

import { authService } from "../authService";

export async function registerAction(nickname, email, password) {
  console.log("회원가입 액션 실행");
  const userData = await authService.register(nickname, email, password);
  return userData;
}
