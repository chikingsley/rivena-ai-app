import type { Component, JSX } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

/* -------------------------------------------------------------------------------------------------
 * Slot
 * -----------------------------------------------------------------------------------------------*/

export interface SlotProps extends JSX.HTMLAttributes<HTMLElement> {
  children?: JSX.Element;
}

const Slot: Component<SlotProps> = props => {
  const [local, slotProps] = splitProps(props, ['children']);
  const resolvedChildren = children(() => local.children);

  const childrenArray = resolvedChildren.toArray();
  const slottable = childrenArray.find(isSlottable);

  if (slottable) {
    // the new element to render is the one passed as a child of `Slottable`
    const newElement = (slottable as any).props.children;

    const newChildren = childrenArray.map(child => {
      if (child === slottable) {
        // because the new element will be the one rendered, we are only interested
        // in grabbing its children
        return (newElement as any)?.props?.children;
      } else {
        return child;
      }
    });

    return (
      <SlotClone {...slotProps}>
        <Dynamic component={typeof newElement === 'function' ? newElement : () => newElement}>
          {newChildren}
        </Dynamic>
      </SlotClone>
    );
  }

  return <SlotClone {...slotProps}>{local.children}</SlotClone>;
};

/* -------------------------------------------------------------------------------------------------
 * SlotClone
 * -----------------------------------------------------------------------------------------------*/

interface SlotCloneProps {
  children?: JSX.Element;
}

const SlotClone: Component<SlotCloneProps & JSX.HTMLAttributes<HTMLElement>> = props => {
  const [local, slotProps] = splitProps(props, ['children']);
  const resolvedChild = children(() => local.children).toArray()[0];

  // If we have a valid child element, clone it with merged props
  if (resolvedChild && typeof resolvedChild === 'object') {
    const mergedProps = mergeProps(slotProps, (resolvedChild as any).props || {});
    return <Dynamic component={(resolvedChild as any).type} {...mergedProps} />;
  }

  // If no valid child, render nothing
  return null;
};

/* -------------------------------------------------------------------------------------------------
 * Slottable
 * -----------------------------------------------------------------------------------------------*/

export interface SlottableProps {
  children?: JSX.Element;
}

const Slottable: Component<SlottableProps> = props => {
  return <>{props.children}</>;
};

/* ---------------------------------------------------------------------------------------------- */

type AnyProps = Record<string, any>;

function isSlottable(child: any): boolean {
  return child && typeof child === 'object' && (child as any).type === Slottable;
}

function mergeProps(slotProps: AnyProps, childProps: AnyProps): AnyProps {
  // Start with a combination of all props
  const result = { ...childProps };

  for (const propName in slotProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    // Handle event handlers
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      // If both have handlers, compose them
      if (slotPropValue && childPropValue) {
        result[propName] = (...args: unknown[]) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      }
      // If only slot has handler, use it
      else if (slotPropValue) {
        result[propName] = slotPropValue;
      }
    }
    // Handle style merging
    else if (propName === 'style') {
      result[propName] = { ...slotPropValue, ...childPropValue };
    }
    // Handle class merging (in SolidJS we use 'class' not 'className')
    else if (propName === 'class') {
      result[propName] = [slotPropValue, childPropValue].filter(Boolean).join(' ');
    }
    // For other props, child props take precedence
    else if (!(propName in result)) {
      result[propName] = slotPropValue;
    }
  }

  return result;
}

const Root = Slot;

export { Slot, Slottable, Root };
