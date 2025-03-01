import {
  ChevronDown,
  Brain,
  Calendar,
  ListFilter,
  MoreHorizontal,
} from 'lucide-solid';
import { createSignal, For, Show, type Component } from 'solid-js';
interface Memory {
  id: string;
  title: string;
  date: string;
  category: string;
  saved: boolean;
  type: 'conversation' | 'document' | 'insight';
}

type ExpandedSections = {
  recent: boolean;
  saved: boolean;
  byType: boolean;
};

const memories: Memory[] = [
  {
    id: 'm1',
    title: 'Conversation about Project Timeline',
    date: '2 hours ago',
    category: 'Work',
    saved: true,
    type: 'conversation',
  },
  {
    id: 'm2',
    title: 'Research on Machine Learning Applications',
    date: 'Yesterday',
    category: 'Learning',
    saved: true,
    type: 'document',
  },
  {
    id: 'm3',
    title: 'Discussion about Customer Feedback Process',
    date: '3 days ago',
    category: 'Work',
    saved: false,
    type: 'conversation',
  },
  {
    id: 'm4',
    title: 'Insights on Market Trends',
    date: 'Last week',
    category: 'Business',
    saved: true,
    type: 'insight',
  },
];

export const MemoriesContent: Component = () => {
  const [expandedSections, setExpandedSections] = createSignal<ExpandedSections>({
    recent: true,
    saved: true,
    byType: false,
  });

  const toggleSection = (section: keyof ExpandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const savedMemories = () => memories.filter(m => m.saved);

  return (
    <div class="h-full">
      <div class="p-3 flex justify-between items-center border-b border-gray-200">
        <h3 class="text-sm font-medium text-gray-700">Memory Library</h3>
        <div class="flex gap-1">
          <button class="p-1 text-gray-500 hover:bg-gray-100 rounded">
            <Calendar class="h-4 w-4" />
          </button>
          <button class="p-1 text-gray-500 hover:bg-gray-100 rounded">
            <ListFilter class="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Recent Memories */}
      <div class="mb-4">
        <div
          class="px-3 py-2 bg-gray-100 border-b border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-200"
          onClick={() => toggleSection('recent')}
        >
          <div class="flex items-center gap-2">
            <Brain class="h-4 w-4 text-blue-600" />
            <span class="text-sm font-medium">Recent Memories</span>
          </div>
          <ChevronDown
            class={`h-4 w-4 text-gray-600 transition-transform ${expandedSections().recent ? 'rotate-180' : ''}`}
          />
        </div>

        <Show when={expandedSections().recent}>
          <div class="py-2">
            <For each={memories}>
              {(memory) => (
                <div class="px-3 py-2 hover:bg-gray-50 flex items-start justify-between">
                  <div>
                    <h4 class="text-sm font-medium text-gray-800">{memory.title}</h4>
                    <div class="mt-1 flex items-center gap-2 text-xs text-gray-500">
                      <span>{memory.date}</span>
                      <span class="w-1 h-1 rounded-full bg-gray-300" />
                      <span>{memory.category}</span>
                    </div>
                  </div>
                  <button class="p-1 text-gray-400 hover:text-gray-600">
                    <MoreHorizontal class="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </For>
          </div>
        </Show>
      </div>

      {/* Saved Memories */}
      <div class="mb-4">
        <div
          class="px-3 py-2 bg-gray-100 border-y border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-200"
          onClick={() => toggleSection('saved')}
        >
          <div class="flex items-center gap-2">
            <Brain class="h-4 w-4 text-purple-600" />
            <span class="text-sm font-medium">Saved Memories</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-500">{savedMemories().length} items</span>
            <ChevronDown
              class={`h-4 w-4 text-gray-600 transition-transform ${expandedSections().saved ? 'rotate-180' : ''}`}
            />
          </div>
        </div>

        <Show when={expandedSections().saved}>
          <div class="py-2">
            <For each={savedMemories()}>
              {(memory) => (
                <div class="px-3 py-2 hover:bg-gray-50 flex items-start justify-between">
                  <div>
                    <h4 class="text-sm font-medium text-gray-800">{memory.title}</h4>
                    <div class="mt-1 flex items-center gap-2 text-xs text-gray-500">
                      <span>{memory.date}</span>
                      <span class="w-1 h-1 rounded-full bg-gray-300" />
                      <span>{memory.category}</span>
                    </div>
                  </div>
                  <button class="p-1 text-gray-400 hover:text-gray-600">
                    <MoreHorizontal class="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </For>
          </div>
        </Show>
      </div>

      {/* Memories by Type */}
      <div class="mb-4">
        <div
          class="px-3 py-2 bg-gray-100 border-y border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-200"
          onClick={() => toggleSection('byType')}
        >
          <div class="flex items-center gap-2">
            <Brain class="h-4 w-4 text-green-600" />
            <span class="text-sm font-medium">By Type</span>
          </div>
          <ChevronDown
            class={`h-4 w-4 text-gray-600 transition-transform ${expandedSections().byType ? 'rotate-180' : ''}`}
          />
        </div>

        <Show when={expandedSections().byType}>
          <div class="py-2 space-y-1 px-3">
            <div class="flex items-center justify-between py-1 hover:bg-gray-50 rounded px-2">
              <span class="text-sm">Conversations</span>
              <span class="text-xs text-gray-500">
                {memories.filter(m => m.type === 'conversation').length}
              </span>
            </div>
            <div class="flex items-center justify-between py-1 hover:bg-gray-50 rounded px-2">
              <span class="text-sm">Documents</span>
              <span class="text-xs text-gray-500">
                {memories.filter(m => m.type === 'document').length}
              </span>
            </div>
            <div class="flex items-center justify-between py-1 hover:bg-gray-50 rounded px-2">
              <span class="text-sm">Insights</span>
              <span class="text-xs text-gray-500">
                {memories.filter(m => m.type === 'insight').length}
              </span>
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
}
