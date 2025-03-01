import { createSignal, JSX } from 'solid-js';
import { useAuth } from '../../lib/auth.tsx';
import { cn } from '../../lib/utils.ts';
import { Button } from '../ui/button.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card.tsx';
import { Input } from '../ui/input.tsx';
import { Label } from '../ui/label.tsx';

type LoginFormProps = {
  className?: string;
} & JSX.HTMLAttributes<HTMLDivElement>;

export function LoginForm(props: LoginFormProps) {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [error, setError] = createSignal<string | null>(null);
  const { signIn, loading } = useAuth();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError(null);
    
    try {
      await signIn(email(), password());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // Implementation for Google sign-in would go here
      // This would typically call a method like signInWithGoogle() from your auth context
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with Google');
    }
  };

  return (
    <div class={cn("flex flex-col gap-6", props.className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {error() && (
              <div class="mb-4 p-2 text-sm text-red-500 bg-red-50 rounded">
                {error()}
              </div>
            )}
            <div class="flex flex-col gap-6">
              <div class="grid gap-3">
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email()}
                  onInput={(e: { currentTarget: HTMLInputElement }) => setEmail(e.currentTarget.value)}
                  required
                />
              </div>
              <div class="grid gap-3">
                <div class="flex items-center">
                  <Label for="password">Password</Label>
                  <a
                    href="#"
                    class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password()}
                  onInput={(e: { currentTarget: HTMLInputElement }) => setPassword(e.currentTarget.value)}
                  required 
                />
              </div>
              <div class="flex flex-col gap-3">
                <Button 
                  type="submit" 
                  class="w-full" 
                  disabled={loading()}
                >
                  {loading() ? 'Logging in...' : 'Login'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  class="w-full"
                  onClick={handleGoogleSignIn}
                >
                  Login with Google
                </Button>
              </div>
            </div>
            <div class="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <a href="#" class="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
