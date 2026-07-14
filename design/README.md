# Handoff: Bíblia Expositor — Redesign

## Overview
Plataforma de estudo bíblico pessoal focada em leitura profunda, comentários (Expositor + Aplicação Pessoal), favoritos, histórico e navegação bíblica completa. Público: leitores diários de Bíblia, 25–65 anos, que priorizam legibilidade e estudo sério sobre efeitos visuais.

## About the Design Files
The files in this bundle are **design references built in HTML** — an interactive prototype demonstrating intended look, layout, and behavior. They are not production code to copy verbatim. The task is to **recreate this design in the target codebase's stack (React + Vite + TypeScript + Supabase, per the product brief)**, using that stack's own component patterns, state management, and data layer — not by embedding this HTML directly.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and interaction states in the prototype are final-intent. Recreate pixel-close using the values in "Design Tokens" below.

## Responsive scope
The prototype is fully responsive and includes three breakpoints, all functional and navigable in the same file (resize the browser window to see each):
- **Desktop** (≥1080px): fixed left sidebar (bible navigation), reading column + comments column side by side.
- **Tablet** (720–1079px): sidebar becomes an overlay drawer (opened via the menu icon); reading and comments stack in one column.
- **Mobile** (<720px): sidebar is a full-height overlay drawer; reading and comments stack; a 5-item bottom tab bar (Ler / Buscar / Favoritos / Histórico / Menu) replaces top-bar icon navigation as the primary nav; top bar collapses to icon-only (logo wordmark hidden); search opens as a full-screen overlay.

## Screens / Views

### 1. Reading (default view)
**Purpose:** Core scripture reading + commentary experience.
**Layout:** Top bar (64px) + body row (sidebar + main). Main content is a max-width 1280px centered container; on desktop, `display:flex; flex-direction:row` with a reading column (flex:1, max-width 660px, padding-right 48px) and a comments column (width 380px, left border, padding-left 32px). On tablet/mobile, `flex-direction:column`, both columns full width, comments column gets a top border instead of left border.

**Components:**
- **Chapter header**: book+chapter title (Crimson Pro, 34px desktop / 28px mobile, weight 600) + meta line below (12.5px, muted, shows verse range e.g. "Mostrando versículos 14–21 de 36", or "Mostrando somente o versículo 16 de 36" in single-verse mode).
- **"Ver somente este versículo" toggle**: pill button next to header actions; toggles between showing the full chapter's verse list and filtering to just the selected verse. Label flips to "Ver capítulo inteiro" when active. Active state: accent-colored border/text/background tint.
- **Favorite button**: star icon, 34×34px, filled with accent color when the current verse is saved.
- **Share button**: same size, copies "Book Chapter:Verse — text" to clipboard, shows a toast.
- **Verse list**: each verse is a clickable row (padding 10px 12px, border-radius 8px) with a verse-number badge (Crimson Pro, 12.5px) and the verse text (Crimson Pro, 19.5px desktop / 18px mobile, line-height 1.75). The row background tints to accentSoft when selected. Verse 1 of any chapter renders a drop cap: first letter split out at 42px, floated left, accent color, weight 600, manuscript-inspired.
- **Chapter nav row**: two full-width buttons "← Capítulo anterior" / "Próximo capítulo →", disabled/dimmed at the ends of the available sample content.
- **Comments panel**: two tabs, "Expositor" and "Aplicação Pessoal" (underline-style active indicator, accent color). **Expositor** shows verse-by-verse commentary — only the comment matching the currently selected verse. **Aplicação Pessoal** shows commentary by passage/range — filtered to comments whose range includes the selected verse, each preceded by a pill tag "Aplica-se a {Book} {Chapter}:{start}–{end}" when the range spans more than one verse. Each tab has an empty state message when no matching comment exists.
- **Loading state**: switching chapters shows 5 shimmering skeleton bars (380ms) before verses render.
- **Empty state**: chapters not in the sample dataset show a centered icon + "Este capítulo ainda não está neste protótipo" message with guidance to try the 3 available sample chapters.

### 2. Favorites
**Purpose:** Browse and manage saved verses.
**Layout:** Centered column, max-width 860px. Header row: title + search input (filters by reference or text). Grouped by book (group label in accent color, Crimson Pro 15px), each favorite is a card (surface bg, 1px border, 10px radius, 16px padding) showing reference, saved date, verse snippet, and a "Remover" text-button. Empty state when no favorites exist.

### 3. History
**Purpose:** Resume recent reading.
**Layout:** Same page shell as Favorites, no search. Each entry is a card with reference, relative date, snippet, and "Continuar leitura →" button that jumps back into the Reading view at that verse. Capped at 12 most-recent entries (deduplicated by reference, most-recent-first). Empty state when no history exists yet.

### 4. Search (overlay, all views)
**Purpose:** Universal search — accepts full references ("João 3:16"), abbreviations ("jo 3:16"), plain chapter refs ("romanos 8"), or topical words ("amor", "fé", "salvação").
**Layout:** Fixed full-screen dark backdrop; centered modal (640px desktop, full-screen on mobile) with a top search-input row (magnifying-glass icon + input + "Fechar" button) and a scrollable results area divided into three optional sections: **Versículos**, **Comentários** (labeled with source: Expositor / Aplicação Pessoal), **Histórico recente**. Each result row is clickable and navigates directly into Reading at that verse. Shows an empty/no-results state when the query matches nothing.

### 5. Bible navigation (sidebar / drawer)
**Purpose:** Browse all 66 books canonically and jump to any chapter.
**Layout:** Two sections, "Antigo Testamento" (39 books) and "Novo Testamento" (27 books), each book is a row button that expands inline into a wrapping grid of chapter-number buttons. Chapters that have sample content available are highlighted (accent border/bg/text, bold); others are muted but still clickable (they route to the Reading view's empty state). On desktop the panel is pinned (272px, part of the layout flow); on tablet/mobile it's a fixed-position overlay drawer with a semi-transparent backdrop, opened via the top-bar / bottom-nav "Menu" button.

## Interactions & Behavior
- **Theme toggle** (sun/moon icon in top bar): switches light/dark instantly, persisted to localStorage (`be_theme`).
- **Favorites**: persisted to localStorage (`be_favorites`) as `[{ref, book, chapter, verse, text, savedAt}]`.
- **History**: persisted to localStorage (`be_history`) as `[{ref, book, chapter, verse, text, ts}]`, capped at 12, most-recent-first, deduplicated by ref.
- **Toast**: bottom-centered pill notification (favorite added/removed, reference copied), auto-dismisses after 2.2s.
- **Chapter switch**: triggers a brief loading/skeleton state (~380ms) before rendering verses — simulates data fetch latency for a future API-backed version.
- **Navigating from Search/Favorites/History**: closes any open overlay, switches to Reading view, sets the target book/chapter/verse, and sets the comment tab to match if coming from a comment search result.
- No animations beyond a 150ms fade-in on the search overlay and the loading shimmer — the brief calls for extremely subtle motion only.

## State Management
Key state: `theme` (light/dark), `view` (reading/favorites/history), `navOpen`, `expandedBook`, `searchOpen` + `searchQuery`, `favSearchQuery`, `commentTab` (expositor/aplicacao), `currentBook`/`currentChapter`/`selectedVerse`, `singleVerseMode`, `loading`, `favorites[]`, `history[]`, `toast`. Viewport width is tracked via a resize listener to drive the three responsive layouts (no CSS media queries were used in the prototype — the target implementation should use real CSS media queries / container queries instead).

Bible content data (66-book list with chapter counts, and the 3 fully-populated sample chapters — João 3:14–21, Salmos 23:1–6, Gênesis 1:1–5, each with Expositor + Aplicação Pessoal commentary) lives in `bible-data.js`. In production this should be replaced by a Supabase-backed API serving all 66 books / 31k+ verses / full commentary sets.

## Design Tokens

### Colors — Light theme
- Background: `#f7f2e6`
- Surface: `#fffcf6`
- Surface alt (inputs, hover fills): `#f0e8d7`
- Border: `#e0d4b8`
- Ink (primary text): `#2b2420`
- Ink soft (secondary text): `#6c5f4d`
- Accent (burnt sienna): `#8a4a2f`
- Accent soft (tints/tags): `#f1e2ce`
- Shadow: `rgba(60,45,20,0.08)`

### Colors — Dark theme ("night library")
- Background: `#1c1712`
- Surface: `#242019`
- Surface alt: `#2b2419`
- Border: `#3d3327`
- Ink: `#ece3d0`
- Ink soft: `#b3a58c`
- Accent (warm gold): `#d7a25f`
- Accent soft: `#3a2f20`
- Shadow: `rgba(0,0,0,0.35)`

### Typography
- Scripture / headings: **Crimson Pro** (serif), weights 400/500/600/700, italic 400 available.
- UI text: **Work Sans** (sans), weights 400/500/600/700.
- Scale: chapter title 34px/28px(mobile) · verse text 19.5px/18px(mobile) line-height 1.75 · comment body 15.5px line-height 1.75 · body/UI 13–14px · labels/meta 11–12.5px.

### Spacing / shape
- Border radius: 6–10px for cards/buttons, 999px for pills/tags/toast.
- Card border: 1px solid border color, no heavy shadows (shadows are ambient, low-opacity only).
- Reading container max-width: 1280px · reading column max-width: 660px · comments column width: 380px.

## Assets
No external images. Icons are inline SVG (line icons, 16–19px, stroke-based, `currentColor`). Fonts loaded from Google Fonts (Crimson Pro, Work Sans).

## Files
- `Biblia Expositor.dc.html` — full interactive prototype (single file, all views/states/breakpoints).
- `bible-data.js` — sample content module (66-book list, abbreviation map, 3 sample chapters with commentary).

Open `Biblia Expositor.dc.html` directly in a browser to explore the live prototype; resize the window to see the tablet/mobile breakpoints.
