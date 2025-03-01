'use client';

import { ChevronsUpDown } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';

export function NavUser(props: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  return (
    <div class="flex items-center gap-2 p-4">
      <Avatar class="h-8 w-8">
        <AvatarImage src={props.user.avatar} alt={props.user.name} />
        <AvatarFallback>
          {props.user.name
            .split(' ')
            .map(n => n[0])
            .join('')}
        </AvatarFallback>
      </Avatar>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium truncate">{props.user.name}</p>
        <p class="text-xs text-gray-500 truncate">{props.user.email}</p>
      </div>
      <ChevronsUpDown class="h-4 w-4 text-gray-500" />
    </div>
  );
}
