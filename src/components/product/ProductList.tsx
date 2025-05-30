import { Product, ViewMode } from "@/types/product";
import ProductItem from "./ProductItem";
import Spinner from "@/components/common/Spinner";

interface ProductListProps {
  products: Product[];
  viewMode: ViewMode;
  loading?: boolean;
}

export default function ProductList({
  products,
  viewMode,
  loading = false,
}: ProductListProps) {
  if (loading) {
    return <Spinner message="상품을 불러오는 중..." />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">등록된 상품이 없습니다.</p>
      </div>
    );
  }

  return (
    <div
      className={`${
        viewMode === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-4"
      }`}
    >
      {products.map((product) => (
        <ProductItem key={product.id} product={product} viewMode={viewMode} />
      ))}
    </div>
  );
}
