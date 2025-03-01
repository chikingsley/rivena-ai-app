import { createSignal } from 'solid-js';
import { AppSidebar } from '../components/sidebar/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
} from '../components/ui/sidebar';

export default function Chat() {
  const [messages, setMessages] = createSignal([
    { id: 1, text: 'Hello, how can I help you today?', sender: 'system' }
  ]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div class="flex flex-col h-full">
          <header class="flex h-16 shrink-0 items-center border-b px-6">
            <h1 class="text-xl font-semibold">Rivena Chat</h1>
          </header>
          <div class="flex-1 overflow-auto p-6">
            <div class="space-y-4">
              {messages().map((message) => (
                <div 
                  class={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    class={`rounded-lg px-4 py-2 max-w-[80%] ${message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'}`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div class="border-t p-4">
            <form 
              class="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.currentTarget.querySelector('input');
                if (input && input.value.trim()) {
                  setMessages(prev => [...prev, { 
                    id: prev.length + 1, 
                    text: input.value, 
                    sender: 'user' 
                  }]);
                  input.value = '';
                }
              }}
            >
              <input
                type="text"
                placeholder="Type your message..."
                class="flex-1 min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <button 
                type="submit"
                class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
