import { z } from 'zod';

import { User } from '@/lib/drizzle/schema';

export const userDTOSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  role: z.string(),
  profilePic: z.string(),
});

export type UserDTO = z.infer<typeof userDTOSchema>;

export function toUserDTO(user: User): UserDTO {
  return userDTOSchema.parse({
    id: user.id,
    name: user.name,
    role: user.role,
    profilePic: user.profilePic,
  });
}
