import { createContext, useContext, useEffect, useState, type HTMLAttributes, type ReactNode } from 'react';
import { fetchPublishedPageHeadlines } from '@/sanity/client';

const PageHeadlinesContext = createContext<{ activePath: string; headlines: Record<string, string> }>({
  activePath: '/',
  headlines: {},
});

export function PageHeadlinesProvider({ children, pagePath }: { children: ReactNode; pagePath: string }) {
  const [headlines, setHeadlines] = useState<Record<string, string>>({});

  useEffect(() => {
    let active = true;
    fetchPublishedPageHeadlines()
      .then((entries) => {
        if (!active) return;
        setHeadlines(Object.fromEntries(
          entries
            .filter((entry) => entry.pagePath && entry.headline?.trim())
            .map((entry) => [normalizePagePath(entry.pagePath), entry.headline.trim()]),
        ));
      })
      .catch((error) => {
        console.warn('Page headlines could not be loaded from Sanity; displaying the built-in headlines.', error);
      });
    return () => { active = false; };
  }, []);

  return <PageHeadlinesContext.Provider value={{ activePath: normalizePagePath(pagePath), headlines }}>{children}</PageHeadlinesContext.Provider>;
}

export function EditablePageHeadline({
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { children: ReactNode }) {
  const { activePath, headlines } = useContext(PageHeadlinesContext);
  const headline = headlines[activePath];

  return (
    <h1 {...props} style={{ ...props.style, whiteSpace: 'pre-line' }}>
      {headline || children}
    </h1>
  );
}

function normalizePagePath(path: string) {
  return path.replace(/\/+$/, '') || '/';
}
