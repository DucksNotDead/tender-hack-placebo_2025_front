import { BrowserRouter } from 'react-router';

import { AppHeader } from 'widgets/AppHeader';

import { AppPageProvider } from './providers/AppPageProvider';
import { AppQueryProvider } from './providers/AppQueryProvider';
import { AppRouterProvider } from './providers/AppRouterProvider';
import { AppAntDesignProvider } from './providers/AppAntDesignProvider';
import { AppAuthProvider } from './providers/AppAuthProvider';

export function App() {
  return (
    <AppAntDesignProvider>
      <AppQueryProvider>
        <AppAuthProvider>
          <BrowserRouter>
            <AppHeader />
            <AppPageProvider>
              <AppRouterProvider />
            </AppPageProvider>
          </BrowserRouter>
        </AppAuthProvider>
      </AppQueryProvider>
    </AppAntDesignProvider>
  );
}
