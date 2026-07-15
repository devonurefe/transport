// Coffee Corner content store.
//
// This is a static design prototype (no backend/DB), so the admin-editable
// Coffee Corner content is persisted in the browser via localStorage — the same
// pattern the app already uses for the language toggle (LanguageContext) and the
// cookie banner (CookieBanner). A default seed is always provided so the public
// section renders meaningful content before an admin has edited anything.

export interface CoffeeCornerContent {
  /** Section heading. */
  title: string;
  /** Inviting / promotional body text. */
  description: string;
  /** Company image as a data URL (from admin upload) or a path/URL. Empty = show placeholder. */
  image: string;
  /** Call-to-action button label. */
  ctaLabel: string;
  /** Call-to-action button link. */
  ctaHref: string;
}

/** localStorage key under which the content is stored. */
export const COFFEE_CORNER_STORAGE_KEY = 'coffee_corner_content';

/** Custom event dispatched on save so an open homepage updates live in the same tab. */
export const COFFEE_CORNER_EVENT = 'coffee-corner-updated';

/** Default (seed) content — Dutch invitation copy, shown until an admin edits it. */
export const DEFAULT_COFFEE_CORNER: CoffeeCornerContent = {
  title: 'Welkom in onze Coffee Corner',
  description:
    'Bij HoogwerkerHub draait alles om gemak. Loop binnen in onze Coffee Corner, geniet van een vers gezette kop koffie en een hapje, en regel ondertussen rustig uw machineverhuur. Even ontspannen, advies inwinnen bij onze specialisten én huren — allemaal onder één dak. U bent van harte welkom!',
  image: '',
  ctaLabel: 'Plan uw bezoek',
  ctaHref: '/#contact',
};

/** Read the stored content, merged over the defaults. Safe to call on the server (returns defaults). */
export function loadCoffeeCorner(): CoffeeCornerContent {
  if (typeof window === 'undefined') {
    return DEFAULT_COFFEE_CORNER;
  }

  try {
    const raw = window.localStorage.getItem(COFFEE_CORNER_STORAGE_KEY);
    if (!raw) {
      return DEFAULT_COFFEE_CORNER;
    }
    const parsed = JSON.parse(raw) as Partial<CoffeeCornerContent>;
    // Merge over defaults so a missing/renamed field never breaks the UI.
    return { ...DEFAULT_COFFEE_CORNER, ...parsed };
  } catch {
    return DEFAULT_COFFEE_CORNER;
  }
}

/** Persist the content and notify any open homepage (same tab) to refresh. */
export function saveCoffeeCorner(content: CoffeeCornerContent): void {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(COFFEE_CORNER_STORAGE_KEY, JSON.stringify(content));
  // Same-tab live update (the native 'storage' event only fires in *other* tabs).
  window.dispatchEvent(new CustomEvent(COFFEE_CORNER_EVENT));
}
