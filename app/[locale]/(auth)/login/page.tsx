'use client';

import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
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

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextInput {...register('email')} id="email" label="Email" type="email" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <TextInput {...register('password')} id="password" label="Password" type="password" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  );
}
