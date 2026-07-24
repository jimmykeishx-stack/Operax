export type JobPriority = "critical" | "high" | "medium" | "low" | "scheduled" | "normal" | "urgent";
export type JobStatus = "reported" | "approved" | "assigned" | "in_progress" | "waiting_spare_parts" | "waiting_production_clearance" | "pending_supervisor_verification" | "completed" | "closed" | "repeat_fault" | "cancelled" | "new" | "blocked" | "archived" | "scheduled";
export type EmployeeRole = "supervisor" | "technician";

export interface Employee { id: string; name: string; role: EmployeeRole; email: string; phone: string; capabilities: string[]; availability: "active" | "unavailable"; joinedAt: string; }
export interface Client { id: string; name: string; contactName: string; phone: string; email: string; location: string; createdAt: string; }
export interface Equipment { id: string; name: string; plantSection: string; criticality: "critical" | "high" | "medium" | "low"; status: "operational" | "under_maintenance" | "standby"; manufacturer: string; installationDate: string; lastServiceDate: string; }
export interface JobCategory { id: string; name: string; color: string; targetHours: number; }
export interface JobActivity { id: string; createdAt: string; actor: string; type: "created" | "updated" | "assigned" | "status_changed" | "photo_added"; message: string; }
export interface Job { id: string; reference: string; title: string; description: string; clientId: string; categoryId: string; equipmentId: string; plantSection: string; priority: JobPriority; status: JobStatus; primaryTechnicianId?: string; supportingTechnicianIds: string[]; supervisorId: string; createdAt: string; updatedAt: string; scheduledFor?: string; completedAt?: string; resolution?: string; cancellationReason?: string; blockerReason?: string; repeatGroupId?: string; photos?: string[]; activity?: JobActivity[]; }
export interface Notification { id: string; type: "urgent" | "blocked" | "overdue" | "assignment"; title: string; message: string; jobId: string; createdAt: string; read: boolean; }
export interface MonthlyReport { month: string; jobsCreated: number; jobsCompleted: number; jobsCancelled: number; jobsBlocked: number; jobsArchived: number; averageCompletionHours: number; categoryBreakdown: Record<string, number>; }
export interface EmployeePerformance { employeeId: string; completedJobs: number; activeJobs: number; averageCompletionHours: number; workloadLevel: "available" | "balanced" | "high"; }
export interface SupervisorActivity { supervisorId: string; jobsCreated: number; jobsUpdated: number; assignmentsMade: number; completionsRecorded: number; }
export interface WorkloadDistribution { employeeId: string; openJobs: number; scheduledJobs: number; inProgressJobs: number; blockedJobs: number; }
export interface OperationsData { generatedAt: string; employees: Employee[]; clients: Client[]; equipment: Equipment[]; categories: JobCategory[]; jobs: Job[]; notifications: Notification[]; monthlyReports: MonthlyReport[]; employeePerformance: EmployeePerformance[]; supervisorActivity: SupervisorActivity[]; workloadDistribution: WorkloadDistribution[]; }
