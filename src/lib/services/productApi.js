export async function getProductById(productId) {
  const res = await fetch(
    `https://panda-market-api.vercel.app/products/${productId}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`상품 ${productId}의 정보를 가져오는데 실패했습니다`);
  }

  const data = await res.json();
  return data;
}
