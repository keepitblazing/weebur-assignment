import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Product, ViewMode } from "@/types/product";
import { fetchProducts } from "@/libs/apis/product";
import { getOrGenerateViewMode } from "@/libs/utils/viewMode";
import ProductList from "@/components/product/ProductList";
import ErrorMessage from "@/components/common/ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  useEffect(() => {
    const mode = getOrGenerateViewMode();
    setViewMode(mode);
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProduct = await fetchProducts({ limit: 20 });
        setProducts(fetchedProduct.products);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "상품을 불러오는데 실패했습니다."
        );
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleRouteCreateProduct = () => {
    router.push("/products/new");
  };

  return (
    <>
      <Head>
        <title>상품 목록</title>
        <meta name="description" content="다양한 상품들을 둘러보세요" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 헤더 */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">상품 목록</h1>
              <button
                onClick={handleRouteCreateProduct}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                상품 생성
              </button>
            </div>
          </div>
          {/* 에러 메시지 */}
          {error && <ErrorMessage error={error} />}
          {/* 상품 리스트 */}
          <ProductList
            products={products}
            viewMode={viewMode}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
}
