import { Product, ViewMode } from "@/types/product";
import ProductItem from "./ProductItem";
import Spinner from "@/components/common/Spinner";

interface ProductListProps {
  products: Product[];
  viewMode: ViewMode;
  loading?: boolean;
}

const ProductList = ({
  products,
  viewMode,
  loading = false,
}: ProductListProps) => {
  if (loading) {
    return <Spinner message="상품을 불러오는 중..." />;
  }

  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">등록된 상품이 없습니다.</p>
      </div>
    );
  }

  return (
    <div
      className={`${
        viewMode === ViewMode.LIST
          ? "space-y-4"
          : "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      }`}
    >
      {products.map((product) => (
        <ProductItem key={product.id} product={product} viewMode={viewMode} />
      ))}
    </div>
  );
};

export default ProductList;
