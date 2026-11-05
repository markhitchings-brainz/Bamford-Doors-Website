export function DetailSkeleton() {
  return (
    <main className="cs-page" aria-busy="true" data-testid="status-cs-detail-loading">
      <section className="cs-hero cs-detail-hero">
        <div className="cs-wrap cs-skeleton">
          <div className="cs-crumbs"><i style={{ width: 180 }} /></div>
          <i className="cs-sk-title" /><i className="cs-sk-title cs-sk-short" />
        </div>
      </section>
      <div className="cs-wrap cs-skeleton"><div className="cs-sk-image" /></div>
      <span className="cs-sr">Loading case study</span>
    </main>
  );
}
