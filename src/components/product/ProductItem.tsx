import { Product, ViewMode } from "@/types/product";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";

interface ProductItemProps {
  product: Product;
  viewMode: ViewMode;
}

export default function ProductItem({ product, viewMode }: ProductItemProps) {
  const { title, description, thumbnail, rating, reviews } = product;
  console.log(product);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon
          icon={faStar}
          key={`full-${i}`}
          className="text-yellow-400"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FontAwesomeIcon
          icon={faStarHalfStroke}
          key="half"
          className="text-yellow-400"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesomeIcon
          icon={faStar}
          key={`empty-${i}`}
          className="text-gray-300"
        />
      );
    }

    return stars;
  };

  if (viewMode === "list") {
    return (
      <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex-shrink-0">
          <Image
            src={thumbnail}
            width={500}
            height={500}
            alt={title}
            className="w-24 h-24 object-cover rounded-md"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center gap-2">
            <div className="flex items-center">{renderStars(rating)}</div>
            <span className="text-sm text-gray-500">
              {rating.toFixed(1)} ({reviews.length} 리뷰)
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden">
      <div className="aspect-square">
        <Image
          src={thumbnail}
          alt={title}
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        <div className="flex flex-col gap-1">
          <div className="flex items-center">{renderStars(rating)}</div>
          <span className="text-sm text-gray-500">
            {rating.toFixed(1)} ({reviews.length} 리뷰)
          </span>
        </div>
      </div>
    </div>
  );
}
