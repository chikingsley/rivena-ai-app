import { createContext, useContext, createSignal, createEffect, splitProps, mergeProps, type JSX, onCleanup } from "solid-js"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: JSX.Element
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: () => Theme
  setTheme: (theme: Theme) => void
}

const defaultTheme = () => "system" as Theme;
const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: defaultTheme,
  setTheme: () => {}
});

export function ThemeProvider(props: ThemeProviderProps) {
  // Split props into local and others
  const mergedProps = mergeProps({ defaultTheme: "system", storageKey: "vite-ui-theme" }, props);
  const [local] = splitProps(
    mergedProps,
    ["children", "defaultTheme", "storageKey"]
  );

  // Initialize theme from localStorage or default
  const getStoredTheme = () => {
    return localStorage.getItem(local.storageKey) as Theme || local.defaultTheme;
  };
  
  const [theme, setTheme] = createSignal<Theme>(getStoredTheme());
  
  // Handle system theme preference changes
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const updateSystemTheme = () => {
    if (theme() === "system") {
      updateRootClass();
    }
  };
  
  // Initial listener setup
  mediaQuery.addEventListener("change", updateSystemTheme);
  
  // Cleanup on component disposal
  onCleanup(() => {
    mediaQuery.removeEventListener("change", updateSystemTheme);
  });

  // Helper to update the root class
  function updateRootClass() {
    const root = window.document.documentElement;
    const currentTheme = theme();
    
    root.classList.remove("light", "dark");

    if (currentTheme === "system") {
      root.classList.add(mediaQuery.matches ? "dark" : "light");
    } else {
      root.classList.add(currentTheme);
    }
  }

  // Effect to update document with theme changes
  createEffect(updateRootClass);

  // Effect to save theme changes to localStorage
  createEffect(() => {
    localStorage.setItem(local.storageKey, theme());
  });

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme);
    }
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {local.children}
    </ThemeProviderContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeProviderContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
