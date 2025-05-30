import React from "react";
import { useRouter } from "next/router";
import { AddProductRequestBody } from "@/types/product";
import { useProducts } from "@/hooks/useProducts";
import ProductForm from "@/components/product/ProductForm";
import ErrorMessage from "@/components/common/ErrorMessage";
import SuccessMessage from "@/components/common/SuccessMessage";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const NewProductPage = () => {
  const router = useRouter();

  const { createProduct } = useProducts();

  const handleRouteProducts = () => {
    router.push("/products");
  };

  const handleSubmit = async (data: AddProductRequestBody) => {
    await createProduct.mutateAsync(data);
    setTimeout(handleRouteProducts, 1000);
  };

  if (createProduct.isSuccess) {
    return (
      <SuccessMessage
        title="상품 생성 완료!"
        message="상품이 성공적으로 생성되었습니다."
        subtitle="잠시 후 상품 목록으로 이동합니다..."
      />
    );
  }

  return (
    <>
      <Header
        title="새 상품 등록"
        action={
          <Button
            onClick={handleRouteProducts}
            icon={faArrowLeft}
            variant="secondary"
          >
            목록으로 돌아가기
          </Button>
        }
      />
      {createProduct.error && (
        <ErrorMessage
          error={createProduct.error.message || "상품 생성에 실패했습니다."}
        />
      )}
      <div className="rounded-lg bg-white shadow">
        <div className="px-6 py-8">
          <ProductForm
            onSubmit={handleSubmit}
            loading={createProduct.isPending}
          />
        </div>
      </div>
    </>
  );
};

export default NewProductPage;
