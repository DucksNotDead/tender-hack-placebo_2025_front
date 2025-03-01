import { useEffect } from 'react';

function useLog(...args: any[]) {
  useEffect(() => {
    // eslint-disable-next-line no-undef
    console.log(...args);
  }, [...args]);
}

export const appUtils = { useLog };
