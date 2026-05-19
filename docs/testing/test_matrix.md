# Operational Test Matrix

This matrix tracks the critical path End-to-End operational failure simulations required before pilot deployment. 

## 1. Authentication & Boundary Penetration

| Test ID | Scenario | Expected Result | Severity | Status | Notes |
|---------|----------|-----------------|----------|--------|-------|
| AUTH-01 | Access `/admin` route with Student JWT | 403 Forbidden, `AUTH_VIOLATION` audit log. | Critical | Pending | |
| AUTH-02 | Exploit Session Replay (reuse logged out JWT) | NextAuth token rejection on server side. | Critical | Pending | |
| RBAC-01 | SuperAdmin vs ClinicalAdmin access to raw DB tables | Only SuperAdmin views infrastructure logs. ClinicalAdmin views patient alerts. | High | Pending | |

## 2. Booking Concurrency (Race Conditions)

| Test ID | Scenario | Expected Result | Severity | Status | Notes |
|---------|----------|-----------------|----------|--------|-------|
| BOOK-01 | Two users book `10:00 AM` slot at exact same millisecond. | Transaction 1 succeeds. Transaction 2 fails with "Slot already booked". Database `Serializable` isolation enforced. | Critical | Verified | Addressed via Prisma Serializable Isolation Level. |
| BOOK-02 | Counsellor blocks slot while user is on booking form. | Booking fails gracefully, prompts user to select a new slot. | High | Pending | |

## 3. Crisis Escalation & Failure Injection

| Test ID | Scenario | Expected Result | Severity | Status | Notes |
|---------|----------|-----------------|----------|--------|-------|
| CRISIS-01 | Anonymous chat triggers "suicide" keyword. | Session marked `ESCALATED`, severity `CRITICAL`. In-app alert generated. | Critical | Pending | |
| CRISIS-02 | Dispatch email failure during escalation (Simulate Resend down). | Event triggers `Dead Letter Queue`. Continues to poll via in-app notification bell. | Critical | Pending | |
| CRISIS-03 | Counsellor tries to view escalated chat without assignment. | Access denied unless user holds `CLINICAL_ADMIN` role. | High | Pending | |

## 4. Realtime & Network Instability

| Test ID | Scenario | Expected Result | Severity | Status | Notes |
|---------|----------|-----------------|----------|--------|-------|
| REAL-01 | Mobile device drops 4G mid-chat for 30s. | Reconnects seamlessly via Supabase polling. No messages lost. | High | Pending | |
| REAL-02 | Anonymous token expires while chat tab is open. | Chat goes read-only. Prompts user to start a new secure session. | Medium | Pending | |

## 5. Automated Data Retention

| Test ID | Scenario | Expected Result | Severity | Status | Notes |
|---------|----------|-----------------|----------|--------|-------|
| RET-01 | Anonymous session > 30 days old. | Sweep cron hard deletes session. Cascades to wipe encrypted messages. | High | Pending | |
| RET-02 | Student account requests deletion. | Profile PII scrambled. Auth credentials wiped. `StudentProfile` remains soft-deleted for audit integrity. | Critical | Pending | |

## 6. Deployment Rollback Simulation

| Test ID | Scenario | Expected Result | Severity | Status | Notes |
|---------|----------|-----------------|----------|--------|-------|
| DEP-01 | Vercel production rollback triggered. | App reverts to previous hash. Deep Health Check (`/api/health/deep`) recovers to 200 OK. | Critical | Pending | |
