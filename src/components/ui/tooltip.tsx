import type { PolymorphicProps } from '@kobalte/core/polymorphic';
import * as TooltipPrimitive from '@kobalte/core/tooltip';
import { createContext, useContext, type Component, type ValidComponent, type JSX } from 'solid-js';
import { splitProps } from 'solid-js';


import { cn } from '@/lib/utils';

// Create a context for tooltip provider settings
type TooltipProviderContextValue = {
  delayDuration: number;
  skipDelayDuration: number;
  disableHoverableContent: boolean;
};

const TooltipProviderContext = createContext<TooltipProviderContextValue>({
  delayDuration: 700,
  skipDelayDuration: 300,
  disableHoverableContent: false,
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
  const context = {
    delayDuration: props.delayDuration ?? 700,
    skipDelayDuration: props.skipDelayDuration ?? 300,
    disableHoverableContent: props.disableHoverableContent ?? false,
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

const TooltipTrigger = TooltipPrimitive.Trigger;

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

  // Use provider context values as fallbacks
  const tooltipProps = {
    gutter: 4,
    // Override provider values with local props if provided
    openDelay: local.delayDuration ?? providerContext.delayDuration,
    ...others,
  };

  return <TooltipPrimitive.Root {...tooltipProps} />;
};

type TooltipContentProps<T extends ValidComponent = 'div'> =
  TooltipPrimitive.TooltipContentProps<T> & { class?: string | undefined };

const TooltipContent = <T extends ValidComponent = 'div'>(
  props: PolymorphicProps<T, TooltipContentProps<T>>
) => {
  const [local, others] = splitProps(props as TooltipContentProps, ['class']);
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        class={cn(
          'z-50 origin-[var(--kb-popover-content-transform-origin)] overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95',
          local.class
        )}
        {...others}
      />
    </TooltipPrimitive.Portal>
  );
};

const TooltipArrow: Component<{ class?: string }> = props => {
  return <TooltipPrimitive.Arrow class={cn('fill-popover', props.class)} />;
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, TooltipArrow };
