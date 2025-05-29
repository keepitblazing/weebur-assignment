import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function ErrorMessage({ error }: { error: string }) {
  return (
    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
      <div className="flex">
        <div className="flex-shrink-0 border-2 rounded-full w-6 h-6 flex items-center justify-center border-red-500">
          <FontAwesomeIcon
            icon={faX}
            className="text-red-500 text-sm text-bold"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </div>
    </div>
  );
}
