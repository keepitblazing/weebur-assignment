import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4">
      <div className="flex">
        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-red-500">
          <FontAwesomeIcon
            icon={faX}
            className="text-bold text-sm text-red-500"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
