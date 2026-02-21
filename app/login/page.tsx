import { Header } from "@/components/ui/Header";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 flex flex-col items-center justify-center p-spacing-lg">
        <LoginForm />
      </main>
    </div>
  );
}
