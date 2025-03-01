import { Clock, Brain, Target, Command } from 'lucide-solid';
import { createSignal, type Component, Show } from 'solid-js';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/solid-sidebar';

import { GoalsContent } from './goals-content';
import { MemoriesContent } from './memories-content';
import { NavUser } from './nav-user';
import { SearchForm } from './search-form';
import { TeamSwitcher } from './team-switcher';
import { TimelineContent } from './timeline-content';


const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Rivena AI',
      logo: Command,
      plan: 'Your Companion',
    },
  ],
};

export const AppSidebar: Component = () => {
  const [activeTab, setActiveTab] = createSignal('timeline');

  return (
    <Sidebar 
      class="border-r bg-gray-50/95" 
      variant="sidebar" 
      side="left"
      collapsible="icon"
    >
      <SidebarHeader class="border-b border-gray-200 bg-white p-4">
        <TeamSwitcher teams={data.teams} />
        <SearchForm className="mt-4" />
      </SidebarHeader>

      {/* Tabs */}
      <div class="flex border-b border-gray-200 bg-white">
        <button
          class={`flex-1 py-2 px-3 text-sm font-medium flex items-center justify-center gap-1.5 ${
            activeTab() === 'timeline'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('timeline')}
        >
          <Clock class="h-3.5 w-3.5" />
          <span>Timeline</span>
        </button>
        <button
          class={`flex-1 py-2 px-3 text-sm font-medium flex items-center justify-center gap-1.5 ${
            activeTab() === 'goals' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('goals')}
        >
          <Target class="h-3.5 w-3.5" />
          <span>Goals</span>
        </button>
        <button
          class={`flex-1 py-2 px-3 text-sm font-medium flex items-center justify-center gap-1.5 ${
            activeTab() === 'memories'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('memories')}
        >
          <Brain class="h-3.5 w-3.5" />
          <span>Memories</span>
        </button>
      </div>

      <SidebarContent>
        <Show when={activeTab() === 'timeline'}>
          <TimelineContent />
        </Show>
        <Show when={activeTab() === 'goals'}>
          <GoalsContent />
        </Show>
        <Show when={activeTab() === 'memories'}>
          <MemoriesContent />
        </Show>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
