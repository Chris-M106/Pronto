# Next Steps
## Execution Roadmap: PACK 8.1 → Launch | May 2026

---

## Timeline Overview

```
Week 1 (May 8–14):  PACK 8.1 — Fix critical gaps (4-5 hours)
Week 2 (May 15–21): PACK 9 + 10 — Admin + Integration (3-4 hours)
Week 3 (May 22–28): Pre-launch — Legal, RLS, app store (2-3 hours)
Week 4 (May 29+):   LAUNCH — Go live
```

---

## PACK 8.1: Fix Critical Gaps (4-5 hours)

### Step 1: Date/Time Picker (45 min)

**What to build:**
- Replace text input in BookingFlow Step 3 ("When?")
- Add calendar UI (date selection)
- Add time picker UI (hour + minute)
- Save to `bookingStore.draft.date` and `bookingStore.draft.time`

**Implementation:**
```bash
# Install package
npm install @react-native-community/datetimepicker

# Wire into BookingFlow.tsx
# Step 3: Replace TextInput with DateTimePickerModal (or native iOS/Android pickers)
# Show selected date/time in format: "Tomorrow at 10:30 AM"
```

**Testing:**
- [ ] Open BookingFlow, go to Step 3
- [ ] Tap "Select date/time"
- [ ] Pick a date 2 days from now
- [ ] Pick a time (10:30 AM)
- [ ] Confirm selection shows "May 6 at 10:30 AM"
- [ ] Proceed to Step 4, booking shows correct date/time

**QA Gate:** ✅ Date/time persists when closing + reopening flow

---

### Step 2: Photo Upload (1 hour)

**What to build:**
- Photo picker during booking (optional, Step 2)
- Photo picker during job completion (required, TrackingScreen)
- Upload to Supabase Storage
- Store URL in bookings.completion_photo_url

**Implementation:**
```bash
# Install
npm install expo-image-picker

# In BookingFlow.tsx Step 2 (optional):
# Button: "Add photos of issue (optional)"
# Tap → photo library / camera
# Show preview, allow add/remove

# In TrackingScreen (required):
# After "Mark Complete" button is tapped
# MUST upload photo before confirming
# Show progress, handle errors
```

**Testing:**
- [ ] BookingFlow Step 2: Tap "Add photos"
- [ ] Choose photo from library
- [ ] Preview shows selected photo
- [ ] Can remove + choose different one
- [ ] Proceed to checkout
- [ ] Later: Mark job complete, upload completion photo
- [ ] Verify photo appears on provider's phone + customer's booking detail

**QA Gate:** ✅ Photos upload without errors, appear on both sides

---

### Step 3: KYC Verification Screen (1 hour)

**What to build:**
- New ProviderKYCScreen component
- Route it into SignUpScreen (after provider selects services)
- Collect:
  - ID photo (upload)
  - ID type (passport, driver license, national ID)
  - Portfolio photo (optional, for future completion proof)
  - Bio (existing)
- Save to identity_verification table with status: "pending"

**Implementation:**
```bash
# Create: apps/mobile/src/screens/Auth/ProviderKYCScreen.tsx
# Flows:
# 1. Welcome message: "Verify your identity to start accepting jobs"
# 2. ID type selector: "What ID do you have?"
# 3. ID photo upload: "Take a photo of your ID"
# 4. Portfolio (optional): "Show your past work (optional)"
# 5. Bio: "Tell customers about you"
# 6. Submit: Creates row in identity_verification with status: pending
#    Message: "Thanks! We'll review your ID within 24 hours. You can accept jobs while pending."

# Add to SignUpScreen navigation:
# After provider_services saved, route to ProviderKYCScreen
```

**Testing:**
- [ ] Sign up as provider
- [ ] Select services (plumbing, electrical, etc.)
- [ ] Redirected to KYC screen
- [ ] Upload ID photo
- [ ] Enter bio
- [ ] Tap "Submit for verification"
- [ ] Success message appears
- [ ] Booking shows user as "Verification pending" (not a blocker yet)

**QA Gate:** ✅ KYC data saved, provider can still accept jobs while pending

---

### Step 4: Stripe Payment Integration (1.5 hours)

**What to build:**
- Real Stripe payment flow (or improved mock if native SDK too complex)
- BookingFlow Step 5: "Pay" → Stripe checkout
- Handle success / failure
- Release payment on job completion

**Option A: Native Stripe SDK (Recommended)**
```bash
# Install
npm install @react-native-stripe/stripe-react-native

# In BookingFlow.tsx Step 5:
# 1. Create PaymentIntent on backend (Supabase function)
# 2. Confirm with Stripe SDK on client
# 3. Handle 3D Secure if needed
# 4. Create payment record in DB
# 5. Show confirmation + booking ID

# In TrackingScreen:
# On job completion, trigger payment release
# Stripe webhook → update payment.status to released
```

**Option B: Improved Mock (If native SDK too complex)**
```bash
# Keep DB mock, but add UI that FEELS real:
# - Show Stripe logo
# - Card field (input validation)
# - Confirmation UI
# - "Payment captured" message
# - Works end-to-end even though Stripe is mocked
# - Switch to real SDK later (30-min change)
```

**Testing:**
- [ ] BookingFlow Step 5: Enter card details (4242 4242 4242 4242 if using real Stripe TEST)
- [ ] Tap "Pay €70"
- [ ] If real SDK: Stripe modal opens, confirm
- [ ] If mock: UI shows "Payment captured"
- [ ] Booking confirmed, customer sees "Waiting for provider to accept"
- [ ] Later: Provider marks complete, release payment
- [ ] Verify in Stripe dashboard (if real) or DB (if mock) that payment released

**QA Gate:** ✅ Payment flow end-to-end (test mode)

---

### Step 5: Final QA Before PACK 9

**Run full booking flow:**
1. Customer sign up ✅
2. Search providers ✅
3. BookingFlow:
   - Step 1: Service ✅
   - Step 2: Details + optional photo ✅
   - Step 3: Date/time (NOW WORKS) ✅
   - Step 4: Estimate ✅
   - Step 5: Payment (NOW WORKS) ✅
4. Real-time notification to provider ✅
5. Provider accepts job ✅
6. Customer tracks status ✅
7. Provider marks in progress ✅
8. Provider uploads completion photo (NOW WORKS) ✅
9. Customer confirms ✅
10. Payment released ✅
11. Both sides rate ✅

**Commit:**
```bash
git add .
git commit -m "PACK 8.1: Fix critical gaps - date picker, photo upload, KYC, Stripe payment"
git push origin main
```

**Expected result:**
- TypeScript: 0 errors
- Expo: Runs clean on localhost:8081
- Manual QA: All 11 steps work
- Time: 4-5 hours total

---

## PACK 9: Admin Dashboard (2 hours)

**Location:** `apps/admin/`

### Feature 1: User Management (30 min)

**Build:**
- Table of users (id, email, name, type, status, rating)
- Filter by: customer / provider / admin
- Search by: email or name
- Actions: View profile, suspend, delete

**Implementation:**
```bash
# Create: apps/admin/pages/users.tsx
# Query: SELECT * FROM users + JOIN profiles
# Components:
#   - Table (sortable by name, rating, created_at)
#   - Filter buttons (customer/provider/admin)
#   - Search box
#   - Suspend modal (with reason)
#   - Delete modal (with confirmation)
```

**Testing:**
- [ ] Load page, see all users
- [ ] Filter by "provider" → see only providers
- [ ] Search for "João" → find João
- [ ] Tap "Suspend" → modal appears, reason required
- [ ] Submit → user status updated, can't log in
- [ ] Tap "Delete" → confirmation modal → user removed

---

### Feature 2: Dispute Resolution (30 min)

**Build:**
- List of open disputes (booking_id, customer, provider, reason, created_at)
- Detail view with: customer complaint, provider response, evidence photos
- Resolution form: Decide (customer / provider / split) + notes
- Button to release/refund payment

**Implementation:**
```bash
# Create: apps/admin/pages/disputes.tsx
# Query: SELECT * FROM disputes WHERE status = 'open'
# Detail view:
#   - Dispute reason (text)
#   - Chat history (messages between parties)
#   - Evidence photos (completion_photo_url)
#   - Decision form:
#     - Radio: "Refund customer" / "Release to provider" / "Split payment"
#     - Textarea: Admin notes
#   - Submit button: Updates dispute.status + triggers payment action
```

**Testing:**
- [ ] Create a test dispute (manually insert)
- [ ] Load disputes page, see it listed
- [ ] Tap dispute, see detail view
- [ ] Review chat + photos
- [ ] Select "Refund customer", add note
- [ ] Submit → dispute marked resolved, payment refunded

---

### Feature 3: KYC Approvals (30 min)

**Build:**
- List of pending KYC verifications (provider_id, name, service, status)
- Detail view: ID photo, portfolio photos, bio
- Actions: Approve, reject, request more info

**Implementation:**
```bash
# Create: apps/admin/pages/kyc.tsx
# Query: SELECT * FROM identity_verification WHERE status = 'pending'
# Detail view:
#   - Image gallery: ID photo, portfolio photos
#   - Provider name + service
#   - Bio
#   - Action buttons: Approve / Reject / More Info
# On approve:
#   - Update identity_verification.status = 'approved'
#   - Notification to provider: "Your ID is verified!"
# On reject:
#   - Update status = 'rejected'
#   - Require resubmit
```

**Testing:**
- [ ] Create test KYC (sign up provider, captures in KYC table)
- [ ] Load KYC page, see pending
- [ ] Tap KYC, view ID photo + bio
- [ ] Tap "Approve" → status changes, provider notified
- [ ] Go back, provider no longer shows in "pending"

---

### Feature 4: Payouts Queue (30 min)

**Build:**
- List of pending payouts (provider_id, name, amount, requested_at, status)
- Status column: pending / processing / completed / failed
- Action buttons: Approve, mark completed, reject

**Implementation:**
```bash
# Create: apps/admin/pages/payouts.tsx
# Query: SELECT * FROM payouts WHERE status IN ('pending', 'processing')
# Table:
#   - Provider name
#   - Amount
#   - Date requested
#   - Status badge
#   - Actions: Approve → Reject → Mark Completed
# Workflow:
#   - Approve: Stripe transfer initiated, status = 'processing'
#   - Mark Completed: status = 'completed', notification sent
```

**Testing:**
- [ ] Provider requests payout (books job, job completes, payout request button exists)
- [ ] Admin page shows pending payout
- [ ] Tap "Approve" → status changes to "processing"
- [ ] Tap "Mark Completed" → status = "completed"
- [ ] Verify in provider app, payout shows as completed

---

### Step 2: Polish & QA (20 min)

- All pages styled consistently (Navy/Blue/Teal/Amber)
- No console errors
- All forms validate
- Edit successful stories

**Commit:**
```bash
git add apps/admin
git commit -m "PACK 9: Admin dashboard - user mgmt, disputes, KYC, payouts"
git push origin main
```

**Expected result:**
- 4 complete admin features
- Time: 2 hours
- Ready for PACK 10 integration

---

## PACK 10: Integration Test (1-2 hours)

**Goal:** Full end-to-end flow, all 3 apps synced

### Manual Test Script

**Scenario: New customer books a job, provider completes it, customer pays**

```
Week 2, Day 1: Setup
├─ Provider recruits manually (you call 5 people)
├─ They sign up via mobile app
└─ KYC submitted

Week 2, Day 2: Customer Test
├─ Sign up as customer on mobile
├─ Search for available provider (should see recruited ones)
├─ Book a job (€70 plumbing)
├─ See confirmation + booking ID
├─ Real-time notification: "João accepted your job"
└─ Track job status live

Week 2, Day 3: Provider Completes
├─ Open provider phone
├─ See "Customer waiting for you" notification
├─ Tap job
├─ Chat with customer: "I'm 10 min away"
├─ Arrive, do work (simulated)
├─ Upload completion photo
├─ Mark complete
└─ Get notification: "Payment released! €57 deposited"

Week 2, Day 4: Customer Reviews
├─ See "Rate your service" prompt
├─ Give 5 stars + comment
├─ Submit review
├─ Check admin panel: Review visible
└─ Check provider profile: Rating updated

Week 2, Day 5: Admin Verifies
├─ Open admin dashboard
├─ Check users: See customer + provider
├─ Check payouts: See provider's payout (completed)
├─ Check disputes: None (job went smoothly)
└─ Check KYC: Provider verified ✅
```

**QA checklist:**
- [ ] All sign-ups work (customer + provider + admin)
- [ ] Booking flow end-to-end (5 steps complete)
- [ ] Real-time updates (status changes appear instantly)
- [ ] Payments (captured + released)
- [ ] Photos (upload + display on both sides)
- [ ] Chat (real-time messages)
- [ ] Reviews (saved + visible on profile)
- [ ] Admin visibility (all actions visible in dashboard)
- [ ] No data inconsistencies (same booking data across 3 apps)

**Fix issues found, commit:**
```bash
git add .
git commit -m "PACK 10: Integration test complete - all 3 apps synced, E2E flow verified"
git push origin main
```

**Expected result:**
- Full flow works
- All 3 apps (web, mobile, admin) communicate correctly
- Ready for pre-launch

---

## Week 3: Pre-Launch (2-3 hours)

### Task 1: Enable RLS Policies (30 min)

**What:** Row-level security in Supabase (so users can only see their own data)

**Implementation:**
```sql
-- Users can only see their own profile
CREATE POLICY "Users see own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Providers see only jobs in their service categories
CREATE POLICY "Providers see jobs in their categories"
  ON bookings FOR SELECT
  USING (
    auth.uid() = customer_id OR
    EXISTS (
      SELECT 1 FROM provider_services
      WHERE provider_id = auth.uid()
      AND service_id = bookings.service_id
    )
  );

-- Admin sees all
CREATE POLICY "Admin sees all"
  ON bookings FOR SELECT
  USING (
    (SELECT user_type FROM users WHERE id = auth.uid()) = 'admin'
  );
```

---

### Task 2: Legal Compliance (45 min)

**Create 3 documents:**

1. **Privacy Policy** (~500 words)
   - Data we collect
   - How we use it
   - How long we keep it
   - User rights (access, deletion, portability)
   - GDPR compliance

2. **Terms of Service** (~800 words)
   - User responsibilities
   - Liability limitations
   - Dispute resolution
   - Payment terms
   - Acceptable use

3. **GDPR Data Processing Agreement** (template from Stripe)
   - Confirm Stripe is data processor
   - Confirm Supabase is data processor
   - Data security commitments
   - Right to erasure flow

**Host:**
- Privacy policy + ToS: In-app (settings page)
- Link on landing page
- DPA: For internal use

---

### Task 3: App Store Submission (45 min)

**Prepare iOS App Store submission:**
```
- App icon (1024x1024)
- Screenshots (2–5, each language)
- App description (170 chars)
- Keywords
- Support URL
- Privacy policy URL
- Pricing (free)
```

**Prepare Google Play submission:**
```
- App icon
- Screenshots
- Short description
- Full description
- Content rating questionnaire
- Privacy policy URL
- Support email
```

**Submit:**
- iOS: Apple review (takes 1–3 days)
- Android: Google Play review (usually <1 hour)

---

### Task 4: Final QA Checklist

- [ ] No TypeScript errors
- [ ] No console warnings (critical ones resolved)
- [ ] Expo runs clean
- [ ] All 3 apps load without crashing
- [ ] Manual E2E test runs without errors
- [ ] RLS policies work (users see only their data)
- [ ] Privacy policy accessible in app
- [ ] Terms linked from landing page
- [ ] All secrets in .env.local (not committed)
- [ ] GitHub repo is clean, no build artifacts

---

## Launch Week (May 29–31)

### Day 1: Final Checks
- [ ] Apps live in App Store + Google Play
- [ ] Landing page accessible
- [ ] Admin dashboard running
- [ ] Customer support ready (you + 1 contractor)
- [ ] Provider recruitment list ready (50 people to call)

### Day 2: Soft Launch
- [ ] Call 50 providers, send invites
- [ ] Share landing page with network
- [ ] Monitor for crashes (Sentry alerts)
- [ ] Be available for support

### Day 3: First Week Goals
- [ ] 50+ providers signed up
- [ ] 100+ customer signups
- [ ] 10+ bookings
- [ ] Fix any critical bugs immediately
- [ ] Call customers who got jobs (thank them, ask for feedback)

---

## Success Metrics (First Month)

| Metric | Target | Trigger for action |
|--------|--------|-------------------|
| **Providers** | 50+ | <30 = increase incentives |
| **Customers** | 500+ | <300 = ramp up ads |
| **Bookings** | 100+ | <50 = provider comms |
| **Fill rate** | >70% | <70% = re-examine pricing |
| **Churn** | <10% | >10% = analyze why customers leave |
| **Bugs** | 0 critical | Any = fix in <2h |

---

## Communication Plan

### Founders / Co-founders
- Daily standup (5 min) → what shipped, what's blocked
- Weekly review (1h) → metrics, decisions, next week

### Investors
- Weekly summary email (key metrics)
- Monthly call (30 min)

### Customers
- In-app chat support (you answer within 1 hour)
- Monthly newsletter

### Providers
- Weekly earnings email
- Monthly "top performer" spotlight
- Community WhatsApp group

---

**Document version:** 1.0  
**Last updated:** May 4, 2026  
**Status:** Ready to execute
