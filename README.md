# Peace Portal - Clinical Counselling Platform

A secure, anonymized mental health triage and scheduling platform engineered for pilot-stage institutional deployments (e.g., Universities, NGOs).

## 🛡️ Architecture & Security

This system handles sensitive clinical and mental health crisis data. It has been built with defense-in-depth infrastructure:
- **AES-256 Encryption at Rest**: All clinical notes, anonymous messages, and referrals are encrypted within the database using versioned keys. Database administrators cannot read plaintext.
- **RBAC (Role-Based Access Control)**: Strict separation between `STUDENT`, `COUNSELLOR`, `CLINICAL_ADMIN`, and `SUPER_ADMIN`.
- **Duty to Warn Escalation Pipeline**: Anonymous chats flagged as high-severity enter a secure Dead Letter Queue for immediate on-call dispatch.
- **Automated Retention Sweeps**: Anonymous sessions and audit logs are hard-deleted automatically via protected cron workflows to enforce privacy compliance (30-day default).

## 🛠️ Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL (via Supabase) + Prisma ORM
- **Realtime**: Supabase Realtime (Channels)
- **Rate Limiting**: Upstash Redis (Distributed Token Bucket)
- **UI Components**: Tailwind CSS + Shadcn UI + Lucide Icons

## 🚀 Setup Instructions

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example` and populate the required credentials:
```bash
cp .env.example .env
```
*(Ensure `ENCRYPTION_KEY` is exactly 32-bytes / 64 hex characters).*

3. Run Database Migrations:
```bash
npx prisma migrate dev
```

4. Seed Pilot Data (Generates admin, counsellors, and synthetic crisis sessions):
```bash
npx prisma db seed
```

5. Start Development Server:
```bash
npm run dev
```

## ⚠️ Security Notice & Pilot Disclaimer

- **DO NOT** launch this platform openly without operational staff assigned to crisis queues. 
- **DO NOT** commit your `.env` file or export decrypted clinical records to unencrypted local devices.
- **NEVER** use real patient data in staging environments. Rely entirely on the synthetic seed scripts provided.

**License**: Proprietary / Private. Not for open-source distribution without explicit sanitization of institutional escalation workflows.
