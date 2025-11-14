"use client";
import { getProductById } from "@/lib/services/productApi";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ProductPage({ productId, products }) {
  const [product, setProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("productId:", productId);
    console.log("product data:", products);
    async function fetchProduct() {
      try {
        const data = await getProductById(productId);
        setProduct(data);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchProduct();
  }, [productId]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (loading) return <div>로딩중...</div>;

  if (!product) {
    return <div>상품 정보를 불러오는 중...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center mt-10 mb-20">
      <div className="flex justify-between items-center gap-10">
        <div>
          <Image
            src={product.images?.[0]}
            alt={product.name}
            width={400}
            height={400}
          />
        </div>
        <div>
          <div className="flex justify-between">
            <div>
              <p>{product.name}</p>
              <p className="font-bold text-4xl">{product.price}</p>
            </div>

            <div className="relative">
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="cursor-pointer"
              >
                ⋮
              </button>
              {open && (
                <div className="absolute top-6 right-0 border rounded-lg border-gray-300 text-gray-400 bg-white w-28 items-center justify-center flex flex-col gap-2">
                  <button className="px-3 py-2 block">수정하기</button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-2 block"
                  >
                    삭제하기
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="border-b border-gray-200 my-4"></div>
          <div className="text-gray-400 text-sm">
            <p>상품 소개</p>
            <p>{product.description}</p>
            <p> 상품 태그</p>
          </div>
          <div className="flex gap-5">
            <div className="flex gap-3 mt-4">
              {product.tags?.map((tag, index) => (
                <div
                  key={index}
                  className="bg-gray-200 rounded-2xl p-2 flex items-center justify-center"
                >
                  #{tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200 my-4"></div>
      <div>안녕하세요</div>
    </div>
  );
}
