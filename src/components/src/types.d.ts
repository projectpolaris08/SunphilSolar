declare module 'react-router-hash-link' {
  import * as React from 'react';
  import { LinkProps } from 'react-router-dom';

  export interface HashLinkProps extends LinkProps {
    smooth?: boolean;
    scroll?: (element: HTMLElement) => void;
  }

  export const HashLink: React.FC<HashLinkProps>;
}

// Add module declarations for path aliases
declare module '@components/*';
declare module '@sections/*';
declare module '@pages/*';
declare module '@assets/*';
declare module '@routes/*';

// Add type for Appliance
export interface Appliance {
  id: number;
  name: string;
  wattage: number;
  quantity: number;
  hoursPerDay: number;
}