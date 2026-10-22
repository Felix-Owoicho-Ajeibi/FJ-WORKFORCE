# F&J Workforce Limited — Recruitment & Workforce Management Platform

A production-grade corporate workforce website and full Applicant Tracking System (ATS) built for **F&J Workforce Limited**, based in Ibeju-Lekki, Lagos State, Nigeria.

---

## 🏢 Platform Overview

F&J Workforce Limited bridges skilled professionals, gray-collar technicians, and blue-collar labor with corporate and industrial enterprises operating across the Lekki Free Trade Zone, Dangote industrial hub, Lekki Deep Sea Port, and Greater Lagos.

### Primary Audiences
1. **Job Seekers:** Account registration, profile builder, private CV upload, multi-filter vacancy search, online job applications, and real-time status tracking.
2. **Employers & Corporate Clients:** Comprehensive workforce capabilities, industry specializations, and direct personnel requisition forms.
3. **Recruitment Officers & Administrators:** Role-protected Applicant Tracking System (ATS), vacancy management, candidate directory, requisition manager, content management (CMS), and audit logs.

---

## 🎨 Official Brand Identity

- **Deep Navy Blue (Primary):** `#0B1E36` (Headings, primary branding, navigation, dark surfaces)
- **Primary Green:** `#045B0D` (Brand accents, primary calls to action, active indicators)
- **Bright Green (Secondary):** `#11851E` (Highlights, positive states, interactive badges)
- **White (Neutral):** `#FFFFFF`
- **Headings Typography:** *Manrope*
- **Body & Interface Typography:** *Inter*

### Official Contact Details
- **Email:** `info@fjworkforce.com.ng`
- **Phone:** `09116176563`
- **Alternative Phone:** `09022542150`
- **Office Address:** Eleko Beach Road, Ibeju-Lekki, Lagos State, Nigeria.
- **WhatsApp Support Link:** `https://wa.me/2349022542150`

---

## 🚀 Key Features & Pages

| Route | Purpose |
|---|---|
| `/` | Corporate homepage with hero, trust metrics, 6 service highlights, latest vacancies, recruitment journey, and employer CTA |
| `/about` | Company introduction, mission, vision, core values, location context, and commitments |
| `/services` | Overview of all 6 workforce solutions |
| `/services/recruitment` | Recruitment & Talent Acquisition service page with dedicated inquiry form |
| `/services/contract-staffing` | Temporary & Contract Staffing service page with dedicated inquiry form |
| `/services/permanent-placement` | Permanent Placement service page with dedicated inquiry form |
| `/services/industrial-workforce` | Industrial & Factory Workforce Solutions (Lekki Free Zone & Refinery focus) |
| `/services/workforce-outsourcing` | Workforce Outsourcing & Legal Employer of Record service page |
| `/services/hr-support` | HR & Workforce Management Advisory service page |
| `/jobs` | Job search portal with keyword search, location/industry/type filters, and sorting |
| `/jobs/:slug` | Full job details with qualifications, responsibilities, salary, and deadline check |
| `/jobs/:slug/apply` | Interactive application with profile prefill, CV attachment, screening questions, and NDPA consent |
| `/register` | Candidate registration with inline validation and password security |
| `/login` | Candidate & Admin authentication with one-click reviewer demo access |
| `/forgot-password` & `/reset-password` | Password recovery workflows |
| `/candidate/dashboard` | Candidate portal with profile completion bar, application status history, saved jobs, and CV manager |
| `/candidate/profile` | Candidate profile editor with experience, education, skills, and CV upload |
| `/employers` | Employer solutions, industries served, and staffing benefits |
| `/request-staff` | Enterprise workforce requisition form with auto-generated reference ID |
| `/contact` | Contact details, office map, and contact inquiry form |
| `/faq` | Searchable, categorized FAQs for candidates and employers |
| `/privacy` | Privacy policy compliant with the **Nigeria Data Protection Act 2023 (NDPA)** |
| `/terms` | Terms of use with official 5,000 Naira ($3.8) application fee policy |
| `/admin` | Complete private ATS dashboard with vacancy CRUD, application reviews, notes, and audit logs |

---

## 🗄️ Database Architecture & Migrations

The production database schema is prepared in:
```
supabase/migrations/20261022_init.sql
```

### Tables Implemented
1. `profiles` — User identity profiles linked to `auth.users`
2. `user_roles` — Role assignments (`candidate`, `recruiter`, `admin`)
3. `candidate_profiles` — Professional summary, education, experience, skills, CV storage path, and completion score
4. `jobs` — Vacancies with title, slug, industry, salary, deadline, and status (`draft`, `published`, `closed`)
5. `applications` — Job applications with reference numbers (`FJW-APP-2026-XXXX`), status, and screening answers
6. `application_notes` — Private recruiter notes with author timestamps
7. `application_status_history` — Status transitions with timestamp and actor
8. `employer_enquiries` — Staffing requisitions with tracking references (`FJW-REQ-2026-XXXX`)
9. `contact_messages` — Inbound inquiries from the contact desk
10. `services` — Editable service content
11. `faqs` — Searchable FAQs categorized by audience
12. `audit_logs` — Administrative activity logging

---

## 💻 Local Development & Setup

### 1. Clone & Install
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your Supabase project credentials if connecting directly to Supabase cloud.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
```

### 5. Vercel Deployment
The repository includes a ready-to-use `.npmrc` (`legacy-peer-deps=true`) and `vercel.json` (`outputDirectory: "dist"` with SPA rewrite rules).
When importing the Git repo to Vercel:
- **Framework Preset:** Vite
- **Root Directory:** `./`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install` (handled automatically with `.npmrc`)

---

## 🔐 Administrative Onboarding Procedure

1. Open `/login` or click the **Admin ATS View** button in the top navigation bar.
2. Demo Admin account credentials:
   - **Email:** `admin@fjworkforce.com.ng`
   - **Password:** `F&Jworkforce` (setup default; change upon first administrative access)
3. To assign recruiter or admin privileges to an existing user in Supabase, execute:
   ```sql
   INSERT INTO public.user_roles (user_id, role)
   VALUES ('USER_UUID_HERE', 'admin')
   ON CONFLICT (user_id, role) DO NOTHING;
   ```
