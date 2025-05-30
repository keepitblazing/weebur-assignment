import { Product, ViewMode } from "@/types/product";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";

interface ProductItemProps {
  product: Product;
  viewMode: ViewMode;
}

const ProductItem = ({ product, viewMode }: ProductItemProps) => {
  const { title, description, thumbnail, rating, reviews } = product;

  if (viewMode === ViewMode.LIST) {
    return (
      <div className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
        <div className="flex-shrink-0">
          <Image
            src={thumbnail}
            width={500}
            height={500}
            alt={title}
            className="h-24 w-24 rounded-md object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
          <p className="mb-3 line-clamp-2 text-sm text-gray-600">
            {description}
          </p>
          <div className="flex items-center gap-2">
            <Stars rating={rating} />
            <RatingInfo rating={rating} reviewCount={reviews.length} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="aspect-square">
        <Image
          src={thumbnail}
          alt={title}
          width={500}
          height={500}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-gray-900">
          {title}
        </h3>
        <p className="mb-3 line-clamp-2 text-sm text-gray-600">{description}</p>
        <div className="flex flex-col gap-1">
          <Stars rating={rating} />
          <RatingInfo rating={rating} reviewCount={reviews.length} />
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

const Stars = ({ rating }: { rating: number }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FontAwesomeIcon
        icon={faStar}
        key={`full-${i}`}
        className="text-yellow-400"
      />,
    );
  }

  if (hasHalfStar) {
    stars.push(
      <FontAwesomeIcon
        icon={faStarHalfStroke}
        key="half"
        className="text-yellow-400"
      />,
    );
  }

  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FontAwesomeIcon
        icon={faStar}
        key={`empty-${i}`}
        className="text-gray-300"
      />,
    );
  }

  return <div className="flex items-center">{stars}</div>;
};

interface RatingInfoProps {
  rating: number;
  reviewCount: number;
}

const RatingInfo = ({ rating, reviewCount }: RatingInfoProps) => {
  return (
    <span className="text-sm text-gray-500">
      {rating.toFixed(1)} ({reviewCount}개의 리뷰)
    </span>
  );
};
