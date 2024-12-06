import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-blue-600 text-white flex flex-col">
      <h2 className="text-2xl font-bold p-4 border-b border-blue-700">Admin Dashboard</h2>
      <nav className="flex-grow">
        <ul className="space-y-2 p-4">
          <li>
            <Link
              to="/school"
              className="block p-2 rounded hover:bg-blue-700 transition-colors"
            >
              School
            </Link>
          </li>
          <li>
            <Link
              to="/classroom"
              className="block p-2 rounded hover:bg-blue-700 transition-colors"
            >
              Classroom
            </Link>
          </li>
          <li>
            <Link
              to="/teacher"
              className="block p-2 rounded hover:bg-blue-700 transition-colors"
            >
              Teacher
            </Link>
          </li>
          <li>
            <Link
              to="/students"
              className="block p-2 rounded hover:bg-blue-700 transition-colors"
            >
              Students
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;