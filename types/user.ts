export interface User {
  full_name: string;
  email: string;
  status: "active" | "inactive" | "banned";
  created_at: string;
  phone: string;
}
