import type { PolymorphicProps } from '@kobalte/core/polymorphic';
import * as TooltipPrimitive from '@kobalte/core/tooltip';
import { createContext, useContext, type Component, type ValidComponent, type JSX } from 'solid-js';
import { splitProps, createMemo } from 'solid-js';

import { cn } from '@/lib/utils';

// Create a context for tooltip provider settings
type TooltipProviderContextValue = {
  delayDuration: () => number;
  skipDelayDuration: () => number;
  disableHoverableContent: () => boolean;
};

const TooltipProviderContext = createContext<TooltipProviderContextValue>({
  delayDuration: () => 700,
  skipDelayDuration: () => 300,
  disableHoverableContent: () => false,
});

type TooltipProviderProps = {
  children: JSX.Element;
  /**
   * The duration from when the pointer enters the trigger until the tooltip gets opened.
   * @defaultValue 700
   */
  delayDuration?: number;
  /**
   * How much time a user has to enter another trigger without incurring a delay again.
   * @defaultValue 300
   */
  skipDelayDuration?: number;
  /**
   * When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger.
   * @defaultValue false
   */
  disableHoverableContent?: boolean;
};

const TooltipProvider: Component<TooltipProviderProps> = props => {
  // Create reactive context values using createMemo
  const delayDuration = createMemo(() => props.delayDuration ?? 700);
  const skipDelayDuration = createMemo(() => props.skipDelayDuration ?? 300);
  const disableHoverableContent = createMemo(() => props.disableHoverableContent ?? false);

  const context = {
    delayDuration,
    skipDelayDuration,
    disableHoverableContent,
  };

  return (
    <TooltipProviderContext.Provider value={context}>
      {props.children}
    </TooltipProviderContext.Provider>
  );
};

// Hook to use tooltip provider context
function useTooltipProvider() {
  return useContext(TooltipProviderContext);
}

// Extend TooltipTrigger to handle asChild prop
type TooltipTriggerProps<T extends ValidComponent = 'button'> = 
  TooltipPrimitive.TooltipTriggerProps<T> & { 
    asChild?: boolean;
    class?: string | undefined;
  };

const TooltipTrigger = <T extends ValidComponent = 'button'>(
  props: PolymorphicProps<T, TooltipTriggerProps<T>>
) => {
  // Use type assertion to handle the split props correctly
  const [local, others] = splitProps(props as any, ['asChild', 'class']);

  // We ignore asChild in SolidJS version but keep it in the type signature for compatibility
  return (
    <TooltipPrimitive.Trigger 
      class={cn(local.class)} 
      {...others}
    />
  );
};

type TooltipProps = TooltipPrimitive.TooltipRootProps & {
  /**
   * The duration from when the pointer enters the trigger until the tooltip gets opened.
   * This will override the prop with the same name passed to Provider.
   */
  delayDuration?: number;
  /**
   * When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger.
   */
  disableHoverableContent?: boolean;
};

const Tooltip: Component<TooltipProps> = props => {
  const providerContext = useTooltipProvider();
  const [local, others] = splitProps(props, ['delayDuration', 'disableHoverableContent']);

  // Create a reactive memo for openDelay
  const openDelay = createMemo(() => 
    local.delayDuration ?? providerContext.delayDuration()
  );

  // In SolidJS, we need to pass the reactive properties directly to the component
  return (
    <TooltipPrimitive.Root 
      gutter={4}
      // Use prop function to compute openDelay at render time
      openDelay={openDelay()}
      {...others}
    />
  );
};

type TooltipContentProps<T extends ValidComponent = 'div'> =
  TooltipPrimitive.TooltipContentProps<T> & { 
    class?: string | undefined;
    // Add shadcn compatibility props
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
  };

const TooltipContent = <T extends ValidComponent = 'div'>(
  props: PolymorphicProps<T, TooltipContentProps<T>>
) => {
  const [local, others] = splitProps(props as TooltipContentProps, [
    'class', 
    'side', 
    'align', 
    'sideOffset'
  ]);

  // Make this reactive with createMemo
  const placement = createMemo(() => {
    return local.side && local.align 
      ? `${local.side}${local.align === 'center' ? '' : `-${local.align}`}` as const
      : local.side;
  });

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        class={cn(
          'z-50 origin-[var(--kb-popover-content-transform-origin)] overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95',
          local.class
        )}
        // Use the memo by calling it as a function
        placement={placement()}
        gutter={local.sideOffset}
        {...others}
      />
    </TooltipPrimitive.Portal>
  );
};

const TooltipArrow: Component<{ class?: string }> = props => {
  return <TooltipPrimitive.Arrow class={cn('fill-popover', props.class)} />;
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, TooltipArrow };
