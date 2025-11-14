import ProductPage from "@/components/pages/ProductPage";
import { getProductById } from "@/lib/services/productApi";

export default async function Product({ params }) {
  const { id } = await params;
  return <ProductPage productId={id} />;
}
