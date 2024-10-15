'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import TextInput from '@/components/text-input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';

import { login } from './login';
import { loginSchema, LoginUserInput } from './loginSchema';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserInput>({
    resolver: zodResolver(loginSchema),
  });

  const { execute, isPending } = useAction(login, {
    onSuccess(data) {
      if (data.data?.error) {
        toast({
          variant: 'destructive',
          title: 'Login failed',
          description: data.data.error,
        });
        return;
      }

      router.replace('/');
      toast({
        title: 'Login successful',
        description: 'You have been successfully logged in.',
      });
    },
    onError() {
      toast({
        variant: 'destructive',
        title: 'Server Error',
        description: 'An error occurred while processing your request. Please try again later.',
      });
    },
  });

  const onSubmit = (data: LoginUserInput) => {
    execute(data);
  };

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    toast({
      title: 'Pasting not allowed',
      description: 'You cannot paste into the password field for security reasons.',
      variant: 'destructive',
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextInput {...register('email')} id="email" label="Email" type="email" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div className="relative">
          <TextInput
            {...register('password')}
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            onPaste={handlePaste} // Display toast on paste attempt
          />
          {/* Show error message */}
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          {/* Toggle password visibility button */}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 translate-y-3 flex items-center"
            tabIndex={-1} // Remove the button from tab navigation
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  );
}
