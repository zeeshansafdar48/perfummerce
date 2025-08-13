import Link from "next/link";

interface AdminBackButtonProps {
  label?: string;
}

const AdminBackButton: React.FC<AdminBackButtonProps> = ({ label = "Back to Dashboard" }) => (
  <Link href="/admin" className="inline-block mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-800 font-medium shadow">
    ← {label}
  </Link>
);

export default AdminBackButton;
