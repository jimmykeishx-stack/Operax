# Field Service Operations Platform — Product Requirements Document

**Document status:** Master specification  
**Version:** 1.0  
**Owner:** Product and Operations  
**Last updated:** 21 July 2026

## 1. Purpose and Authority

This Product Requirements Document (PRD) is the single source of truth for the Field Service Operations Platform. All product decisions, designs, user stories, acceptance criteria, implementation work, test plans, and future prompts must explicitly reference this PRD. Where a later request conflicts with this document, this PRD takes precedence until formally revised.

The platform is an internal operations tool for planning, assigning, tracking, and archiving field-service jobs. It is deliberately supervisor-led: technicians do not need user accounts or application access.

## 2. Product Vision

Give supervisors one calm, reliable operating picture of every field job: what has arrived, who owns it, what is underway, what needs attention, and what has been completed.

The product replaces fragmented job tracking in phone calls, messaging threads, spreadsheets, and paper notes with a lightweight, visually clear operational workspace. It should help a small field-service business respond quickly, balance technician workload, maintain an audit trail, and close each month cleanly.

## 3. Business Problem

The company coordinates field work across a team of 26 technicians and four supervisors. Without a shared workflow, supervisors can lose visibility into job status, dispatch decisions are inconsistent, workloads become uneven, and completed work is difficult to retrieve for reporting or customer follow-up.

The product must solve these problems:

- Centralize every active job in one trusted workspace.
- Allow supervisors to create, assign, reprioritize, and close jobs without relying on technicians to use software.
- Expose workload and availability before assigning work.
- Make urgent, overdue, blocked, and unassigned jobs immediately visible.
- Retain a searchable monthly record without cluttering daily operations.
- Preserve accountability for every state change and reassignment.

## 4. Company Profile and Operating Assumptions

- **Organization size:** 30 employees.
- **Management team:** 4 supervisors.
- **Field team:** 26 technicians.
- **Primary users:** Supervisors, with an administrator role for configuration and reporting.
- **Work model:** Supervisors receive requests from customers or other channels, create jobs, assign technicians, update statuses from field communications, and close jobs after confirmation.
- **Technician access:** Technicians do not log in and do not update job records directly in the initial release.
- **Scale target:** The platform must comfortably support the current team and at least 100 active jobs without degrading day-to-day usability.

## 5. Product Goals and Non-Goals

### Goals

- Reduce time required to triage and dispatch new jobs.
- Provide an accurate live view of job progress and technician workload.
- Standardize job lifecycle states and transition rules.
- Make operational exceptions visible without extensive filtering.
- Create a dependable historical archive and reporting foundation.
- Deliver a polished, low-training interface suitable for frequent desktop use and essential mobile review.

### Non-Goals for Initial Release

- Technician self-service login, mobile application, or time entry.
- Customer self-service portal or automated customer communication.
- Payroll, invoicing, inventory, route optimization, or GPS tracking.
- Full CRM, accounting, or procurement functionality.
- Replacing existing communication channels; supervisors may still use calls and messaging, then record outcomes in the platform.

## 6. Users, Roles, and Permissions

### Administrator

The administrator maintains system-wide configuration and may be one or more of the supervisors.

- Create, edit, deactivate, and reactivate technician and supervisor profiles.
- Manage service categories, locations, priorities, and status definitions where configuration is permitted.
- View all active and archived jobs, workload data, and reports.
- Correct data when necessary, with an audit entry.
- Manage user access for supervisor accounts.

### Supervisor

Supervisors are the core users and are responsible for all job-state management.

- Create and edit jobs.
- Assign and reassign technicians.
- Change job status according to workflow rules.
- Add internal notes and completion details.
- View team workload, queues, archives, and operational reports.
- View all jobs by default; no supervisor owns a private queue unless a later PRD revision introduces it.

### Technician

Technicians are operational resources represented in the system, not logged-in users in the initial release.

- Have a profile, service capabilities, active/leave status, and workload visibility.
- Can be assigned to one or more jobs by supervisors.
- Do not authenticate, create jobs, edit records, or change statuses.
- Communicate field updates through existing operational channels; the supervisor records the update.

## 7. Core Data Definitions

### Job

A job is a discrete customer or internal service request. Each job has:

- Unique job reference generated by the system.
- Title and short description.
- Customer or requestor name and contact information, where applicable.
- Service location and optional location notes.
- Service category.
- Priority: Low, Normal, High, or Urgent.
- Scheduled date and optional time window.
- Status and status-change timestamps.
- Assigned primary technician and optional supporting technicians.
- Creator and last-updated supervisor.
- Internal notes, resolution summary, and optional attachments in future releases.
- Created, updated, completed, and archived timestamps.

### Technician Profile

Each technician record includes name, identifier, phone/contact reference, service capabilities, employment status, availability note, and calculated active workload. A technician is either Active, Unavailable, or Inactive. Inactive technicians cannot receive new assignments.

### Workload

Workload is the count of open jobs assigned to a technician. For the initial release, open jobs are those in Assigned, Scheduled, In Progress, or Blocked status. Completed, Cancelled, and Archived jobs do not contribute. The interface must also show a workload indicator rather than requiring supervisors to calculate counts manually.

## 8. Job Workflow

### Lifecycle States

1. **New** — A request has been recorded and awaits triage or assignment.
2. **Assigned** — A technician has been selected; work has not yet been scheduled or started.
3. **Scheduled** — The job has a planned service date or time window.
4. **In Progress** — Work is actively underway.
5. **Blocked** — Work cannot continue without an external dependency, customer response, access, material, approval, or other resolution.
6. **Completed** — Work is confirmed complete and includes a resolution summary.
7. **Cancelled** — The job will not be completed and must include a cancellation reason.
8. **Archived** — A completed or cancelled job moved into the monthly historical archive.

### Standard Supervisor Flow

1. Receive a request through any existing intake channel.
2. Create a job in New status with all known details and a priority.
3. Review the Dispatch Board and technician workload.
4. Assign a qualified active technician; set a schedule when known.
5. Record field updates received from the technician by moving the job through its state.
6. Record blockers immediately and include a clear next action.
7. Mark the job Completed only when a resolution summary is present.
8. Archive eligible closed jobs through the monthly archive process.

### Required State Transitions

- New may move to Assigned, Scheduled, Cancelled, or remain New.
- Assigned may move to Scheduled, In Progress, Blocked, New (unassigned), or Cancelled.
- Scheduled may move to In Progress, Blocked, Assigned, or Cancelled.
- In Progress may move to Blocked, Completed, Assigned, or Cancelled.
- Blocked may move to Assigned, Scheduled, In Progress, Completed, or Cancelled.
- Completed and Cancelled may move only to Archived during routine use.
- An administrator may reopen a Completed or Cancelled job only with a required reason; this creates an audit entry and returns the job to Assigned or New.

## 9. Business Rules

1. **Supervisor-controlled states:** Only authenticated supervisors or administrators may create, edit, assign, reassign, or change a job state.
2. **No technician login:** No technician authentication, dashboard, or direct state update exists in the initial release.
3. **Assignment requirement:** A job cannot enter Assigned, Scheduled, or In Progress without at least one active technician assigned.
4. **Completion requirement:** A job cannot be marked Completed without a non-empty resolution summary and a recorded completion time.
5. **Cancellation requirement:** A job cannot be Cancelled without a cancellation reason.
6. **Blocked requirement:** A Blocked job must include a blocker reason and next action; it remains operationally visible until resolved or cancelled.
7. **Priority handling:** Urgent jobs must be visually distinct and appear first in relevant queues. High-priority jobs appear before Normal and Low jobs when otherwise comparable.
8. **Overdue handling:** Any open job with a scheduled date before the current local date is overdue. Overdue jobs are visually flagged and cannot be hidden by default filters.
9. **Workload visibility:** Before confirmation of an assignment, supervisors must see the selected technician's current open-job count and status. The system warns, but does not block, assignments that exceed a configurable workload threshold.
10. **Reassignment traceability:** Reassigning a job records previous assignee, new assignee, actor, timestamp, and optional reason in the audit history.
11. **Monthly archive:** At month end, administrators archive completed and cancelled jobs from prior calendar months. Archived jobs are removed from default active views but remain searchable and read-only.
12. **Archive integrity:** Archived records retain their full job details and audit history. Only an administrator may restore an archived job, and restoration must be logged.
13. **Data retention:** Archive data is retained indefinitely unless a future approved retention policy replaces this rule.
14. **Soft deletion:** Jobs are never permanently deleted through the user interface. Invalid jobs are cancelled with an explanatory reason.
15. **Auditability:** The platform logs creation, key edits, assignments, state changes, archive/restore actions, and the responsible authenticated user.
16. **Time zone:** All operational dates and timestamps use the company's configured local time zone, initially Africa/Nairobi.

## 10. Navigation Map

### Primary Navigation

- **Overview** — Operational snapshot, attention items, and today’s work.
- **Jobs** — Searchable full active-job list with filters and bulk-safe actions.
- **Dispatch Board** — Kanban-style status view for daily triage and movement.
- **Team Workload** — Technician capacity, assignment count, availability, and job drill-down.
- **Archive** — Read-only monthly historical jobs with search and export-ready filters.
- **Reports** — Operational metrics and monthly summaries.
- **Settings** — Supervisor access and administrator-managed configuration.

### Key Screens

**Overview**
- Counts for New, Unassigned, In Progress, Blocked, Overdue, and Due Today jobs.
- Urgent and overdue attention list.
- Technician workload summary showing capacity signals.
- Recent activity feed.

**Jobs**
- Table/list view with job reference, title, priority, status, assignee, schedule, and last update.
- Search by job reference, customer, location, technician, or keywords.
- Filters for state, priority, technician, category, scheduled date, and overdue condition.
- Job creation action and row-level access to job detail.

**Dispatch Board**
- Columns for New, Assigned/Scheduled, In Progress, Blocked, and Completed Today.
- Cards show priority, identifier, title, customer/location, assignee, schedule, and age/status signal.
- State changes require confirmation when information is mandatory; drag-and-drop is optional and must obey the same validation rules.

**Job Detail**
- Full record with editable operational fields.
- Prominent status control and technician assignment.
- Notes and chronological audit timeline.
- Completion and cancellation forms that enforce required reasons.

**Team Workload**
- One card or row per technician.
- Shows availability, capabilities, open-job count, workload state, and assigned-job list.
- Supports filtering by capability and availability when dispatching.

**Archive**
- Defaults to the most recent archived month.
- Includes month selector, search, filters, read-only detail view, and restore access for administrators.

## 11. Functional Requirements

### Job Management

- Supervisors can create, read, update, and cancel jobs.
- The create form validates required title, category, priority, and location/requestor context before saving.
- A system-generated reference is visible immediately after creation.
- Changes save with clear success/error feedback and update the job audit timeline.
- The system prevents accidental duplicate submission from repeated clicks or refreshes.

### Dispatch and Assignment

- Supervisors can assign one primary technician and optional supporting technicians.
- Assignment controls list only active technicians by default and expose current workload.
- The system clearly flags unavailable technicians and does not allow them to be selected for new work.
- Supervisors can update schedule, priority, status, and assignee from Job Detail; Dispatch Board provides fast state/priority actions where practical.

### Search, Filters, and Visibility

- Active views open with meaningful defaults: urgent, overdue, blocked, and unassigned work remains easy to spot.
- Search works across job reference, title, customer/requestor, location, and technician.
- Filter choices persist during a user session and can be cleared in one action.
- Empty states explain whether there are no jobs or whether filters produced no matches.

### Archive and Reporting

- Administrators can preview the count of eligible jobs before running a monthly archive.
- Archive execution requires explicit confirmation and reports success/failure by job count.
- Reports include jobs created, completed, cancelled, blocked, overdue, average completion duration, and workload distribution for a selected period.
- Export capability may begin with CSV exports for list and report views; no formatted PDF export is required initially.

## 12. UX and Design System

### Design Principles

- **Operational clarity first:** Status, urgency, ownership, and next action outrank decoration.
- **Calm under pressure:** Use spacious layout, strong hierarchy, concise labels, and restrained animation.
- **Fast scanning:** Favor cards, badges, tables, count summaries, and plain language.
- **Error prevention:** Explain required information at the point of action and confirm consequential actions.
- **Accessible by default:** Never rely only on color to convey priority or status.

### Brand Personality

Professional, dependable, organized, practical, and quietly confident. The interface should feel like a modern operations center, not an overly technical dashboard or consumer app.

### Colour Palette

- **Primary / Navy:** `#12304A` — navigation, key headings, primary emphasis.
- **Primary action / Blue:** `#1F6FEB` — primary buttons, links, active controls.
- **Background / Mist:** `#F6F8FB` — application canvas.
- **Surface / White:** `#FFFFFF` — cards, dialogs, inputs.
- **Text / Ink:** `#17212B` — primary body text.
- **Text / Slate:** `#5F6B76` — secondary text.
- **Border:** `#D9E0E7` — controls and dividers.
- **Success:** `#16803C` — completed and positive feedback.
- **Warning:** `#B96A00` — high attention and upcoming risk.
- **Danger:** `#C4342D` — urgent, overdue, destructive actions, errors.
- **Info:** `#1769AA` — neutral operational information.

Status styling uses a label/icon plus color: New is neutral slate, Assigned/Scheduled is blue, In Progress is indigo/blue, Blocked is amber, Completed is green, Cancelled is muted slate, and Urgent/Overdue uses red.

### Typography

- **Primary typeface:** Inter, with system sans-serif fallback.
- **Heading typeface:** Inter, weight 600–700; no separate display font is needed.
- **Body size:** 14–16 px equivalent, optimized for dense operational reading.
- **Data and references:** Use tabular numerals where available for job IDs, dates, and workload counts.
- **Hierarchy:** Page title, section title, operational metric, body, and supporting caption must remain visually distinct without excessive type sizes.

### Components and Interaction Standards

- Use a persistent left sidebar on desktop and a compact accessible navigation pattern on smaller screens.
- Use clear primary, secondary, tertiary, and destructive button treatments.
- Use chips/badges for status and priority; they must have sufficient contrast.
- Use dialogs only for consequential confirmation or focused forms, not routine navigation.
- Form fields show label, helper text when useful, inline validation, and required-state indication.
- Tables support keyboard navigation, readable row density, sticky headers where helpful, and responsive transformation for small screens.
- Respect keyboard focus, semantic headings, accessible names, and a visible focus state throughout.
- Meet WCAG 2.1 AA contrast and interaction expectations as a minimum target.

## 13. Mock Data Philosophy

Mock data exists to demonstrate believable operational behavior, not to fabricate production truth.

- Use fictional names, organizations, addresses, phone numbers, and job descriptions.
- Never include real customer, employee, financial, or personally sensitive data in seed/mock records.
- Seed a realistic mix of 26 technicians, four supervisors, varied capabilities, availability conditions, and uneven workloads.
- Include jobs across every lifecycle state, including unassigned, urgent, overdue, blocked, recently completed, cancelled, and archived examples.
- Make job chronology internally consistent: a completed job has a completion time and resolution; a blocked job has a blocker; an archived job is closed and older than the archive period.
- Clearly label non-production environments and sample datasets as demo data.

## 14. Technical Stack and Constraints

### Recommended Stack

- **Frontend:** Next.js with React and TypeScript.
- **Styling:** Tailwind CSS with reusable accessible UI components.
- **Backend/data access:** Next.js server routes or server actions, with validation at the server boundary.
- **Database and authentication:** Supabase PostgreSQL and Supabase Auth for supervisor/admin accounts.
- **Data validation:** Shared TypeScript schemas using a validation library such as Zod.
- **Hosting:** Vercel for the web application; Supabase for database, authentication, and future file storage.

### Technical Constraints

- The web application is the only required client in the initial release.
- Support current desktop Chrome, Edge, Firefox, and Safari; provide responsive behavior for current mobile browsers.
- Enforce authorization server-side; UI visibility alone is never treated as access control.
- Store dates and timestamps consistently, render them in Africa/Nairobi local time for normal operations, and retain audit timestamps.
- Validate all user input at client and server boundaries.
- Use a relational model for jobs, technician assignments, status history, notes, users, and archive metadata.
- Index fields used for operational search and common filters, including job reference, status, priority, assignee, scheduled date, and archive month.
- Never expose privileged database credentials to the browser.
- Backups, migration discipline, and role-based database policies are mandatory before production launch.

## 15. Project Folder Structure

The implementation should follow a feature-oriented Next.js structure while keeping domain logic independent of page components.

- `app/` — Routes, layouts, server actions, and API endpoints.
- `app/(dashboard)/` — Authenticated operational screens: overview, jobs, dispatch, workload, archive, reports, and settings.
- `components/` — Shared UI primitives and composed domain components.
- `components/jobs/` — Job forms, tables, cards, state controls, and detail views.
- `components/workload/` — Technician workload displays and assignment support.
- `components/layout/` — Navigation, shell, headers, and responsive layout elements.
- `lib/` — Database clients, authorization helpers, formatting, validation, and shared utilities.
- `services/` — Domain operations such as job lifecycle, assignment, archiving, and reporting.
- `types/` — Shared TypeScript domain and database types.
- `supabase/` — Database migrations, seed data, and policy definitions.
- `tests/` — Unit, integration, and end-to-end tests organized by feature.
- `docs/` — Product, setup, operational, and architectural documentation; this PRD belongs here or at the repository root.

## 16. Coding Standards

- Use TypeScript with strict type checking; avoid `any` except at an explicitly isolated external boundary.
- Prefer small, named, single-purpose functions and components.
- Keep business rules in domain/service layers, not duplicated in page components.
- Treat every state transition as a validated domain operation that writes audit history atomically.
- Use semantic HTML, accessible labels, keyboard support, and clear error messages.
- Reuse design tokens and shared UI components; avoid hard-coded visual values when a token exists.
- Use consistent naming: PascalCase for React components/types, camelCase for variables/functions, and clear domain terminology matching this PRD.
- Validate inputs with shared schemas and return user-safe errors; log actionable technical details privately.
- Write tests for lifecycle rules, permission checks, archive behavior, workload calculations, and high-risk user flows.
- Keep pull requests focused. Update this PRD or linked documentation when a product-level decision changes.
- Do not introduce technician login, direct technician editing, or unapproved workflow states without a formal PRD revision.

## 17. Acceptance Criteria for Initial Release

- A supervisor can authenticate, create a job, assign an active technician, schedule it, update it through completion, and see an audit trail.
- A supervisor cannot mark a job Complete without a resolution summary.
- A supervisor cannot assign an inactive or unavailable technician to a new job.
- An administrator can view workload across all 26 technicians and identify unassigned, blocked, urgent, and overdue jobs.
- Active job screens exclude archived jobs by default.
- An administrator can archive all eligible completed/cancelled jobs from a prior month after confirmation, then find those jobs in Archive.
- Archived jobs are read-only and can be restored only by an administrator with a recorded reason.
- The interface remains usable at desktop widths and on a mobile browser for review and urgent updates.
- Role checks and business rules are enforced on the server, not solely in the interface.

## 18. Future Roadmap

### Phase 2 — Field Enablement

- Technician mobile access with limited job viewing and controlled update submission.
- Photo, signature, document, and completion-evidence attachments.
- Notification workflows for assignment, schedule changes, blockers, and completion.
- Customer-facing status updates and appointment reminders.

### Phase 3 — Operational Intelligence

- Skills-based assignment recommendations and capacity forecasting.
- Map view, travel-time awareness, and route planning integrations.
- SLA targets, escalations, and configurable workload capacity rules.
- Richer analytics by category, location, technician, customer, and response time.

### Phase 4 — Business Integrations

- Customer relationship management integration.
- Inventory/parts usage and purchasing links.
- Payroll/time tracking and accounting/invoicing integrations.
- Multi-branch, multi-region, and tenant-aware operation.

## 19. Change Control

Any change to roles, job states, business rules, data retention, branding, technology choices, or initial-release scope must be recorded as a versioned update to this PRD. Implementation prompts must state the relevant PRD section(s) they implement and must not silently supersede them.
