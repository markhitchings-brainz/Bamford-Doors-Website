import { renderToString } from 'react-dom/server';
import App, { getSeoRoutes } from './App';
import { ErrorBoundary } from './components/error-boundary';

export { getSeoRoutes };

export function renderPage(requestPath: string) {
  // Studio is intentionally client-only. CMS case-study details also retain
  // their client data loading; their build-time metadata is generated separately.
  // Do not serialize lazy boundaries or loading skeletons as full page content.
  if (requestPath === '/admin' || requestPath.startsWith('/admin/') || requestPath.startsWith('/case-studies/')) return '';
  return renderToString(
    <ErrorBoundary>
      <App ssrPath={requestPath === '/' ? '/' : `${requestPath}/`} />
    </ErrorBoundary>,
  );
}
