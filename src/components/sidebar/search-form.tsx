import { Search } from 'lucide-solid';
import type { Component } from 'solid-js';

type SearchFormProps = {
  className?: string;
};

export const SearchForm: Component<SearchFormProps> = (props) => {
  return (
    <div class={props.className}>
      <div class="relative w-full">
        <input
          type="text"
          placeholder="Search conversations..."
          class="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 text-sm"
        />
        <Search class="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
}
