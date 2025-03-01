import {
  Calendar,
  Filter,
  MessageSquare,
  ChevronDown,
  Phone,
  Volume,
  BookOpen,
  Sparkles,
} from 'lucide-solid';
import { createSignal, For, Show, type Component } from 'solid-js';

interface TimeSection {
  id: string;
  title: string;
  conversations: Conversation[];
}

interface Conversation {
  id: string;
  title: string;
  type: 'chat' | 'voice' | 'summary';
  time: string;
  description: string;
  tags?: string[];
}

type ExpandedSectionsType = {
  [key: string]: boolean;
  today: boolean;
  yesterday: boolean;
  thisWeek: boolean;
};

const timelineSections: TimeSection[] = [
  {
    id: 'today',
    title: 'Today',
    conversations: [
      {
        id: 'c1',
        title: 'Project Update Discussion',
        type: 'chat',
        time: '2:30 PM',
        description:
          'Discussed the latest updates on the marketing campaign and next steps for Q3 planning.',
        tags: ['Work', 'Marketing'],
      },
      {
        id: 'c2',
        title: 'Brainstorming Session',
        type: 'voice',
        time: '10:15 AM',
        description:
          'Recorded audio notes about potential new features based on recent user feedback.',
        tags: ['Product', 'Features'],
      },
    ],
  },
  {
    id: 'yesterday',
    title: 'Yesterday',
    conversations: [
      {
        id: 'c3',
        title: 'Weekly Team Sync',
        type: 'summary',
        time: '4:00 PM',
        description:
          'Summarized action items from the weekly team meeting. Main topics: resource allocation and sprint planning.',
      },
      {
        id: 'c4',
        title: 'Research on competitor products',
        type: 'chat',
        time: '11:30 AM',
        description:
          'Analyzed the feature set of three main competitor products and identified potential gaps.',
        tags: ['Research', 'Competition'],
      },
    ],
  },
  {
    id: 'thisWeek',
    title: 'This Week',
    conversations: [
      {
        id: 'c5',
        title: 'Client Presentation Prep',
        type: 'chat',
        time: 'Monday',
        description:
          'Prepared talking points and slides for the quarterly client presentation.',
        tags: ['Client', 'Presentation'],
      },
      {
        id: 'c6',
        title: 'Product Strategy Review',
        type: 'voice',
        time: 'Monday',
        description:
          'Discussion with product team about strategic initiatives for the next two quarters.',
        tags: ['Strategy', 'Product'],
      },
    ],
  },
];

export const TimelineContent: Component = () => {
  const [expandedSections, setExpandedSections] = createSignal<ExpandedSectionsType>({
    today: true,
    yesterday: true,
    thisWeek: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div class="h-full flex flex-col">
      <div class="p-3 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <h3 class="text-sm font-medium text-gray-700">Conversation History</h3>
          <div class="flex space-x-1">
            <button class="p-1 text-gray-500 hover:bg-gray-100 rounded">
              <Calendar class="h-4 w-4" />
            </button>
            <button 
              class="p-1 text-gray-500 hover:bg-gray-100 rounded"
              onClick={() => setExpandedSections(prev => ({
                ...prev,
                today: !prev.today,
                yesterday: !prev.yesterday,
                thisWeek: !prev.thisWeek,
              }))}
            >
              <Filter class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div class="flex-1 overflow-y-auto">
        <div class="py-3 px-2">
          <div class="px-2 py-1 flex items-center space-x-1.5 mb-3">
            <Calendar class="h-4 w-4 text-gray-500" />
            <span class="text-xs font-medium text-gray-500">Recent Conversations</span>
          </div>
          
          <For each={timelineSections}>
            {(section) => (
              <div class="mb-4">
                <div
                  class="px-3 py-2 bg-gray-100 border-y border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-200"
                  onClick={() => toggleSection(section.id)}
                >
                  <div class="flex items-center gap-2">
                    <Calendar class="h-4 w-4 text-gray-600" />
                    <span class="text-sm font-medium">{section.title}</span>
                  </div>
                  <ChevronDown
                    class={`h-4 w-4 text-gray-600 transition-transform ${
                      expandedSections()[section.id] ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                <Show when={expandedSections()[section.id]}>
                  <div class="space-y-1 py-2">
                    <For each={section.conversations}>
                      {(conv) => (
                        <div class="px-3 py-2 mx-2 rounded-lg border-l-4 border-purple-500 bg-white hover:bg-gray-50 cursor-pointer">
                          <div class="flex items-center justify-between mb-1">
                            <div class="flex items-center gap-1.5">
                              {conv.type === 'voice' && <Phone class="h-3.5 w-3.5 text-blue-600" />}
                              {conv.type === 'summary' && <Sparkles class="h-3.5 w-3.5 text-amber-600" />}
                              {conv.type === 'chat' && (
                                <MessageSquare class="h-3.5 w-3.5 text-purple-600" />
                              )}
                              <span class="font-medium text-sm">{conv.title}</span>
                            </div>
                            <span class="text-xs text-gray-500">{conv.time}</span>
                          </div>

                          <p class="text-xs text-gray-600 line-clamp-2">{conv.description}</p>

                          <Show when={conv.type === 'voice'}>
                            <div class="mt-1.5 flex items-center text-xs gap-2">
                              <button class="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Volume class="h-3 w-3" />
                                <span>Play</span>
                              </button>
                              <button class="bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <BookOpen class="h-3 w-3" />
                                <span>Transcript</span>
                              </button>
                            </div>
                          </Show>

                          <Show when={conv.tags && conv.tags.length > 0}>
                            <div class="flex items-center mt-1.5 gap-2">
                              <div class="flex -space-x-2">
                                <For each={conv.tags}>
                                  {(tag, i) => (
                                    <div
                                      class={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold
                                      ${i() === 0 ? 'bg-green-200 text-green-700' : 'bg-blue-200 text-blue-700'}`}
                                    >
                                      {tag[0]}
                                    </div>
                                  )}
                                </For>
                              </div>
                              <span class="text-[10px] text-gray-500">{conv.tags?.join(', ')}</span>
                            </div>
                          </Show>
                        </div>
                      )}
                    </For>
                  </div>
                </Show>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
}
