'use client';

import { Command } from 'lucide-react';
import type * as React from 'react';

export function TeamSwitcher(props: {
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
}) {
  const activeTeam = props.teams[0];

  return (
    <div class="flex items-center gap-2">
      <div class="flex aspect-square h-8 items-center justify-center rounded-lg bg-purple-600 text-white">
        <Command class="h-4 w-4" />
      </div>
      <div>
        <h2 class="text-sm font-semibold">{activeTeam.name}</h2>
        <p class="text-xs text-gray-500">{activeTeam.plan}</p>
      </div>
    </div>
  );
}
