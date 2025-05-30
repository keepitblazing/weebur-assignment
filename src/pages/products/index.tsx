import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { ViewMode } from "@/types/product";
import { getOrGenerateViewMode } from "@/libs/utils/viewMode";
import ProductList from "@/components/product/ProductList";
import ErrorMessage from "@/components/common/ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useProducts } from "@/hooks/useProducts";

export default function ProductsPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const { data, isLoading, error } = useProducts({ limit: 20 });

  useEffect(() => {
    const mode = getOrGenerateViewMode();
    setViewMode(mode);
  }, []);

  const handleRouteCreateProduct = () => {
    router.push("/products/new");
  };

  const products = data?.products || [];
  const errorMessage = error?.message || null;

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
              <button onClick={handleRouteCreateProduct}>
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                상품 생성
              </button>
            </div>
          </div>
          {/* 에러 메시지 */}
          {errorMessage && <ErrorMessage error={errorMessage} />}
          {/* 상품 리스트 */}
          <ProductList
            products={products}
            viewMode={viewMode}
            loading={isLoading}
          />
        </div>
      </div>
    </>
  );
}
