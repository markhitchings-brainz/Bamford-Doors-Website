import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Link, useLocation } from 'wouter';
import { Cookie, X } from 'lucide-react';
import './cookie-consent.css';

const STORAGE_KEY = 'bamford-cookie-preferences-v1';

type CookiePreferences = {
  version: 1;
  essential: true;
  externalMedia: boolean;
};

type CookieConsentContextValue = {
  externalMediaAllowed: boolean;
  openPreferences: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

function parsePreferences(value: string | null): CookiePreferences | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as Partial<CookiePreferences>;
    if (parsed.version !== 1 || typeof parsed.externalMedia !== 'boolean') return null;
    return { version: 1, essential: true, externalMedia: parsed.externalMedia };
  } catch {
    return null;
  }
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used inside CookieConsentProvider');
  }
  return context;
}

export function CookieSettingsButton({
  className = '',
  children = 'Cookie settings',
}: {
  className?: string;
  children?: ReactNode;
}) {
  const { openPreferences } = useCookieConsent();
  return (
    <button
      className={`cookie-settings-button ${className}`.trim()}
      type="button"
      onClick={openPreferences}
    >
      <Cookie size={14} aria-hidden="true" />
      {children}
    </button>
  );
}

function ConsentAction({
  className,
  children,
  onClick,
}: {
  className: string;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button className={`cookie-consent-action ${className}`} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

function CookieConsentDialog({
  open,
  onOpenChange,
  externalMedia,
  onExternalMediaChange,
  onAcceptAll,
  onRejectOptional,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  externalMedia: boolean;
  onExternalMediaChange: (value: boolean) => void;
  onAcceptAll: () => void;
  onRejectOptional: () => void;
  onSave: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="cookie-preferences-dialog"
      aria-labelledby="cookie-preferences-title"
      aria-describedby="cookie-preferences-description"
      onCancel={(event) => {
        event.preventDefault();
        onOpenChange(false);
      }}
      onClose={() => onOpenChange(false)}
      onClick={(event) => {
        if (event.target === event.currentTarget) onOpenChange(false);
      }}
    >
      <button
        className="cookie-preferences-close"
        type="button"
        aria-label="Close preferences"
        onClick={() => onOpenChange(false)}
      >
        <X size={18} aria-hidden="true" />
      </button>
      <div className="cookie-preferences-heading">
        <p className="cookie-consent-eyebrow">Bamford Doors · Your choice</p>
        <h2 className="cookie-preferences-title" id="cookie-preferences-title">
          Cookie and privacy preferences
        </h2>
        <p className="cookie-preferences-description" id="cookie-preferences-description">
          Choose whether to allow optional external media. Your choice is
          stored on this device and can be changed at any time using Cookie
          settings in the footer.
        </p>
      </div>

      <div className="cookie-preference-list">
        <div className="cookie-preference-row">
          <input type="checkbox" checked disabled aria-label="Essential storage is always on" />
          <div>
            <strong>Essential</strong>
            <p>
              Always on. Used to remember your privacy choice and support
              core website functions.
            </p>
          </div>
          <span className="cookie-preference-status">Required</span>
        </div>

        <label className="cookie-preference-row cookie-preference-optional">
          <input
            type="checkbox"
            checked={externalMedia}
            onChange={(event) => onExternalMediaChange(event.currentTarget.checked)}
          />
          <div>
            <strong>External video</strong>
            <p>
              Allow YouTube and Vimeo videos to load. These providers may
              receive technical information and use their own cookies.
            </p>
          </div>
          <span className="cookie-preference-status">Optional</span>
        </label>
      </div>

      <p className="cookie-preferences-links">
        Read the{' '}
        <Link href="/cookie-policy/" onClick={() => onOpenChange(false)}>
          Cookie Policy
        </Link>{' '}
        and{' '}
        <Link href="/privacy-policy/" onClick={() => onOpenChange(false)}>
          Privacy Policy
        </Link>.
      </p>

      <div className="cookie-preferences-actions">
        <ConsentAction className="cookie-action-secondary" onClick={onRejectOptional}>
          Reject optional
        </ConsentAction>
        <ConsentAction className="cookie-action-secondary" onClick={onSave}>
          Save my choices
        </ConsentAction>
        <ConsentAction className="cookie-action-primary" onClick={onAcceptAll}>
          Accept all
        </ConsentAction>
      </div>
    </dialog>
  );
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [draftExternalMedia, setDraftExternalMedia] = useState(false);

  useEffect(() => {
    try {
      setPreferences(parsePreferences(window.localStorage.getItem(STORAGE_KEY)));
    } catch {
      setPreferences(null);
    } finally {
      setLoaded(true);
    }

    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setPreferences(parsePreferences(event.newValue));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const savePreferences = useCallback((externalMedia: boolean) => {
    const next: CookiePreferences = {
      version: 1,
      essential: true,
      externalMedia,
    };
    setPreferences(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Keep the choice for this visit if browser storage is unavailable.
    }
    setDialogOpen(false);
  }, []);

  const openPreferences = useCallback(() => {
    setDraftExternalMedia(preferences?.externalMedia ?? false);
    setDialogOpen(true);
  }, [preferences]);

  const contextValue = useMemo(
    () => ({
      externalMediaAllowed: preferences?.externalMedia === true,
      openPreferences,
    }),
    [openPreferences, preferences],
  );

  const isAdmin = location === '/admin' || location.startsWith('/admin/');

  return (
    <CookieConsentContext.Provider value={contextValue}>
      {children}
      {loaded && !isAdmin && preferences === null && (
        <section className="cookie-consent-banner" aria-label="Cookie consent">
          <div className="cookie-consent-copy">
            <p className="cookie-consent-eyebrow">Bamford Doors · Cookie consent</p>
            <h2>Choose what you allow.</h2>
            <p>
              Essential storage remembers your choice. You can allow optional
              YouTube and Vimeo videos, or keep them blocked. Read our{' '}
              <Link href="/cookie-policy/">Cookie Policy</Link> and{' '}
              <Link href="/privacy-policy/">Privacy Policy</Link>.
            </p>
          </div>
          <div className="cookie-consent-actions">
            <button
              className="cookie-consent-manage"
              type="button"
              onClick={openPreferences}
            >
              Manage preferences
            </button>
            <div className="cookie-consent-choice-buttons">
              <ConsentAction
                className="cookie-action-secondary"
                onClick={() => savePreferences(false)}
              >
                Reject optional
              </ConsentAction>
              <ConsentAction
                className="cookie-action-primary"
                onClick={() => savePreferences(true)}
              >
                Accept all
              </ConsentAction>
            </div>
          </div>
        </section>
      )}
      {loaded && !isAdmin && (
        <CookieConsentDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          externalMedia={draftExternalMedia}
          onExternalMediaChange={setDraftExternalMedia}
          onAcceptAll={() => savePreferences(true)}
          onRejectOptional={() => savePreferences(false)}
          onSave={() => savePreferences(draftExternalMedia)}
        />
      )}
    </CookieConsentContext.Provider>
  );
}

