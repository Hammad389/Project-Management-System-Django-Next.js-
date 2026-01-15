export type ProjectStatus = "Active" | "On Hold" | "Completed";

export type CreateProjectPayload = {
  title: string;
  project_description: string;
  status: ProjectStatus;
  due_date: string;
};

export type User = {
  id: number;
  username: string;
  name: string;
  role: "Developer" | "QA" | "ProjectManager";
};

export type Project = {
  id: number;
  title: string;
  project_description: string;
  status: ProjectStatus;
  due_date: string;
  developers: User[];
  qas: User[];
};
