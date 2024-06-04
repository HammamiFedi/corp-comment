import { ErrorMessageProps } from "./ErrorMessage.type";

function ErrorMessage({ message }: ErrorMessageProps) {
  return <div className="feedback-list--error">{message}</div>;
}

export default ErrorMessage;
