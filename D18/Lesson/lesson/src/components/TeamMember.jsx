import { useParams } from "react-router-dom";

const team = [
  { id: 1, name: "Alice Johnson", role: "Frontend Developer", bio: "Alice is passionate about building beautiful web interfaces." },
  { id: 2, name: "Bob Smith", role: "Backend Developer", bio: "Bob loves optimizing server performance and database design." },
  { id: 3, name: "Charlie Davis", role: "UI/UX Designer", bio: "Charlie ensures every user has a seamless experience." },
];

const TeamMember = () => {
  const { id } = useParams();
  const member = team.find((m) => m.id === parseInt(id));

  if (!member) return <h2>Team member not found!</h2>;

  return (
    <div className="container mt-5">
      <h2>{member.name}</h2>
      <h4>{member.role}</h4>
      <p>{member.bio}</p>
    </div>
  );
};

export default TeamMember;