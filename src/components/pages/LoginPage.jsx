"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const router = useRouter();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
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
    if (!values.email || !values.password) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await login(values.name, values.password);

      alert("로그인 성공");
      router.push("/");
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
      <Link href="/login">
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
        <h3 className="font-bold mt-10 text-lg">이메일</h3>
        <input
          name="email"
          type="email"
          value={values.email}
          className="bg-gray-100 rounded-lg w-full max-w-[640px] mt-5 mb-5 px-5 py-4"
          placeholder="이메일을 입력해주세요"
          value={values.email}
          onChange={handleChange}
        />
        <h3 className="font-bold text-lg">비밀번호</h3>
        <div className="relative w-full max-w-[640px]">
          <input
            name="password"
            value={values.password}
            type={showPassword ? "text" : "password"}
            className="bg-gray-100 rounded-lg w-full max-w-[640px] mt-5 mb-5 px-5 py-4 relative"
            placeholder="비밀번호를 입력해주세요"
            value={values.password}
            onChange={handleChange}
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
      </div>
      <button className="bg-gray-400 text-white rounded-3xl w-full max-w-[640px] py-4 mb-5 font-bold">
        로그인
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
        <span>아직 회원이 아니신가요?</span>
        <Link href="/register" className="underline text-blue-500">
          회원가입
        </Link>
      </div>
    </form>
  );
}
