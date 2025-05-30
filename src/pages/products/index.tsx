import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ViewMode, Product } from "@/types/product";
import { getViewMode } from "@/libs/utils/viewMode";
import { fetchProducts } from "@/libs/apis/product";
import ProductList from "@/components/product/ProductList";
import ErrorMessage from "@/components/common/ErrorMessage";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import { useProducts } from "@/hooks/useProducts";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const data = await fetchProducts({ limit: 20 });
    return {
      props: {
        initialProducts: data.products,
      },
    };
  } catch (error) {
    return {
      props: {
        initialProducts: [],
        error:
          error instanceof Error
            ? error.message
            : "상품을 불러오는데 실패했습니다.",
      },
    };
  }
};

interface ProductsPageProps {
  initialProducts: Product[];
  error?: string;
}

const ProductsPage = ({ initialProducts, error }: ProductsPageProps) => {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.LIST);

  const { data, isLoading, error: clientError } = useProducts({ limit: 20 });

  useEffect(() => {
    const mode = getViewMode();
    setViewMode(mode);
  }, []);

  const handleRouteCreateProduct = () => {
    router.push("/products/new");
  };

  const products = data?.products || initialProducts || [];
  const errorMessage = clientError?.message || error || null;

  return (
    <>
      <Header
        title="상품 목록"
        action={
          <Button onClick={handleRouteCreateProduct} icon={faPlus}>
            상품 생성
          </Button>
        }
      />
      {errorMessage && <ErrorMessage error={errorMessage} />}
      <ProductList
        products={products}
        viewMode={viewMode}
        loading={isLoading}
      />
    </>
  );
};

export default ProductsPage;
