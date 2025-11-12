"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const togglePasswordRepeat = () => {
    setShowPasswordRepeat((prev) => !prev);
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !values.name ||
      !values.email ||
      !values.password ||
      !values.passwordRepeat
    ) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    if (values.password !== values.passwordRepeat) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await register(values.name, values.email, values.password);

      alert("회원가입 성공");
      router.push("/login");
    } catch (error) {
      setError(error.message || "회원가입 실패");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className=" flex flex-col items-center justify-center w-full p-4"
    >
      <Link href="/register">
        <div
          className={`mt-10 text-5xl font-[700] flex sm:flex-row md:flex-row items-center justify-center gap-3 text-[#3692FF] font-[family-name:var(--font-rokaf-sans)]`}
        >
          <Image
            src="/panda_large.png"
            alt="panda_large"
            width={100}
            height={100}
          />
          판다마켓
        </div>
      </Link>
      <div className="flex flex-col w-full max-w-[640px]">
        <label className="font-bold mt-10 text-lg">이메일</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          className="bg-gray-100 rounded-lg w-full max-w-[640px] mt-5 mb-5 px-5 py-4"
          placeholder="이메일을 입력해주세요"
        />
        <label className="font-bold text-lg">닉네임</label>
        <input
          value={values.name}
          name="name"
          onChange={handleChange}
          className="bg-gray-100 rounded-lg w-full max-w-[640px] mt-5 mb-5 px-5 py-4"
          placeholder="닉네임을 입력해주세요"
        />
        <label className="font-bold text-lg">비밀번호</label>
        <div className="relative w-full max-w-[640px]">
          <input
            value={values.password}
            name="password"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            className="bg-gray-100 rounded-lg w-full max-w-[640px] mt-5 mb-5 px-5 py-4 relative"
            placeholder="비밀번호를 입력해주세요"
          />
          {showPassword ? (
            <Image
              onClick={togglePassword}
              src="/btn_visibility_on.png"
              alt="btn_visibility"
              width={20}
              height={20}
              className="absolute top-1/2 right-7 transform -translate-y-1/2 cursor-pointer"
            />
          ) : (
            <Image
              onClick={togglePassword}
              src="/btn_visibility.png"
              alt="btn_visibility"
              width={20}
              height={20}
              className="absolute top-1/2 right-7 transform -translate-y-1/2 cursor-pointer"
            />
          )}
        </div>
        <label className="font-bold text-lg">비밀번호 확인</label>
        <div className="relative w-full max-w-[640px]">
          <input
            value={values.passwordRepeat}
            name="passwordRepeat"
            type={showPasswordRepeat ? "text" : "password"}
            onChange={handleChange}
            className="bg-gray-100 rounded-lg w-full max-w-[640px] mt-5 mb-5 px-5 py-4 relative"
            placeholder="비밀번호를 다시 한 번 입력해주세요"
          />
          {showPasswordRepeat ? (
            <Image
              onClick={togglePasswordRepeat}
              src="/btn_visibility_on.png"
              alt="google"
              width={20}
              height={20}
              className="absolute top-1/2 right-7 transform -translate-y-1/2 cursor-pointer"
            />
          ) : (
            <Image
              onClick={togglePasswordRepeat}
              src="/btn_visibility.png"
              alt="google"
              width={20}
              height={20}
              className="absolute top-1/2 right-7 transform -translate-y-1/2 cursor-pointer"
            />
          )}
        </div>
      </div>
      <button className="bg-gray-400 text-white rounded-3xl w-full max-w-[640px] py-4 mb-5 font-bold">
        회원가입
      </button>
      {error && <p className="text-red-500 font-semibold mt-3 mb-5">{error}</p>}
      <div className="flex justify-between items-center bg-[#E6F2FF] rounded-lg p-2 px-5 py-5 w-full max-w-[640px]">
        <span>간편 로그인하기</span>
        <div className="flex gap-2">
          <Link href="https://www.google.com">
            <Image src="/ic_google.png" alt="google" width={40} height={40} />{" "}
          </Link>
          <Link href="https://www.kakaocorp.com/page">
            <Image src="/ic_kakao.png" alt="kakao" width={40} height={40} />
          </Link>
        </div>
      </div>
      <div className="flex mt-10 mb-60 gap-2">
        <span>이미 회원이신가요?</span>
        <Link href="/login" className="underline text-blue-500">
          로그인
        </Link>
      </div>
    </form>
  );
}
