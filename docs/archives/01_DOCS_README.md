# Pronto Documentation Hub

Everything you need to understand Pronto: business model, technical architecture, current status, and next steps.

---

## 📚 Documentation Structure

### Business & Strategy

**[BUSINESS_MANUAL.md](BUSINESS_MANUAL.md)** — 21-chapter complete business guide
- What is Pronto? (problem, solution, market)
- How we make money (pricing, commission, revenue streams)
- Customer & provider psychology
- Full user journey examples
- Legal framework (Portugal/EU)
- Partner deals & growth strategy
- What we're building next (on the drawing board)

**[PRODUCT_BLUEPRINT.md](PRODUCT_BLUEPRINT.md)** — Feature specifications
- Core features (customer, provider, admin)
- User experience flows
- Marketplace mechanics & matching logic
- Payment system & escrow flow
- Ratings & trust system
- MVP definition

### Technical & Architecture

**[TECHNICAL_ARCHITECTURE.md](TECHNICAL_ARCHITECTURE.md)** — System design
- Tech stack (why each choice)
- Database relationships (14 tables)
- Real-time architecture (Supabase channels)
- Payment flow (Stripe escrow)
- Dispute resolution flow
- Data flow between apps (web, mobile, admin)
- Scalability considerations
- Security & compliance

**[DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)** — Data model
- 14 tables detailed
- Foreign keys & relationships
- Indexes & performance
- RLS policies (row-level security)
- Sample queries

### Build Status & Roadmap

**[CURRENT_STATUS.md](CURRENT_STATUS.md)** — What's done, what's pending
- PACK 0-8 completion status
- Features built vs. planned
- Quality metrics
- Known issues & critical gaps
- Token tracking & build efficiency

**[NEXT_STEPS.md](NEXT_STEPS.md)** — Detailed execution plan
- PACK 8.1 (fix critical gaps) — 4-5 hours
- PACK 9 (admin dashboard) — 2 hours
- PACK 10 (integration test) — 1-2 hours
- Week 5 (pre-launch) — RLS, privacy policy, app store prep
- Quality gates for each phase

---

## 🚀 Quick Start for New Contributors

1. **Understand the business:** Read `BUSINESS_MANUAL.md` (20 min)
2. **Know the features:** Skim `PRODUCT_BLUEPRINT.md` (10 min)
3. **Understand the tech:** Read `TECHNICAL_ARCHITECTURE.md` (15 min)
4. **Check status:** Review `CURRENT_STATUS.md` (5 min)
5. **See what's next:** Read `NEXT_STEPS.md` (5 min)

**Total: ~55 minutes to full context**

---

## 🎯 For Different Roles

### Product Managers
1. `BUSINESS_MANUAL.md` — Strategy & positioning
2. `PRODUCT_BLUEPRINT.md` — Features & flows
3. `CURRENT_STATUS.md` — What's built
4. `NEXT_STEPS.md` — Timeline & priorities

### Developers
1. `TECHNICAL_ARCHITECTURE.md` — System design
2. `DATABASE_SCHEMA.md` — Data model
3. `CURRENT_STATUS.md` — Build progress
4. `NEXT_STEPS.md` — What to build next

### Investors / Partners
1. `BUSINESS_MANUAL.md` — Chapters 1-5 (problem, solution, market)
2. `CURRENT_STATUS.md` — What's built (proof of execution)
3. `NEXT_STEPS.md` — Timeline & milestones

### New Developers Joining
1. Start with `BUSINESS_MANUAL.md` (Chapters 1-3)
2. Read `TECHNICAL_ARCHITECTURE.md`
3. Deep dive `DATABASE_SCHEMA.md`
4. Follow `NEXT_STEPS.md` for current work

---

## 📊 Key Metrics

**Build Progress:**
- ✅ Infrastructure: 100% (PACK 0-6)
- ✅ Web landing page: 100% (PACK 7)
- ✅ Mobile app structure: 100% (PACK 8)
- ⏳ Critical gaps: 0% (PACK 8.1) — next 4-5 hours
- ⏳ Admin dashboard: 0% (PACK 9) — after PACK 8.1
- ⏳ Integration: 0% (PACK 10) — after PACK 9

**Launch Timeline:**
- Week 1: PACK 8.1 (critical gaps)
- Week 2: PACK 9-10 (admin + integration)
- Week 3: Pre-launch (RLS, legal, app store)
- **MVP Launch: May 31 — June 1, 2026**

**Tech Debt:**
- TypeScript: 0 errors (strict mode)
- Design system: 100% consistent (Navy/Blue/Teal/Amber across all apps)
- Code reuse: 40% (UI components shared web → mobile)

---

## 🔗 External Links

**GitHub Repository:**
https://github.com/Chris-M106/Pronto

**Supabase Project (Database):**
Frankfurt location (EU-compliant)

**Design System:**
- Navy: #1E2B5E
- Blue: #2D5BE3
- Teal: #0ABFBC
- Amber: #F59E0B
- Typography: Inter (weights 400/600/700)

**Deployed Apps:**
- Web: localhost:3000 (dev)
- Mobile: Expo Go (scannable QR from `npx expo start`)
- Admin: Not yet deployed (PACK 9)

---

## 📝 Document Maintenance

These docs are updated after each PACK:

- **PACK 0-8:** Updated May 4, 2026
- **PACK 8.1:** Will update May 8, 2026
- **PACK 9:** Will update May 15, 2026
- **PACK 10:** Will update May 22, 2026
- **Pre-launch:** Will update May 28, 2026

**Commit message format:**
```
PACK X: [feature] + update /docs/STATUS.md + /docs/NEXT_STEPS.md
```

This keeps documentation synchronized with code.

---

## 🤝 Contributing

Found a gap? Missing documentation? Want to clarify something?

1. Update the relevant `.md` file in `/docs`
2. Commit with: `docs: [description]`
3. Keep it up-to-date with code changes

Documentation is not optional — it's part of the product.

---

**Last updated:** May 4, 2026  
**Version:** 1.0  
**Maintainer:** @Chris-M106
