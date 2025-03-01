'use client';

import {
  Calendar,
  Filter,
  MessageSquare,
  Phone,
  Volume,
  BookOpen,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import { For } from 'solid-js';

interface TimeSection {
  id: string;
  title: string;
  conversations: {
    title: string;
    time: string;
    description: string;
    type: 'chat' | 'voice' | 'summary';
    tags?: string[];
    duration?: string;
  }[];
}

const timelineSections: TimeSection[] = [
  {
    id: 'today',
    title: 'Today',
    conversations: [
      {
        title: 'Morning Check-in',
        time: '9:15 AM',
        description:
          'Discussed goals for the week, focusing on your presentation and workout schedule. Set reminders for gym sessions.',
        type: 'chat',
        tags: ['Work', 'Exercise'],
      },
      {
        title: 'Voice Session',
        time: '12:30 PM',
        description: '12-minute conversation about managing work stress and balancing priorities.',
        type: 'voice',
        duration: '12 min',
      },
      {
        title: 'Afternoon Reflections',
        time: '3:45 PM',
        description:
          'Shared thoughts about the book "Atomic Habits" and how to apply its principles to daily routine.',
        type: 'chat',
        tags: ['Reading', 'Habits'],
      },
    ],
  },
  {
    id: 'yesterday',
    title: 'Yesterday',
    conversations: [
      {
        title: 'Daily Summary',
        time: 'Jun 24',
        description:
          '3 conversations throughout the day covering work projects, meditation practice, and weekend plans.',
        type: 'summary',
      },
      {
        title: 'Voice Session',
        time: '8:20 PM',
        description:
          '18-minute conversation about upcoming travel plans to Europe and packing recommendations.',
        type: 'voice',
        duration: '18 min',
      },
    ],
  },
];

export function TimelineContent() {
  const [expandedSections, setExpandedSections] = useState({
    today: true,
    yesterday: true,
    thisWeek: false,
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <div class="h-full">
      <div class="p-3 flex justify-between items-center">
        <h3 class="text-sm font-medium text-gray-700">Conversation History</h3>
        <button class="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
          <Filter class="h-4 w-4" />
        </button>
      </div>

      <For each={timelineSections}>
        {section => (
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
                  expandedSections[section.id] ? 'rotate-180' : ''
                }`}
              />
            </div>

            {expandedSections[section.id] && (
              <div class="space-y-1 py-2">
                {section.conversations.map((conv, idx) => (
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

                    {conv.type === 'voice' && (
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
                    )}

                    {conv.tags && (
                      <div class="flex items-center mt-1.5 gap-2">
                        <div class="flex -space-x-2">
                          {conv.tags.map((tag, i) => (
                            <div
                              class={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold
                              ${i === 0 ? 'bg-green-200 text-green-700' : 'bg-blue-200 text-blue-700'}`}
                            >
                              {tag[0]}
                            </div>
                          ))}
                        </div>
                        <span class="text-[10px] text-gray-500">{conv.tags.join(', ')}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </For>
    </div>
  );
}
