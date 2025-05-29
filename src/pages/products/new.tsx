import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { AddProductRequestBody } from "@/types/product";
import { createProduct } from "@/libs/apis/product";
import ProductForm from "@/components/product/ProductForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import ErrorMessage from "@/components/common/ErrorMessage";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleGoBack = () => {
    router.push("/products");
  };

  const handleSubmit = async (data: AddProductRequestBody) => {
    try {
      setLoading(true);
      setError(null);
      await createProduct(data);
      setSuccess(true);
      setTimeout(() => {
        router.push("/products");
      }, 1000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "상품 생성에 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <>
        <Head>
          <title>상품 생성 완료</title>
        </Head>

        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faCheck} className="text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                상품 생성 완료!
              </h2>
              <p className="text-gray-600 mb-4">
                상품이 성공적으로 생성되었습니다.
              </p>
              <p className="text-sm text-gray-500">
                잠시 후 상품 목록으로 이동합니다...
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>새 상품 등록</title>
        <meta name="description" content="새로운 상품을 등록하세요" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 헤더 */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  새 상품 등록
                </h1>
                <p className="mt-2 text-gray-600">
                  새로운 상품 정보를 입력해주세요
                </p>
              </div>

              <button
                onClick={handleGoBack}
                className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                목록으로 돌아가기
              </button>
            </div>
          </div>

          {/* 에러 메시지 */}
          {error && <ErrorMessage error={error} />}
          {/* 폼 영역 */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-8">
              <ProductForm onSubmit={handleSubmit} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
