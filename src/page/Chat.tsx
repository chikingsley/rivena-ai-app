import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import { createSignal, createEffect, For, Show } from "solid-js";

// Mock data for conversations
const mockMessages = [
  { id: 1, sender: "bot", text: "Hello! How can I help you today?", timestamp: "12:30 PM" },
  { id: 2, sender: "user", text: "I'm trying to plan my week. Can you help me organize my schedule?", timestamp: "12:31 PM" },
  { id: 3, sender: "bot", text: "Of course! Let's start by listing out your main priorities for the week.", timestamp: "12:32 PM" },
  { id: 4, sender: "user", text: "I need to finish a project report, schedule a dentist appointment, and prepare for a presentation on Thursday.", timestamp: "12:33 PM" },
  { id: 5, sender: "bot", text: "That sounds like a full week. Let's break these down into daily tasks to make it more manageable.", timestamp: "12:34 PM" },
];

// Sidebar component converted from React to SolidJS
function SideBar() {
  const [activeTab, setActiveTab] = createSignal('timeline');
  const [expandedGroups, setExpandedGroups] = createSignal({
    'today': true,
    'yesterday': true,
    'lastWeek': false,
    'memories': true
  });

  const toggleGroup = (group) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  return (
    <div class="flex flex-col h-full bg-gray-50 border-r border-gray-200 w-full max-w-md">
      {/* Header */}
      <div class="p-4 border-b border-gray-200 bg-white">
        <h2 class="text-xl font-semibold text-gray-800">Your Conversation</h2>
        <div class="mt-2 flex items-center">
          <div class="relative flex-1">
            <input 
              type="text" 
              placeholder="Search conversations..." 
              class="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <svg class="absolute left-2 top-2.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <button class="ml-2 p-2 rounded-lg text-gray-500 hover:bg-gray-100">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div class="flex border-b border-gray-200 bg-white">
        <button 
          class={`flex-1 py-3 px-4 text-sm font-medium ${activeTab() === 'timeline' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('timeline')}
        >
          Timeline
        </button>
        <button 
          class={`flex-1 py-3 px-4 text-sm font-medium ${activeTab() === 'memories' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('memories')}
        >
          Memories
        </button>
      </div>

      {/* Content - Timeline */}
      <Show when={activeTab() === 'timeline'}>
        <div class="flex-1 overflow-y-auto">
          {/* Today Group */}
          <div class="border-b border-gray-200">
            <button 
              class="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
              onClick={() => toggleGroup('today')}
            >
              <div class="flex items-center">
                <svg class="h-4 w-4 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span class="font-medium text-gray-800">Today</span>
              </div>
              <svg 
                class={`h-4 w-4 text-gray-500 transition-transform ${expandedGroups().today ? 'transform rotate-180' : ''}`} 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            
            <Show when={expandedGroups().today}>
              <div class="px-4 py-2">
                {/* Voice Call */}
                <div class="py-3 border-l-2 border-blue-500 pl-4 pr-2 mb-3 hover:bg-gray-100 rounded-r-lg cursor-pointer">
                  <div class="flex items-start justify-between">
                    <div class="flex items-center">
                      <svg class="h-4 w-4 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <span class="font-medium text-blue-600">Voice Conversation</span>
                    </div>
                    <span class="text-xs text-gray-500">12:30 PM</span>
                  </div>
                  <p class="text-sm text-gray-600 mt-1">12 minute call about work-life balance</p>
                </div>
                
                {/* Text Conversation - Topic 1 */}
                <div class="py-3 border-l-2 border-green-500 pl-4 pr-2 mb-3 hover:bg-gray-100 rounded-r-lg cursor-pointer">
                  <div class="flex items-start justify-between">
                    <div class="flex items-center">
                      <svg class="h-4 w-4 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      <span class="font-medium text-gray-800">Goals for the week</span>
                    </div>
                    <span class="text-xs text-gray-500">9:45 AM</span>
                  </div>
                  <p class="text-sm text-gray-600 mt-1">Planning workout schedule and reading goals</p>
                </div>
              </div>
            </Show>
          </div>
          
          {/* Yesterday Group */}
          <div class="border-b border-gray-200">
            <button 
              class="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
              onClick={() => toggleGroup('yesterday')}
            >
              <div class="flex items-center">
                <svg class="h-4 w-4 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span class="font-medium text-gray-800">Yesterday</span>
              </div>
              <svg 
                class={`h-4 w-4 text-gray-500 transition-transform ${expandedGroups().yesterday ? 'transform rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            
            <Show when={expandedGroups().yesterday}>
              <div class="px-4 py-2">
                {/* Text Conversation - Topic 1 */}
                <div class="py-3 border-l-2 border-purple-500 pl-4 pr-2 mb-3 hover:bg-gray-100 rounded-r-lg cursor-pointer">
                  <div class="flex items-start justify-between">
                    <div class="flex items-center">
                      <svg class="h-4 w-4 text-purple-500 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      <span class="font-medium text-gray-800">Book recommendations</span>
                    </div>
                    <span class="text-xs text-gray-500">8:20 PM</span>
                  </div>
                  <p class="text-sm text-gray-600 mt-1">Discussion about science fiction novels</p>
                </div>
              </div>
            </Show>
          </div>
        </div>
      </Show>
      
      {/* Content - Memories */}
      <Show when={activeTab() === 'memories'}>
        <div class="flex-1 overflow-y-auto">
          {/* Memory Categories */}
          <div class="border-b border-gray-200">
            <button 
              class="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
              onClick={() => toggleGroup('memories')}
            >
              <div class="flex items-center">
                <svg class="h-4 w-4 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span class="font-medium text-gray-800">Personal Facts</span>
              </div>
              <svg 
                class={`h-4 w-4 text-gray-500 transition-transform ${expandedGroups().memories ? 'transform rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            
            <Show when={expandedGroups().memories}>
              <div class="px-4 py-2">
                <div class="py-2 pl-4 pr-2 mb-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <p class="text-sm text-gray-800">You prefer science fiction and historical fiction books.</p>
                  <p class="text-xs text-gray-500 mt-1">Learned 2 days ago</p>
                </div>
                
                <div class="py-2 pl-4 pr-2 mb-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <p class="text-sm text-gray-800">You're training for a half marathon in September.</p>
                  <p class="text-xs text-gray-500 mt-1">Learned 3 days ago</p>
                </div>
              </div>
            </Show>
          </div>
        </div>
      </Show>
    </div>
  );
}

// Main chat view component
function MainView() {
  const [messages, setMessages] = createSignal(mockMessages);
  const [newMessage, setNewMessage] = createSignal("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage().trim() === "") return;
    
    const userMessage = {
      id: messages().length + 1,
      sender: "user",
      text: newMessage(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    };
    
    setMessages([...messages(), userMessage]);
    setNewMessage("");
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botMessage = {
        id: messages().length + 2,
        sender: "bot",
        text: "I've received your message. Is there anything else I can help with?",
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      };
      
      setMessages([...messages(), botMessage]);
    }, 1000);
  };

  return (
    <div class="flex flex-col h-full">
      {/* Chat header */}
      <div class="p-4 border-b border-gray-200 bg-white">
        <h2 class="text-xl font-semibold text-gray-800">Current Conversation</h2>
        <p class="text-sm text-gray-500">Chat with your assistant</p>
      </div>
      
      {/* Messages area */}
      <div class="flex-1 overflow-y-auto p-4 bg-gray-50">
        <For each={messages()}>
          {(message) => (
            <div class={`max-w-3/4 mb-4 ${message.sender === 'user' ? 'ml-auto' : ''}`}>
              <div class={`p-3 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-blue-600 text-white ml-auto' 
                  : 'bg-white border border-gray-200'
              }`}>
                <p class="text-sm">{message.text}</p>
              </div>
              <div class={`flex items-center mt-1 text-xs text-gray-500 ${
                message.sender === 'user' ? 'justify-end' : ''
              }`}>
                <span>{message.timestamp}</span>
              </div>
            </div>
          )}
        </For>
      </div>
      
      {/* Input area */}
      <div class="p-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSendMessage} class="flex items-center">
          <input
            type="text"
            value={newMessage()}
            onInput={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
            class="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button 
            type="submit"
            class="ml-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

// Main layout component
const MainLayout = (views) => (props) => (
  <div style="display: flex; height: 100vh; overflow: hidden;"> 
    <div style="width: 350px; height: 100%;">{views.sideBar({})}</div>  
    <div style="flex: 1; height: 100%;">{views.default({})}</div> 
  </div>
);

// Routes configuration
const routes = {
  path: "/",
  children: [
    {
      path: "/*",
      component: MainLayout({
        sideBar: SideBar,
        default: MainView
      })
    }
  ]
};

// Add some basic styling
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
  
  #app {
    height: 100vh;
  }
`;
document.head.appendChild(styleSheet);

// Render the app
render(() => <Router>{routes}</Router>, document.getElementById("app"));