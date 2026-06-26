import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type AppRoute = '/' | '/services' | '/about' | '/works' | '/contact';

type RouterContextValue = {
  path: AppRoute;
  navigate: (to: AppRoute) => void;
};

const RouterContext = createContext<RouterContextValue>({
  path: '/',
  navigate: () => {},
});

function normalizePath(pathname: string): AppRoute {
  const routes: AppRoute[] = ['/', '/services', '/about', '/works', '/contact'];
  return routes.includes(pathname as AppRoute) ? (pathname as AppRoute) : '/';
}

export function AppRouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState<AppRoute>(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const onPop = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (to: AppRoute) => {
    const next = normalizePath(to);
    if (next === path) return;
    window.history.pushState({}, '', next);
    setPath(next);
    window.scrollTo({ top: 0, behavior: 'instant' in window ? ('instant' as ScrollBehavior) : 'auto' });
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useAppRouter() {
  return useContext(RouterContext);
}
