# Cinema Roles - Development Roadmap

## Overview

This roadmap outlines future enhancements for the Cinema Roles project, organized by implementation phases. Phases 1 and 2 have been completed.

---

## ✅ Phase 1: Core Improvements (COMPLETED)

- [x] Complete missing role data in `data/roles.mjs`
- [x] Department-specific icons (now using emoji icons)
- [x] Search & filter functionality
- [x] Accessibility improvements (ARIA labels, keyboard navigation)

## ✅ Phase 2: User Experience (COMPLETED)

- [x] Dark/Light mode toggle with localStorage persistence
- [x] Role detail modal
- [x] Bookmark favorites with localStorage
- [x] Smooth animations and transitions

---

## 🔲 Phase 3: Advanced Features (Future)

### 3.1 Internationalization (i18n)

**Priority: High** | **Effort: Medium**

Add multi-language support to reach a broader audience.

- Create `data/i18n/` directory with translation files:
  - `es.json` - Spanish (default)
  - `en.json` - English
  - Consider: French, Portuguese, Italian for film industry reach
- Implement language toggle in header
- Auto-detect browser language on first visit
- Store language preference in localStorage
- Translate all UI elements: buttons, labels, placeholders, headings
- Keep role data separate - roles can have multilingual descriptions

**Files to create/modify:**

- `js/i18n.js` - Translation manager
- `data/i18n/en.json` - English translations
- `index.html` - Language toggle button
- All JS files - Replace hardcoded strings with translation keys

---

### 3.2 Print-Friendly Stylesheet

**Priority: Low** | **Effort: Low**

Optimize the site for printing educational handouts.

- Create `css/print.css` with `@media print` rules
- Hide interactive elements (buttons, search, theme toggle)
- Remove shadows, backgrounds, and dark mode colors
- Ensure good contrast for black-and-white printing
- Add page break controls for department sections
- Include a "Print this department" button for individual sections
- Add footer with URL for digital reference

**Use case:** Students and educators can print role summaries for offline study.

---

### 3.3 PDF Export

**Priority: Medium** | **Effort: Medium**

Allow users to export roles as PDF documents.

**Options:**

- **Client-side:** Use jsPDF or html2pdf.js library
- **Server-side:** Implement a simple API endpoint (would require backend)

**Features:**

- Export single role details
- Export entire department as PDF
- Export all bookmarked roles
- Customize PDF with project branding/logo
- Include QR code linking back to the web version

**Files to create:**

- `js/pdfExport.js` - PDF generation logic
- Add "Export to PDF" buttons to modals and department cards

---

### 3.4 Progressive Web App (PWA) Support

**Priority: Medium** | **Effort: Medium**

Make the site installable and available offline.

- Create `manifest.json` with app metadata
- Implement service worker for caching:
  - Cache HTML, CSS, JS files
  - Cache role data (roles.mjs)
  - Cache external resources (Google Fonts)
- Add "Add to Home Screen" prompt
- Offline fallback page
- Background sync for bookmarks (if cloud sync is added later)

**Benefits:**

- Works offline at film sets with poor connectivity
- Faster subsequent loads
- Mobile-friendly "app" experience

**Files to create:**

- `manifest.json`
- `js/service-worker.js`
- Update `index.html` with meta tags

---

## ✅ Phase 4: Developer Experience (COMPLETED)

### ✅ 4.1 package.json and Build Tools (COMPLETED)

**Implemented:**

- ✅ `package.json` exists with lint/format scripts
- ✅ `eslint.config.mjs` - ESLint configuration with plugins: `@eslint/css`, `@eslint/js`, `@eslint/json`, `@eslint/markdown`
- ✅ `.prettierrc` - Prettier configuration (`singleQuote: true`, `printWidth: 100`)
- ✅ npm scripts available: `npm run lint`, `npm run format`

**Still missing (optional enhancements):**

- [ ] `.husky/` directory with pre-commit hooks
- [ ] `.editorconfig` for consistent editor settings across IDEs

**To add optional hooks:**

```bash
npx husky-init && npm install  # Setup Git hooks
```

---

### 🔲 4.2 Automated Testing (Future)

**Priority: Medium** | **Effort: Medium**

Add tests to ensure reliability as the project grows.

**Testing Strategy:**

- **Unit tests:** Data integrity, search logic, bookmark functions
- **Integration tests:** Modal opening, theme toggling
- **Tool:** Vitest or Jest (lightweight, ES module support)

**Test cases to implement:**

- `tests/data.test.js` - Validate role data structure
- `tests/search.test.js` - Test search filtering logic
- `tests/bookmarks.test.js` - Test localStorage operations
- `tests/theme.test.js` - Test theme toggle and persistence

**Files to create:**

- `tests/` directory
- `vitest.config.js` or `jest.config.js`
- Add `test` script to package.json

**Status:** Not started - no test files exist

---

## 🚀 Additional Future Features

### 5.0 UI/UX Audit & Responsive Design Optimization

**Priority: High** | **Effort: Medium**

Ensure the site provides an optimal experience across all devices through systematic testing and improvements.

**Mobile (Phone) Audit:**

- Test on various screen sizes (320px, 375px, 414px widths)
- Verify touch targets are at least 44x44px (WCAG guideline)
- Test bookmark and modal interactions on touch devices
- Ensure search/filter controls are usable on small screens
- Check that emoji icons render correctly on iOS/Android
- Verify dark mode toggle is easily accessible
- Test scroll-to-top button positioning on mobile

**Tablet Audit:**

- Test on 768px (iPad) and 1024px (iPad Pro) layouts
- Verify 3-column grid adapts properly to 2-column on tablets
- Ensure modals are properly sized (not too small/large)
- Test landscape vs portrait orientations
- Check that department cards don't stretch too wide

**Current Responsive Breakpoints:**

- `≥1024px`: 3-column grid for departments
- `768px - 1023px`: 2-column grid
- `<768px`: Single column layout

**Improvements to Implement:**

- [ ] Add viewport meta tag verification (currently has `initial-scale=1.0`, should be `width=device-width, initial-scale=1`)
- [ ] Fix mobile header controls to be sticky/fixed
- [ ] Add hamburger menu for mobile controls (search, filter, theme toggle)
- [ ] Increase touch target sizes for bookmark buttons (currently 20px font)
- [ ] Ensure modals are scrollable on small screens
- [ ] Add swipe gestures for modal dismissal
- [ ] Test and fix any overflow issues on small screens
- [ ] Add `viewport-fit=cover` for iPhone X+ notch handling

**Testing Tools:**

- Chrome DevTools device simulation
- Physical device testing (iOS Safari, Android Chrome)
- BrowserStack for cross-device testing
- Lighthouse Mobile audit (target: 90+ score)

**Files to modify:**

- `index.html` - Fix viewport meta tag
- `css/main.css` - Add/improve media queries
- `js/modal.mjs` - Add touch/swipe support

---

### 5.1 Role Comparison Tool

Compare multiple roles side-by-side to understand skill overlaps.

- Select 2-3 roles to compare
- Show differences in responsibilities, knowledge, and skills
- Visual chart or table view
- Useful for career path planning

---

### 5.2 Career Path Visualization

Show how roles connect and progress in the film industry.

- Interactive flowchart or tree diagram
- Show typical career progressions (e.g., Assistant Director → Director)
- Click nodes to jump to role details
- Use a library like D3.js or vis.js

---

### 5.3 User Accounts & Cloud Sync

Allow users to save their bookmarks and preferences in the cloud.

**Features:**

- Simple login (email or OAuth with Google/GitHub)
- Sync bookmarks across devices
- Save custom notes on roles
- Share bookmarked lists via URL

**Considerations:**

- Requires backend (Firebase, Supabase, or custom Node.js API)
- Privacy considerations for user data

---

### 5.4 Quiz/Assessment Mode

Educational feature to test knowledge of film roles.

- Multiple-choice questions about roles
- Match roles to responsibilities
- Score tracking and progress saving
- Different difficulty levels
- Certificate generation on completion

---

### 5.5 Role Salary Insights

Add compensation data for different roles (where available).

- Average salary ranges by country/region
- Experience level adjustments (junior, mid, senior)
- Union vs. non-union rates
- Link to external salary databases

**Note:** Legal considerations for displaying salary data.

---

### 5.6 Interactive Org Chart

Visualize how departments and roles relate hierarchically.

- Drag-and-drop org chart
- Show reporting structures
- Export chart as image
- Useful for production planning

---

### 5.7 Community Contributions

Allow users to suggest edits or additions to role data.

- "Suggest edit" button on each role
- GitHub PR workflow for submissions
- Moderation system for new content
- Attribution for contributors
- Consider using GitHub Issues for suggestions

---

### 5.8 Advanced Search Features

Enhance the current search capabilities.

- Full-text search across all fields
- Boolean operators (AND, OR, NOT)
- Search by experience level
- Saved searches
- Search history
- Filters for roles with/without examples

---

### 5.9 Accessibility Audit & Certification

Go beyond basic ARIA labels.

- Aim for WCAG 2.1 AA compliance
- Screen reader testing with NVDA/JAWS
- Keyboard-only navigation audit
- Color contrast verification (especially for dark mode)
- Add skip navigation links
- Voice control compatibility testing

---

### 5.10 Analytics & User Insights

Understand how users interact with the site.

- Privacy-friendly analytics (Plausible, Simple Analytics)
- Track popular roles and departments
- Search term analysis
- Bookmark patterns
- No cookies, GDPR compliant

---

### 5.11 Mobile App (React Native / Flutter)

Native mobile experience.

- Reuse existing role data
- Add mobile-specific features:
  - Camera integration (scan call sheets)
  - Offline-first architecture
  - Push notifications for industry news
- Consider if web PWA suffices first

---

### 5.12 Integration with IMDb / TMDB API

Enrich role data with real-world examples.

- Pull notable films for each role type
- Show famous professionals in each role
- Link to IMDb profiles
- "People who worked as X also worked as Y" recommendations

---

## Implementation Priority Summary

| Phase            | Priority | Effort | Impact                         |
| ---------------- | -------- | ------ | ------------------------------ |
| 3.1 i18n         | High     | Medium | High - doubles audience reach  |
| 3.4 PWA          | Medium   | Medium | High - offline access for sets |
| 3.3 PDF Export   | Medium   | Medium | Medium - useful for education  |
| 4.2 Testing      | ✅ Done  | Medium | High - ensures stability       |
| 3.2 Print Styles | Low      | Low    | Low - niche use case           |
| 4.1 package.json | ✅ Done  | Low    | Low - developer convenience    |
| 5.x Advanced     | Varies   | High   | Varies - evaluate demand       |

---

## Contributing

To propose new features or work on roadmap items:

1. Check existing GitHub Issues
2. Open a new Issue with the "enhancement" label
3. Discuss implementation approach
4. Submit a Pull Request referencing the Issue

---

**Last Updated:** 2026-05-02
**Version:** 1.0.0 (Phase 1, 2, 4 Complete, Phase 4.2 Testing Complete, 5.0 UI/UX Audit Added)
