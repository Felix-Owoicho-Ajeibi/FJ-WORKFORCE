import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
  searchParams: URLSearchParams;
}

const RouterContext = createContext<RouterContextType>({
  path: '/',
  navigate: () => {},
  searchParams: new URLSearchParams(),
});

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pathWithQuery, setPathWithQuery] = useState<string>(() => {
    return window.location.pathname + window.location.search;
  });

  useEffect(() => {
    const handlePopState = () => {
      setPathWithQuery(window.location.pathname + window.location.search);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    if (to === pathWithQuery) return;
    window.history.pushState({}, '', to);
    setPathWithQuery(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [path, queryString] = pathWithQuery.split('?');
  const searchParams = useMemo(() => new URLSearchParams(queryString || ''), [queryString]);

  return (
    <RouterContext.Provider value={{ path: path || '/', navigate, searchParams }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);

export const Link: React.FC<{
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  title?: string;
  target?: string;
  rel?: string;
}> = ({ to, children, className = '', onClick, title, target, rel }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    if (
      !e.defaultPrevented &&
      e.button === 0 &&
      (!target || target === '_self') &&
      !e.metaKey &&
      !e.ctrlKey &&
      !e.shiftKey &&
      !e.altKey &&
      to.startsWith('/')
    ) {
      e.preventDefault();
      navigate(to);
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className} title={title} target={target} rel={rel}>
      {children}
    </a>
  );
};
