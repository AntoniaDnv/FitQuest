export default function AdminAIOutputs() {
  const outputs = [
    {
      id: 1,
      user: "mireya@test.com",
      goal: "weight loss",
      fitnessLevel: "beginner",
      isValidated: true,
    },
    {
      id: 2,
      user: "user@test.com",
      goal: "endurance",
      fitnessLevel: "intermediate",
      isValidated: false,
    },
  ];

  return (
    <main className="admin-page">
      <h1>AI Outputs</h1>
      <p>Admin can review AI-generated workout plans.</p>

      <div className="admin-list">
        {outputs.map((output) => (
          <article className="admin-card" key={output.id}>
            <h2>{output.goal}</h2>
            <p>User: {output.user}</p>
            <p>Fitness level: {output.fitnessLevel}</p>
            <p>Validated: {output.isValidated ? "Yes" : "No"}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
