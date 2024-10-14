'use client';

import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

import TextInput from '@/components/text-input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { roles } from '@/lib/drizzle/schema';
import { zodResolver } from '@hookform/resolvers/zod';

import { register } from './register';
import { registerSchema, RegisterUserInput } from './registerSchema';

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();

  const { execute, isPending } = useAction(register, {
    onSuccess(data) {
      if (data.data?.error) {
        toast({
          variant: 'destructive',
          title: 'Registration failed',
          description: data.data.error || 'An error occurred during registration.',
        });
        return;
      }

      if (data.data?.success) {
        router.replace('/');
        toast({
          title: "You've successfully registered! 🎉",
          description: 'Enjoy exploring your new account.',
        });
      }
    },
    onError() {
      toast({
        variant: 'destructive',
        title: 'Server Error',
        description: 'An error occurred while processing your request. Please try again later.',
      });
    },
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterUserInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: roles[0],
    },
  });

  const onSubmit = async (data: RegisterUserInput) => {
    execute(data);
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <RadioGroup onValueChange={field.onChange} value={field.value}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="job-seeker" id="job-seeker" />
                <Label htmlFor="job-seeker">Job Seeker</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="employer" id="employer" />
                <Label htmlFor="employer">Employer</Label>
              </div>
            </RadioGroup>
          )}
        />
        {errors.role && <p className="text-red-500">{errors.role.message}</p>}

        <Controller
          name="name"
          control={control}
          render={({ field }) => <TextInput {...field} id="name" label="Name" />}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <Controller
          name="email"
          control={control}
          render={({ field }) => <TextInput {...field} id="email" label="Email" />}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextInput {...field} id="password" label="Password" type="password" />
          )}
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <Button type="submit" className="w-full" disabled={isPending}>
          Register
        </Button>
      </form>
    </div>
  );
}
