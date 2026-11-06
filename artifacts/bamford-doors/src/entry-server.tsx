import { renderToPipeableStream } from 'react-dom/server';
import { PassThrough } from 'node:stream';
import App, { getSeoRoutes } from './App';
import { ErrorBoundary } from './components/error-boundary';

export { getSeoRoutes };

export async function renderPage(requestPath: string) {
  // Studio is intentionally client-only. CMS case-study details also retain
  // their client data loading; their build-time metadata is generated separately.
  // Do not serialize lazy boundaries or loading skeletons as full page content.
  if (requestPath === '/admin' || requestPath.startsWith('/admin/') || requestPath.startsWith('/case-studies/')) return '';
  // Wait for route modules rather than serializing a Suspense loading fallback.
  return new Promise<string>((resolve, reject) => {
    const output = new PassThrough();
    let html = '';
    output.setEncoding('utf8');
    output.on('data', (chunk) => { html += chunk; });
    output.on('end', () => resolve(html));
    output.on('error', reject);
    const timeout = setTimeout(() => {
      stream.abort();
      reject(new Error(`Static rendering timed out: ${requestPath}`));
    }, 30000);
    output.on('close', () => clearTimeout(timeout));
    const stream = renderToPipeableStream(
      <ErrorBoundary>
        <App ssrPath={requestPath === '/' ? '/' : `${requestPath}/`} />
      </ErrorBoundary>,
      {
        onAllReady() { stream.pipe(output); },
        onShellError(error) { clearTimeout(timeout); reject(error); },
        onError(error) { clearTimeout(timeout); reject(error); },
      },
    );
  });
}
