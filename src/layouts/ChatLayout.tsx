import { type Component, type JSX } from 'solid-js';

import { AppSidebar } from '../components/sidebar/app-sidebar';
import { SidebarProvider } from '../components/ui/solid-sidebar';

interface ChatLayoutProps {
  children: JSX.Element;
}

const ChatLayout: Component<ChatLayoutProps> = (props) => {
  return (
    <SidebarProvider>
      <div class="flex h-screen w-screen overflow-hidden bg-background">
        <AppSidebar />
        <main class="flex-1 overflow-auto">
          {props.children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ChatLayout;
