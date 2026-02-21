import { AlertCircle } from "lucide-react";

type ErrorAlertProps = {
  error: string | null | undefined;
  name?: string;
};

export const ErrorFallback = ({ error, name }: ErrorAlertProps) => {
  if (!error) return null;

  return (
    <div
      role="alert"
      className="flex items-center justify-center text-center gap-2 p-4 rounded-default bg-[var(--destructive)]/10 border border-[var(--destructive)] text-typography-body text-foreground"
    >
      <div className=" flex items-start gap-3">
        <AlertCircle
          className="text-[var(--destructive)] shrink-0 mt-0.5"
          size={18}
          strokeWidth={2}
        />
        <div>
          {name && <strong>{name}: </strong>}
          {error}
        </div>
      </div>
    </div>
  );
};
