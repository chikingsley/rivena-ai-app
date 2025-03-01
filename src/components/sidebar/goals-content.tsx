import {
  Target,
  ChevronDown,
  Flame,
  CheckCircle,
  BarChart,
  PlusCircle,
  MoreHorizontal,
  X,
} from 'lucide-solid';
import { createSignal, For, Show, type Component } from 'solid-js';

interface Goal {
  title: string;
  progress: number;
  dueDate: string;
  tags: string[];
  milestones?: number;
}

interface Habit {
  title: string;
  streak: number;
  target: string;
  days: boolean[];
  stats?: boolean;
}

type ExpandedSections = {
  overview: boolean;
  workGoals: boolean;
  habits: boolean;
};

const workGoals: Goal[] = [
  {
    title: 'Complete Project Presentation',
    progress: 80,
    dueDate: 'Jun 30, 2024',
    tags: ['Work', 'Priority'],
    milestones: 3,
  },
  {
    title: 'Complete Data Analysis Course',
    progress: 45,
    dueDate: 'Jul 15, 2024',
    tags: ['Work', 'Learning'],
  },
];

const habits: Habit[] = [
  {
    title: 'Morning Meditation',
    streak: 30,
    target: 'Daily, 10 minutes',
    days: [true, true, true, true, true, true, false],
    stats: true,
  },
  {
    title: 'Reading',
    streak: 12,
    target: '5 days/week, 20 pages',
    days: [true, true, true, true, false, true, false],
    stats: true,
  },
];

export const GoalsContent: Component = () => {
  const [expandedSections, setExpandedSections] = createSignal<ExpandedSections>({
    overview: true,
    workGoals: true,
    habits: true,
  });

  const toggleSection = (section: keyof ExpandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div class="h-full">
      <div class="p-3 flex justify-between items-center">
        <h3 class="text-sm font-medium text-gray-700">Progress Tracking</h3>
        <button class="p-1 text-purple-600 hover:bg-purple-50 rounded">
          <PlusCircle class="h-4 w-4" />
        </button>
      </div>

      {/* Progress Overview */}
      <div class="px-3 pt-2 pb-4 border-b border-gray-200">
        <div class="bg-white rounded-lg p-3 border border-gray-200">
          <div class="flex justify-between items-center mb-2">
            <h4 class="text-sm font-medium">Current Progress</h4>
            <button class="text-xs text-purple-600">View All</button>
          </div>
          <div class="space-y-2">
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-600">Active Goals</span>
                <span class="font-medium">8 goals</span>
              </div>
              <div class="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div class="bg-purple-500 h-full" style={{ width: '65%' }} />
              </div>
            </div>
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-600">Habit Consistency</span>
                <span class="font-medium">87%</span>
              </div>
              <div class="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div class="bg-green-500 h-full" style={{ width: '87%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Work Goals */}
      <div class="mb-4">
        <div
          class="px-3 py-2 bg-gray-100 border-y border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-200"
          onClick={() => toggleSection('workGoals')}
        >
          <div class="flex items-center gap-2">
            <Target class="h-4 w-4 text-gray-600" />
            <span class="text-sm font-medium">Work Goals</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-500">{workGoals.length} active</span>
            <ChevronDown
              class={`h-4 w-4 text-gray-600 transition-transform ${expandedSections().workGoals ? 'rotate-180' : ''}`}
            />
          </div>
        </div>

        <Show when={expandedSections().workGoals}>
          <div class="space-y-2 py-2">
            <For each={workGoals}>
              {(goal) => (
                <div class="px-3 py-2 mx-2 rounded-lg bg-white border border-gray-200 hover:shadow-sm transition-shadow">
                  <div class="flex items-center justify-between">
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-1.5">
                        <CheckCircle class="h-4 w-4 text-green-500" />
                        <h4 class="text-sm font-medium truncate">{goal.title}</h4>
                      </div>
                      <div class="flex items-center mt-1">
                        <div class="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            class="bg-green-500 h-full transition-all duration-300"
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                        <span class="ml-2 text-xs text-gray-500">{goal.progress}%</span>
                      </div>
                    </div>
                    <MoreHorizontal class="h-4 w-4 text-gray-400 shrink-0 ml-2" />
                  </div>
                  <div class="mt-2 flex justify-between items-center">
                    <span class="text-xs text-gray-500">Due: {goal.dueDate}</span>
                    <div class="flex items-center gap-2">
                      <For each={goal.tags}>
                        {(tag, i) => (
                          <span
                            class={`text-xs px-1.5 py-0.5 rounded ${
                              i() === 0 ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                            }`}
                          >
                            {tag}
                          </span>
                        )}
                      </For>
                    </div>
                  </div>
                </div>
              )}
            </For>
          </div>
        </Show>
      </div>

      {/* Habits */}
      <div class="mb-4">
        <div
          class="px-3 py-2 bg-gray-100 border-y border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-200"
          onClick={() => toggleSection('habits')}
        >
          <div class="flex items-center gap-2">
            <Flame class="h-4 w-4 text-gray-600" />
            <span class="text-sm font-medium">Habits</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-500">{habits.length} active</span>
            <ChevronDown
              class={`h-4 w-4 text-gray-600 transition-transform ${expandedSections().habits ? 'rotate-180' : ''}`}
            />
          </div>
        </div>

        <Show when={expandedSections().habits}>
          <div class="space-y-2 py-2">
            <For each={habits}>
              {(habit) => (
                <div class="px-3 py-2 mx-2 rounded-lg bg-white border border-gray-200 hover:shadow-sm transition-shadow">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-1.5">
                      <Flame class="h-4 w-4 text-red-500" />
                      <h4 class="text-sm font-medium">{habit.title}</h4>
                    </div>
                    <div class="flex items-center gap-1">
                      <span class="text-xs font-medium text-blue-600">{habit.streak}</span>
                      <span class="text-xs text-gray-500">day streak</span>
                    </div>
                  </div>

                  <div class="mt-2 grid grid-cols-7 gap-1">
                    <For each={habit.days}>
                      {(completed, i) => (
                        <div class="flex flex-col items-center">
                          <div
                            class={`w-6 h-6 rounded-full flex items-center justify-center ${
                              completed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                            }`}
                          >
                            {completed ? (
                              <CheckCircle class="h-3.5 w-3.5" />
                            ) : (
                              <X class="h-3.5 w-3.5" />
                            )}
                          </div>
                          <span class="text-[8px] mt-1 text-gray-500">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i()]}
                          </span>
                        </div>
                      )}
                    </For>
                  </div>

                  <div class="mt-3 text-xs text-gray-500 flex justify-between">
                    <span>Target: {habit.target}</span>
                    <Show when={habit.stats}>
                      <div class="flex items-center">
                        <BarChart class="h-3 w-3 mr-1" />
                        <span>View Stats</span>
                      </div>
                    </Show>
                  </div>
                </div>
              )}
            </For>
          </div>
        </Show>
      </div>
    </div>
  );
}
