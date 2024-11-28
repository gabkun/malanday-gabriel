import { Link } from "react-router-dom";

const team = [
  { id: 1, name: "Alice Johnson", role: "Frontend Developer" },
  { id: 2, name: "Bob Smith", role: "Backend Developer" },
  { id: 3, name: "Charlie Davis", role: "UI/UX Designer" },
];

const Team = () => {
  return (
    <div className="container mt-5">
      <h2>Meet Our Team</h2>
      <ul className="list-group">
        {team.map((member) => (
          <li key={member.id} className="list-group-item">
            <Link to={`/team/${member.id}`}>{member.name}</Link> - {member.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Team;