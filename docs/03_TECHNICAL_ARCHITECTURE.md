# Technical Architecture
## Pronto System Design | May 2026

---

## Tech Stack (Locked Versions)

### Frontend

**Web (Customer + Admin)**
- Framework: **Next.js 16.2.4** (React 19.2.5)
- Styling: **Tailwind CSS 4.2.4**
- Why: Server-side rendering (SEO), shared components with mobile, fast iteration

**Mobile (iOS + Android)**
- Framework: **Expo 54.0.34** (React Native 0.81.5)
- State: **Zustand 5** (lightweight state management)
- Navigation: **React Navigation 7** (bottom tabs + stack)
- Why: Single codebase for iOS/Android, Expo Go for live preview, fast hot reload

### Backend

**Database**
- **Supabase** (PostgreSQL) — Frankfurt location (EU-compliant)
- Real-time: **Supabase Channels** (live chat, job updates)
- Auth: **Supabase Auth** (JWT-based, built-in)
- Storage: **Supabase Storage** (photos, documents)

**Why Supabase?**
- PostgreSQL reliability + ACID transactions (critical for escrow)
- Real-time pub/sub out of box (live job updates)
- Built-in auth (no separate Auth0 costs)
- EU-hosted (Frankfurt)
- Generous free tier ($0 for MVP)

### Payments

**Stripe** (TEST mode)
- Escrow model: Customer → Stripe (held) → Provider
- Payout: **Stripe Connect** (built for marketplaces)
- Webhooks: Job completion triggers payout release
- Why: Industry standard, trusted, GDPR-compliant, mature payout system

### Infrastructure

**Hosting**
- Web: **Vercel** (Next.js hosting, €0–50/month)
- Mobile: **Expo Go** (dev), **EAS Build** (production)
- Database: **Supabase Cloud** (€0–200/month)
- Storage: **Supabase Storage** (€0–100/month)

**Monitoring**
- **Sentry** (error tracking, €0–30/month)
- **PostHog** (analytics, €0–50/month)

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                         │
├──────────────────┬──────────────────┬──────────────────┤
│   Web App        │   Mobile App     │   Admin Panel    │
│   (Next.js)      │   (React Native) │   (Next.js)      │
│   localhost:3000 │   Expo Go        │   localhost:3001 │
└──────────────────┴──────────────────┴──────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                    API Layer (PostgREST)                │
│                    Supabase Auto-API                    │
└─────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────┐
│                  Data Layer                             │
├────────────────┬──────────────┬──────────────┬─────────┤
│  PostgreSQL    │ Real-time    │ Storage      │ Auth    │
│  (14 tables)   │ Channels     │ (photos)     │ JWT     │
└────────────────┴──────────────┴──────────────┴─────────┘
                           ↓
┌────────────────────────────────────────────────────────┐
│            External Services                           │
├──────────────────┬──────────────────┬─────────────────┤
│    Stripe        │  Google Maps     │  SendGrid       │
│  (Payments)      │  (Navigation)    │  (Email)        │
└──────────────────┴──────────────────┴─────────────────┘
```

---

## Database Schema (14 Tables)

### Core Tables

**users**
- id (UUID)
- email (unique)
- password_hash
- user_type (customer / provider / admin)
- stripe_customer_id (for customer payments)
- stripe_account_id (for provider payouts)
- created_at, updated_at

**profiles**
- user_id (FK → users)
- full_name
- avatar_url
- bio
- rating (1.0–5.0)
- jobs_completed (count)
- response_time_mins (average)
- location (lat, lng)
- verified (boolean)

**services**
- id (UUID)
- name (e.g., "Plumbing")
- description
- icon_url
- category

**provider_services**
- provider_id (FK → users)
- service_id (FK → services)
- hourly_rate (€)
- is_available (boolean)
- availability_schedule (JSON)

### Transaction Tables

**bookings**
- id (UUID)
- customer_id (FK → users)
- provider_id (FK → users, nullable until accepted)
- service_id (FK → services)
- status (pending / accepted / in_progress / completed / cancelled / disputed)
- title (job description)
- description
- location (address, lat, lng)
- scheduled_at (date/time)
- total_amount (€)
- completion_photo_url (uploaded after job)
- created_at, updated_at

**payments**
- id (UUID)
- booking_id (FK → bookings)
- customer_id (FK → users)
- provider_id (FK → users)
- amount (€)
- status (pending / captured / released / refunded)
- payment_method_type (stripe_card / mb_way / bank_transfer / other)
- stripe_payment_intent_id
- stripe_charge_id
- held_until (when escrow releases)
- created_at, updated_at

**payouts**
- id (UUID)
- provider_id (FK → users)
- amount (€, after commission)
- status (pending / processing / completed / failed)
- stripe_payout_id
- bank_account_id (FK → bank_accounts)
- requested_at
- processed_at
- created_at, updated_at

### Trust & Safety Tables

**reviews**
- id (UUID)
- booking_id (FK → bookings)
- reviewer_id (FK → users, who wrote it)
- reviewee_id (FK → users, who got reviewed)
- rating (1–5)
- title
- comment
- UNIQUE(booking_id, reviewer_id) — allows both customer + provider to review same booking
- created_at

**disputes**
- id (UUID)
- booking_id (FK → bookings) — UNIQUE
- customer_id (FK → users)
- provider_id (FK → users)
- reason (text description)
- evidence_url (customer-uploaded photo/documents)
- status (open / resolved / closed)
- admin_decision (customer / provider / split)
- admin_notes
- created_at, resolved_at

**identity_verification**
- id (UUID)
- provider_id (FK → users)
- status (pending / approved / rejected / expired)
- id_type (passport / driver_license / national_id)
- verification_id (from Stripe/Veriff)
- verified_at
- expires_at

**bank_accounts**
- id (UUID)
- provider_id (FK → users)
- iban (unique)
- account_name
- country
- verified (boolean)

### Communication & Logging

**messages**
- id (UUID)
- booking_id (FK → bookings)
- sender_id (FK → users)
- recipient_id (FK → users)
- text
- is_read (boolean)
- created_at

**notifications**
- id (UUID)
- user_id (FK → users)
- type (job_accepted / message_received / payment_released / etc)
- title
- body
- data (JSON)
- is_read (boolean)
- created_at

**audit_logs**
- id (UUID)
- user_id (FK → users)
- action (login / booking_created / payment_released / dispute_filed / etc)
- resource_type (booking / payment / dispute / etc)
- resource_id
- changes (JSONB — before/after values)
- ip_address
- user_agent
- created_at

---

## Data Flow

### Booking Creation Flow

```
Customer fills booking form
    ↓
Validates service_id, date, location
    ↓
Creates booking (status: pending)
    ↓
Creates payment (status: pending)
    ↓
Sends to Stripe (creates PaymentIntent)
    ↓
Customer confirms payment
    ↓
Stripe charges card
    ↓
Payment marked "captured" (funds in escrow)
    ↓
Broadcast to all providers in that service category
    ↓
Provider accepts
    ↓
Booking status: accepted
    ↓
Real-time notification to customer (via Supabase channel)
```

### Job Completion Flow

```
Provider marks job complete
    ↓
Uploads completion photo
    ↓
Booking status: in_progress → completed
    ↓
Triggers Stripe webhook
    ↓
Payment status: captured → pending_release
    ↓
Customer gets 24-hour dispute window
    ↓
If no dispute → auto-release payment
    ↓
Stripe creates payout to provider
    ↓
Payment status: released
    ↓
Provider can withdraw (instant or scheduled)
    ↓
Both sides can rate each other
```

---

## Real-Time Architecture

### Supabase Channels (WebSocket-based)

**Job status updates:**
```
Customer subscribes to: bookings:${booking_id}
Provider emits event: { status: "in_progress" }
Customer sees update instantly (no page reload)
```

**Live chat:**
```
Both parties subscribe to: messages:${booking_id}
One sends message
Other receives instantly via WebSocket
Typing indicator possible (future feature)
```

**Job notifications:**
```
Provider subscribes to: jobs:${provider_id}
New job in their category is posted
Provider gets real-time notification + sound alert
```

### Why Real-Time Matters

- **Bookings:** Customer sees status change live (accepted → in progress)
- **Chat:** No refresh needed, instant conversation
- **Job feed:** New jobs appear immediately for providers (no polling)

---

## Security & Compliance

### Authentication

- **Supabase Auth:** JWT-based, secure session handling
- **Token refresh:** Auto-refresh before expiration
- **Device verification:** Optional 2FA (future)

### Payment Security

- **PCI DSS Level 1:** Stripe handles all card data (we never see raw cards)
- **Escrow model:** Funds never go directly to providers (safer for customers)
- **Webhooks:** Verify Stripe signature on every webhook

### Data Protection (GDPR)

- **Encryption at rest:** Supabase default (all data encrypted)
- **Encryption in transit:** TLS 1.3 (HTTPS)
- **Right to erasure:** Customer can request all data deleted (implemented in admin panel)
- **Data minimization:** Collect only what we need
- **DPA:** Signed with Stripe (they're a data processor)

### Database Security

- **RLS (Row-Level Security):** Enabled pre-launch
  - Customers see only their own bookings
  - Providers see only jobs in their service categories + their own messages
  - Admin sees all data

- **Foreign key constraints:** Prevent orphaned records
- **Indexes:** 18 indexes on query paths (performance + consistency)

---

## Scalability Considerations

### Current Capacity (MVP)

**Supabase free tier:**
- 50,000 API calls/month (plenty for MVP)
- 1GB storage (photos not a bottleneck yet)
- 500MB database size (14 tables × 1,000 bookings = small)

**Vercel free tier:**
- 100 deployments/month
- 50GB bandwidth/month

### Scaling Path (Year 1+)

| Milestone | Trigger | Changes |
|-----------|---------|---------|
| **100 customers** | Current setup | No changes needed |
| **500 customers** | Free tier limit | Move to Supabase "Growth" plan (€25/month) |
| **1,000+ customers** | Real-time performance | Add Redis cache, db read replicas |
| **10,000+ customers** | Write contention | Sharding by city (separate db per city) |
| **50,000+ customers** | National scale | Microservices: Auth, Payments, Notifications |

### Caching Strategy

**Redis (future):**
- Cache provider profiles (queries per 100 customers = 10s → ms)
- Session storage (faster than db lookups)
- Rate limiting (prevent abuse)

**CDN (future):**
- Static assets (Vercel does this automatically)
- Images (Supabase + Cloudflare CDN)

---

## Monitoring & Observability

### Error Tracking

**Sentry:** Captures all errors from web + mobile
- Stack traces
- User context (who hit error)
- Device info (browser, OS)
- Severity levels (critical errors get alerts)

### Analytics

**PostHog:** Product analytics
- User funnels (signup → first booking)
- Feature usage (which providers most popular)
- Retention (customers returning)
- Churn (when customers stop using)

### Logging

**Supabase audit_logs table:**
- Every important action logged (login, booking, payment, dispute)
- Timestamp, user, IP address
- Changes tracked (what changed, before/after)

### Alerts

**Automatic alerts when:**
- Booking completion rate drops below 70%
- Payment success rate drops below 95%
- Error rate exceeds 1%
- System downtime > 5 min

---

## Deployment & CI/CD

### Current Workflow

**Commits → GitHub → Manual deployment**
- Code committed to `main` branch
- Vercel auto-deploys web + admin on commit
- Mobile app pushed to Expo EAS

**Future: GitHub Actions**
- Auto-run TypeScript checks
- Auto-run unit tests
- Auto-deploy on passing tests
- Email alerts on deploy failures

---

## Tech Debt & Future Improvements

### TypeScript

✅ Strict mode enabled (catches errors)
⚠️ Some `any` types in message service (should fix before scaling)

### Error Handling

✅ Try/catch on all API calls
⚠️ Some screens missing error states (future: make mandatory)

### Testing

❌ No unit tests yet (prioritize after launch)
❌ No E2E tests yet (prioritize Month 2)

### Performance

⚠️ Bundle size: Mobile app is 45MB (reduce to <30MB)
⚠️ Image optimization: Photos not optimized (causes slow loads)
✅ Database queries optimized (18 indexes in place)

---

## Why This Stack?

| Decision | Why | Alternatives Considered |
|----------|-----|------------------------|
| **Next.js** | SSR for web (SEO), shared components | Vue, Nuxt, plain React |
| **React Native** | Single codebase iOS/Android | Flutter, native Swift/Kotlin |
| **Supabase** | PostgreSQL + real-time + auth built-in | Firebase, custom Node+DB, AWS Amplify |
| **Stripe** | Escrow, marketplace-ready, GDPR | Square, PayPal (no escrow), custom |
| **Tailwind** | Fast dev, consistent design, small bundle | Material UI, styled-components, custom CSS |
| **Zustand** | Minimal, no boilerplate | Redux, MobX, Context API |

---

## Known Limitations & Constraints

### MVP Constraints

**Stripe is TEST mode only**
- Customer charges go nowhere
- Provider payouts are DB mocks
- Fix: Switch to production keys (2-hour change)

**Photos not wired yet**
- Photo picker exists but not integrated
- Fix: Add expo-image-picker + Supabase Storage upload (2 hours)

**Push notifications not configured**
- Real-time in-app only
- Fix: expo-notifications + APNs/FCM (3 hours)

**Maps not integrated**
- Navigation placeholder only
- Fix: Google Maps API + expo-location (3 hours)

### Acceptable for MVP

- No background jobs (future: Bull + Redis)
- No offline support (future: WatermelonDB)
- No advanced search (future: Elasticsearch)
- No recommendation engine (future: ML)

---

**Version:** 1.0  
**Last updated:** May 4, 2026  
**Maintainer:** @Chris-M106
