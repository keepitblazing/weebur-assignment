import { useState, useEffect } from "react";
import { AddProductRequestBody, BrandType } from "@/types/product";

interface ProductFormProps {
  onSubmit: (data: AddProductRequestBody) => Promise<void>;
  loading?: boolean;
}

interface FormData {
  title: string;
  description: string;
  price: string;
  discountPercentage: string;
  brand: BrandType | "";
}

interface FormErrors {
  title?: string;
  price?: string;
  discountPercentage?: string;
  brand?: string;
}

export default function ProductForm({
  onSubmit,
  loading = false,
}: ProductFormProps) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    brand: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [finalPrice, setFinalPrice] = useState<number>(0);

  const brands: BrandType[] = ["Apple", "Samsung", "Weebur"];

  // 최종 가격 계산
  useEffect(() => {
    const price = parseFloat(formData.price) || 0;
    const discount = parseFloat(formData.discountPercentage) || 0;
    const calculated = price - (price * discount) / 100;
    setFinalPrice(calculated);
  }, [formData.price, formData.discountPercentage]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // title 검증
    if (!formData.title.trim()) {
      newErrors.title = "상품명을 입력해주세요.";
    } else if (formData.title.length > 15) {
      newErrors.title = "상품명은 15자 이내로 입력해주세요.";
    }

    // price 검증
    const price = parseFloat(formData.price);
    if (!formData.price || isNaN(price)) {
      newErrors.price = "가격을 입력해주세요.";
    } else if (price < 1000) {
      newErrors.price = "가격은 1000원 이상이어야 합니다.";
    }

    // discountPercentage 검증
    if (formData.discountPercentage) {
      const discount = parseFloat(formData.discountPercentage);
      if (isNaN(discount) || discount < 0 || discount > 100) {
        newErrors.discountPercentage = "할인율은 0-100 사이의 값이어야 합니다.";
      }
    }

    // brand 검증
    if (!formData.brand) {
      newErrors.brand = "브랜드를 선택해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // 해당 필드의 에러 제거
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submitData: AddProductRequestBody = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price),
      brand: formData.brand as BrandType,
    };

    if (formData.discountPercentage) {
      submitData.discountPercentage = parseFloat(formData.discountPercentage);
    }

    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 상품명 */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          상품명 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="상품명을 입력하세요 (15자 이내)"
          maxLength={15}
        />
        <div className="mt-1 text-xs text-gray-500">
          {formData.title.length}/15자
        </div>
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      {/* 상품설명 */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          상품설명
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="상품에 대한 설명을 입력하세요"
        />
      </div>

      {/* 가격 */}
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          가격 <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="number"
            id="price"
            value={formData.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
            className={`w-full px-3 py-2 pr-8 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.price ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="1000"
            min="1000"
          />
          <span className="absolute right-3 top-2 text-gray-500">원</span>
        </div>
        {errors.price && (
          <p className="mt-1 text-sm text-red-600">{errors.price}</p>
        )}
      </div>

      {/* 할인율 */}
      <div>
        <label
          htmlFor="discountPercentage"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          할인율
        </label>
        <div className="relative">
          <input
            type="number"
            id="discountPercentage"
            value={formData.discountPercentage}
            onChange={(e) =>
              handleInputChange("discountPercentage", e.target.value)
            }
            className={`w-full px-3 py-2 pr-8 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.discountPercentage ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="0"
            min="0"
            max="100"
          />
          <span className="absolute right-3 top-2 text-gray-500">%</span>
        </div>
        {errors.discountPercentage && (
          <p className="mt-1 text-sm text-red-600">
            {errors.discountPercentage}
          </p>
        )}
      </div>

      {/* 브랜드 */}
      <div>
        <label
          htmlFor="brand"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          브랜드 <span className="text-red-500">*</span>
        </label>
        <select
          id="brand"
          value={formData.brand}
          onChange={(e) => handleInputChange("brand", e.target.value)}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.brand ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">브랜드를 선택하세요</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
        {errors.brand && (
          <p className="mt-1 text-sm text-red-600">{errors.brand}</p>
        )}
      </div>

      {/* 최종 가격 표시 */}
      {formData.price && !isNaN(parseFloat(formData.price)) && (
        <div className="bg-blue-50 p-4 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-blue-900">최종 가격</span>
            <span className="text-lg font-bold text-blue-900">
              {finalPrice.toLocaleString()}원
            </span>
          </div>
          {formData.discountPercentage &&
            parseFloat(formData.discountPercentage) > 0 && (
              <div className="text-xs text-blue-700 mt-1">
                원가 {parseFloat(formData.price).toLocaleString()}원에서{" "}
                {formData.discountPercentage}% 할인
              </div>
            )}
        </div>
      )}
      <p>
        <span className="text-red-500">*</span>
        <span className="text-sm text-gray-500">
          표시는 필수 입력 필드입니다.
        </span>
      </p>
      {/* 제출 버튼 */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              생성 중...
            </div>
          ) : (
            "상품 생성"
          )}
        </button>
      </div>
    </form>
  );
}
