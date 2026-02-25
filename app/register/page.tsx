import { Header } from "@/components/ui/Header";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 flex flex-col items-center justify-center p-spacing-lg">
        <RegisterForm />
      </main>
    </div>
  );
}
