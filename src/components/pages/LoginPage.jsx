"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  return (
    <div className=" flex flex-col items-center justify-center w-full p-4">
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
      <div className="flex flex-col w-full max-w-[640px]">
        <h3 className="font-bold mt-10 text-lg">이메일</h3>
        <input
          name="email"
          type="email"
          className="bg-gray-100 rounded-lg w-full max-w-[640px] mt-5 mb-5 px-5 py-4"
          placeholder="이메일을 입력해주세요"
          value={values.email}
          onChange={handleChange}
        />
        <h3 className="font-bold text-lg">비밀번호</h3>
        <div className="relative w-full max-w-[640px]">
          <input
            name="password"
            type="password"
            className="bg-gray-100 rounded-lg w-full max-w-[640px] mt-5 mb-5 px-5 py-4 relative"
            placeholder="비밀번호를 입력해주세요"
            value={values.password}
            onChange={handleChange}
          />
          <Image
            src="/btn_visibility.png"
            alt="google"
            width={20}
            height={20}
            className="absolute top-1/2 right-7 transform -translate-y-1/2 cursor-pointer"
          />
        </div>
      </div>
      <button className="bg-gray-400 text-white rounded-3xl w-full max-w-[640px] py-4 mb-5 font-bold">
        로그인
      </button>
      <div className="flex justify-between items-center bg-[#E6F2FF] rounded-lg p-2 px-5 py-5 w-full max-w-[640px]">
        <span>간편 로그인하기</span>
        <div className="flex gap-2">
          <Image src="/ic_google.png" alt="google" width={40} height={40} />
          <Image src="/ic_kakao.png" alt="kakao" width={40} height={40} />
        </div>
      </div>
      <div className="flex mt-10 mb-60 gap-2">
        <span>아직 회원이 아니신가요?</span>
        <Link href="/register" className="underline text-blue-500">
          회원가입
        </Link>
      </div>
    </div>
  );
}
