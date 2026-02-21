## PR Template

<!--- Provide a general summary of your changes in the Title above. -->

**Suggested title:** `feat: builder UI with component library sidebar and canvas`

### Description

<!--- Describe your changes in detail -->

- **Config & dependencies:** Updated `.gitignore`, `package.json`, `package-lock.json`, and `prisma.config.ts`.
- **Database:** Added Prisma migration and seed for the component library (User, Project, ComponentLibrary).
- **Types:** Introduced AST node types for the builder (`types/AstNode.type.ts`).
- **API:** Added server action and service to fetch components from the library (`action/ComponentLibrary.action.ts`, `service/ComponentLibrary.service.ts`).
- **State:** Added `useCanvas` hook (Zustand) to manage components on the canvas.
- **Styles:** Global CSS variables (color palette, typography with clamp, spacing, radius), semantic utility classes (e.g. `bg-primary`, `text-typography-heading`), and dashboard/canvas layout tokens.
- **App layout:** Main page with left sidebar (library) and right canvas area; route-level loading UI with spinner.
- **Components:**
  - **UI:** `Spinner` (loading), `EmptyFallback` (empty state with optional message prop).
  - **Build:** `LibInterface` (library list with Plus icon to add items), `Canva` (dashed-border area where components render).
  - **Renderer:** `ComponentRender` supports Button, Text (with configurable tag: h1–h6, p, span), and Card (with children).

### Types of changes

<!--- What types of changes does your code introduce? Put an `x` in all the boxes that apply: -->

- [ ] fix: A bug fix
- [x] feat: A new feature
- [ ] refactor: A code change that neither fixes a bug nor adds a feature
- [x] enhancement: An enhancement makes something better
- [ ] test: Adding missing tests or correcting existing tests
- [ ] perf: A code change that improves performance
- [ ] docs: Documentation only changes
- [x] style: Changes that do not affect the meaning of the code (e.g. prettier format)
- [ ] ci: Changes to our CI configuration files and scripts
- [x] chore: Changes to the build process or auxiliary tools and libraries functionality to not work as expected

---

Hours Required:
