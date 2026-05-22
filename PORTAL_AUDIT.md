# Counselling Portal — Full System Audit

> Last updated: 2026-05-21 | Stack: Next.js 16.2.4 (Turbopack), Prisma v5, Supabase PostgreSQL, NextAuth v4, Upstash Redis, Resend

---

## 1. User Roles

| Role | Description | Login Redirect |
|------|-------------|----------------|
| **STUDENT** | Default role on signup. Books sessions, takes assessments. | `/student/counsellors` |
| **COUNSELLOR** | Licensed staff. Manages patients, clinical notes, schedule. | `/staff/dashboard` |
| **ADMIN** | System operators. Manages users, resources, crisis, audit. | `/admin/dashboard` |
| **PARENT** | Linked to student(s) via invitation. | *(No portal yet)* |

---

## 2. All Pages — Routes, Status & Features

### PUBLIC (no login required)

| Route | Status | What It Does | Write Operations |
|-------|--------|--------------|-----------------|
| `/` | ✅ | Home/landing page | None |
| `/login` | ✅ | Email + password, eye icon, role-based redirect | NextAuth session |
| `/signup` | ✅ | Create account (STUDENT only), validation | INSERT User + StudentProfile |
| `/forgot-password` | ✅ | Sends real reset email via Resend | Redis token (1hr TTL) + email |
| `/reset-password` | ✅ | Validates token, updates password | UPDATE User.password, DELETE Redis key |
| `/chat` | ✅ | Anonymous crisis chat, auto-escalates on severity | INSERT AnonymousSession, AnonymousMessage (encrypted) |
| `/assessments` | ✅ | Lists 5 assessment types (PHQ9, GAD7, PCL5, AUDIT, DAST10) | None |
| `/assessments/[type]` | ✅ | Step-by-step questionnaire, progress bar | INSERT AssessmentResult, escalate if crisis |
| `/assessments/results/[id]` | ✅ | Score, severity badge, crisis banner, recommendations | None |
| `/resources` | ✅ | Browse published articles, filter + search | None |
| `/resources/[slug]` | ✅ | Full article, helpful vote | UPDATE Resource.helpfulCount |
| `/terms` | ✅ | Static page | None |
| `/privacy` | ✅ | Static page | None |
| `/unauthorized` | ✅ | Access denied page | None |

---

### STUDENT (logged in, `profileCompleted = true`)

| Route | Status | What It Does | Write Operations |
|-------|--------|--------------|-----------------|
| `/student/onboarding/step-1` | ✅ | Name, age range, language | INSERT/UPDATE StudentProfile |
| `/student/onboarding/step-consent` | ✅ | Accept Terms + Privacy + Clinical Consent | UPDATE User (consent + profileCompleted) |
| `/student/counsellors` | ✅ | Browse verified counsellors | None |
| `/student/counsellors/[id]/book` | ✅ | Calendar + slots + mode → book | INSERT Appointment (atomic, race-safe) |
| `/student/appointments` | ✅ | List upcoming + past, cancel PENDING/CONFIRMED | UPDATE Appointment.status = CANCELLED |
| `/student/notifications` | ✅ | Notification list (50 recent) | markReadAction on click |

---

### COUNSELLOR / STAFF (role = COUNSELLOR or ADMIN)

| Route | Status | What It Does | Write Operations |
|-------|--------|--------------|-----------------|
| `/staff/dashboard` | ✅ | Assigned patient count + patient list | None |
| `/staff/schedule` | ✅ | Upcoming appointments, edit availability, block dates | INSERT CounsellorAvailability, CounsellorBlockedSlot |
| `/staff/inbox` | ✅ | Open/escalated anonymous sessions sorted by severity | None |
| `/staff/inbox/[id]` | ✅ | Chat transcript + counsellor reply + close session | INSERT AnonymousMessage, UPDATE session status |
| `/staff/patients/[id]` | ✅ | Patient timeline, create encrypted clinical notes | INSERT ClinicalNote (encrypted) |
| `/staff/patients/[id]/assessments` | ✅ | Patient assessment history table | None |
| `/staff/crisis-queue` | ❌ | Dashboard links here — page missing | — |
| `/staff/follow-ups` | ❌ | Dashboard links here — page missing | — |

---

### ADMIN (role = ADMIN)

| Route | Status | What It Does | Write Operations |
|-------|--------|--------------|-----------------|
| `/admin/dashboard` | ✅ | Operational metrics (crises, counsellors, appointments, chats) | None |
| `/admin/users` | ✅ | All users — role, status, profile completion, join date | None (view only) |
| `/admin/staff` | ✅ | Counsellor list — verify/unverify, activate/deactivate | UPDATE isVerified, UPDATE isActive |
| `/admin/resources` | ✅ | Resource library list | None |
| `/admin/resources/new` | ✅ | Create article (title, slug, category, markdown, publish) | INSERT Resource |
| `/admin/audit` | ✅ | Immutable audit log (200 entries) | None |
| `/admin/crisis` | ✅ | HIGH/CRITICAL escalated sessions — view transcript, resolve | UPDATE session status = CLOSED |
| `/admin/settings` | ✅ | Read-only system config (SUPER_ADMIN only) | None |

---

## 3. API Routes

| Endpoint | Method | Auth | What It Does |
|----------|--------|------|--------------|
| `/api/auth/[...nextauth]` | GET, POST | Public | NextAuth credentials + JWT sessions |
| `/api/health` | GET | Public | DB ping health check |
| `/api/health/deep` | GET | CRON_SECRET | DB + Redis + encryption check |
| `/api/cron/send-reminders` | GET | CRON_SECRET | Fires 24h appointment reminder events |
| `/api/cron/retention-sweep` | GET | CRON_SECRET | Hard-deletes expired sessions + old audit logs |
| `/api/user/delete` | POST | Any session | Soft-delete own account (anonymise + deletedAt) |
| `/api/export/audit` | GET | SUPER_ADMIN | Export 1000 audit logs as CSV |
| `/api/student/appointments` | GET | STUDENT session | Fetch own appointments list |

---

## 4. Server Actions — Complete List

| Action File | Functions | Works? |
|-------------|-----------|--------|
| `auth.actions.ts` | `registerAction`, `requestPasswordResetAction`, `resetPasswordAction` | ✅ |
| `scheduling.actions.ts` | `fetchAvailableSlots`, `bookSlotAction`, `cancelAppointmentAction` | ✅ |
| `availability.actions.ts` | `getAvailabilityAction`, `saveAvailabilityAction`, `blockDatesAction` | ✅ |
| `notification.actions.ts` | `fetchUnreadAction`, `fetchUnreadCountAction`, `markReadAction` | ✅ |
| `profile.actions.ts` | `saveStudentOnboardingAction`, `acceptComplianceAction` | ✅ |
| `clinical.actions.ts` | `createNoteAction` | ✅ |
| `chat.actions.ts` | `startChatAction`, `sendMessageAction`, `loadMessagesAction`, `staffLoadSessionAction`, `staffReplyAction`, `closeCrisisSessionAction` | ✅ |
| `assessment.actions.ts` | `submitAssessmentAction` | ✅ |
| `resource.actions.ts` | `markResourceHelpful`, `createResourceAction` | ✅ |
| `admin.actions.ts` | `toggleUserActiveAction`, `toggleCounsellorVerifiedAction`, `resolveCrisisSessionAction` | ✅ |

---

## 5. What Each Role Can Do (CRUD)

### STUDENT
| Action | Works? |
|--------|--------|
| Register / login / logout | ✅ |
| Complete onboarding | ✅ |
| Browse counsellors | ✅ |
| Book appointment (atomic, race-safe) | ✅ |
| View all appointments | ✅ |
| Cancel appointment | ✅ |
| Take assessments (5 types) | ✅ |
| View assessment results | ✅ |
| Use anonymous chat | ✅ |
| Read resources | ✅ |
| View + mark notifications read | ✅ |
| Reset forgotten password | ✅ |
| Delete own account | ✅ |

### COUNSELLOR
| Action | Works? |
|--------|--------|
| View dashboard + assigned patients | ✅ |
| View patient clinical timeline | ✅ |
| Create encrypted clinical note | ✅ |
| View patient assessments | ✅ |
| View schedule | ✅ |
| Edit weekly availability | ✅ |
| Block dates (leave) | ✅ |
| View crisis chat inbox | ✅ |
| Read anonymous chat transcript | ✅ |
| Reply in anonymous chat | ✅ |
| Close anonymous chat session | ✅ |
| Edit/delete clinical note | ❌ (service exists, no action/UI) |
| Delete own account | ✅ |

### ADMIN
| Action | Works? |
|--------|--------|
| View operational metrics | ✅ |
| Browse all users | ✅ |
| Activate / deactivate user | ✅ |
| Verify / unverify counsellor | ✅ |
| Create resources | ✅ |
| List resources | ✅ |
| View audit logs | ✅ |
| Export audit logs CSV | ✅ |
| View crisis sessions | ✅ |
| View crisis chat transcript | ✅ (links to `/staff/inbox/[id]`) |
| Resolve / close crisis | ✅ |
| Edit/delete resources | ❌ |
| Manage notification preferences | ❌ |

### PARENT
| Everything | ❌ (schema only, no portal) |

---

## 6. Still Missing / Known Gaps

| Gap | Priority | Notes |
|-----|----------|-------|
| `/staff/crisis-queue` | 🟡 Medium | Linked from staff dashboard — 404 |
| `/staff/follow-ups` | 🟡 Medium | Linked from staff dashboard — 404 |
| Edit/delete clinical notes UI | 🟡 Medium | `editClinicalNote()` service exists, no action or page |
| Edit/delete resources (admin) | 🟡 Medium | Only create exists |
| Admin users page actions | 🟡 Medium | Table display only, no activate/deactivate buttons yet |
| Student profile edit after onboarding | 🟠 Low | No edit page post-onboarding |
| Counsellor self-edit profile | 🟠 Low | `updateCounsellorProfile()` service exists, no UI |
| Notification preferences UI | 🟠 Low | Schema + service logic exists |
| Parent portal (`/parent/*`) | 🟠 Low | Schema + invitation model exist, zero pages |
| Group sessions | 🟠 Low | Schema only |
| Referrals | 🟠 Low | Schema only |
| File uploads (avatars, attachments) | 🟠 Low | `storage.service.ts` is a stub |
| Appointment 24h reminder emails | 🟠 Low | Cron fires event, no handler registered |

---

## 7. Infrastructure Status

| Service | Status | Notes |
|---------|--------|-------|
| Supabase PostgreSQL | ✅ Connected | Schema pushed |
| NextAuth JWT | ✅ Working | `trustHost: true`, role-based redirects |
| Upstash Redis | ✅ Connected | Rate limiting + password reset tokens |
| Resend Email | ✅ Wired | Sends real emails — forgot-password flow complete |
| Sentry | ✅ Configured | DSN + token set |
| AES-256 Encryption | ✅ Working | Clinical notes + chat messages encrypted at rest |
| Middleware (auth + rate limit) | ✅ Working | `middleware.ts` — RBAC, security headers, Redis rate limit |
| Cron endpoints | ✅ Ready | Need external scheduler (Vercel Cron / cron-job.org) |

---

## 8. Schema Models — Build Status

| Model | Status | Notes |
|-------|--------|-------|
| User | ✅ Full | Soft delete, role RBAC |
| StudentProfile | ✅ Onboarding + view | No self-edit post-onboarding |
| CounsellorProfile | ✅ Staff + admin views | No self-edit page |
| AdminProfile | ✅ Auth + settings | Read-only |
| CounsellorAvailability | ✅ Edit UI built | Weekly availability editor |
| CounsellorBlockedSlot | ✅ Block dates built | Leave management |
| Appointment | ✅ Full (book + view + cancel) | No reschedule |
| AssessmentResult | ✅ Full | — |
| Assessment | ❓ Legacy | Appears unused — replaced by AssessmentResult |
| Resource | ✅ Partial | Create + list, no edit/delete |
| AuditLog | ✅ Full | Immutable, CSV export |
| AnonymousSession | ✅ Full | Chat + triage + resolve |
| AnonymousMessage | ✅ Full | Encrypted send/receive |
| Notification | ✅ Full | Create, list, mark read |
| NotificationPreference | ❌ Schema only | No settings UI |
| CounsellorPatientAssignment | ✅ Internal | No override UI |
| ClinicalNote | ✅ Create + view | No edit/delete UI |
| ParentProfile | ❌ Schema only | No portal |
| ParentInvitation | ❌ Schema only | No flow |
| Referral | ❌ Schema only | — |
| GroupSession | ❌ Schema only | — |
| GroupAttendance | ❌ Schema only | — |
