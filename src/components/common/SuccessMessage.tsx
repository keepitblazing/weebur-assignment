import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface SuccessMessageProps {
  title: string;
  message: string;
  subtitle?: string;
}

const SuccessMessage = ({ title, message, subtitle }: SuccessMessageProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="mx-auto max-w-md text-center">
        <div className="rounded-lg bg-white p-8 shadow-md">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <FontAwesomeIcon icon={faCheck} className="text-green-600" />
          </div>
          <h2 className="mb-2 text-xl font-bold text-gray-900">{title}</h2>
          <p className="mb-4 text-gray-600">{message}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
