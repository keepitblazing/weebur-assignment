import { useState, useEffect } from "react";
import { AddProductRequestBody, BrandType } from "@/types/product";
import {
  InputField,
  TextareaField,
  SelectField,
} from "@/components/form/FormField";
import Button from "@/components/common/Button";

interface ProductFormProps {
  onSubmit: (data: AddProductRequestBody) => Promise<void>;
  loading?: boolean;
}

interface FormErrors {
  title?: string;
  price?: string;
  discountPercentage?: string;
  brand?: string;
}

interface FormData {
  title: string;
  description: string;
  price: string;
  discountPercentage: string;
  brand: BrandType | "";
}

const ProductForm = ({ onSubmit }: ProductFormProps) => {
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
  const brandOptions = brands.map((brand) => ({ value: brand, label: brand }));

  useEffect(() => {
    const price = Number(formData.price) || 0;
    const discount = Number(formData.discountPercentage) || 0;
    const calculated = price - (price * discount) / 100;
    setFinalPrice(calculated);
  }, [formData.price, formData.discountPercentage]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "상품명을 입력해주세요.";
    } else if (formData.title.length > 15) {
      newErrors.title = "상품명은 15자 이내로 입력해주세요.";
    }

    const price = Number(formData.price);
    if (!formData.price) {
      newErrors.price = "가격을 입력해주세요.";
    } else if (price < 1000) {
      newErrors.price = "가격은 1000원 이상으로 입력해주세요.";
    }

    if (formData.discountPercentage) {
      const discount = Number(formData.discountPercentage);
      if (discount < 0 || discount > 100) {
        newErrors.discountPercentage =
          "할인율은 0~100 사이의 값으로 입력해주세요.";
      }
    }

    if (!formData.brand) {
      newErrors.brand = "브랜드를 선택해주세요.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    let newValue = value;

    if (field === "price" || field === "discountPercentage") {
      newValue = value.replace(/[^0-9]/g, "");

      if (field === "discountPercentage") {
        const numeric = Number(newValue);
        if (numeric < 0 || numeric > 100) return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [field]: newValue,
    }));

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
      price: Number(formData.price),
      brand: formData.brand as BrandType,
    };

    if (formData.discountPercentage) {
      submitData.discountPercentage = Number(formData.discountPercentage);
    }

    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputField
        id="title"
        label="상품명"
        value={formData.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
        placeholder="상품명을 입력해주세요. (15자 이내)"
        maxLength={15}
        suffix={
          <span className="text-sm text-gray-500">
            {formData.title.length}/15
          </span>
        }
        required
        error={errors.title}
      />
      <TextareaField
        id="description"
        label="상품설명"
        value={formData.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
        rows={4}
        placeholder="상품에 대한 설명을 입력해주세요."
      />
      <InputField
        id="price"
        label="가격"
        type="text"
        value={Number(formData.price || "0").toLocaleString()}
        onChange={(e) => handleInputChange("price", e.target.value)}
        placeholder="1000"
        min="1000"
        suffix="원"
        required
        error={errors.price}
      />
      <InputField
        id="discountPercentage"
        label="할인율"
        type="text"
        value={formData.discountPercentage}
        onChange={(e) =>
          handleInputChange("discountPercentage", e.target.value)
        }
        placeholder="0"
        maxLength={3}
        suffix="%"
        error={errors.discountPercentage}
      />
      <SelectField
        id="brand"
        label="브랜드"
        value={formData.brand}
        onChange={(e) => handleInputChange("brand", e.target.value)}
        options={brandOptions}
        placeholder="브랜드를 선택해주세요."
        required
        error={errors.brand}
      />
      <div className="rounded-md bg-blue-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-blue-900">최종 가격</span>
          <span className="text-lg font-bold text-blue-900">
            {finalPrice.toLocaleString()}원
          </span>
        </div>
        {formData.discountPercentage &&
          Number(formData.discountPercentage) > 0 && (
            <div className="mt-1 text-xs text-blue-700">
              원가 {Number(formData.price).toLocaleString()}원에서{" "}
              {formData.discountPercentage}% 할인
            </div>
          )}
      </div>
      <p>
        <span className="text-red-500">* 표시는 필수 입력 필드입니다.</span>
      </p>
      <Button type="submit" className="w-full">
        상품 생성
      </Button>
    </form>
  );
};

export default ProductForm;
