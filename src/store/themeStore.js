import { proxy } from 'valtio';

export const themeStore = proxy({
  mode: 'light',
});
