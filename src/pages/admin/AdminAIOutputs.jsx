import { useState } from "react";
import AdminNav from "../../components/AdminNav";
import { getAdminAIOutputs } from "../../services/adminService";

export default function AdminAIOutputs() {
  const [outputs, setOutputs] = useState(getAdminAIOutputs());

  function handleValidateOutput(outputId) {
    setOutputs((currentOutputs) =>
      currentOutputs.map((output) =>
        output.id === outputId ? { ...output, validated: true } : output,
      ),
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <AdminNav />

      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Admin Panel
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          AI Outputs
        </h1>
        <p className="mt-3 text-slate-400">
          Admin can review AI-generated workout plans.
        </p>
      </div>

      {outputs.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-slate-400">
          No AI outputs available.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {outputs.map((output) => (
            <article
              key={output.id}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold">{output.goal}</h2>

                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    output.validated
                      ? "bg-lime-400/10 text-lime-300"
                      : "bg-yellow-400/10 text-yellow-300"
                  }`}
                >
                  {output.validated ? "Validated" : "Pending"}
                </span>
              </div>

              <p className="text-slate-300">User: {output.user}</p>
              <p className="mt-2 text-slate-300">
                Fitness level: {output.fitnessLevel}
              </p>

              <button
                onClick={() => handleValidateOutput(output.id)}
                disabled={output.validated}
                className={`mt-5 rounded-xl border px-4 py-2 ${
                  output.validated
                    ? "cursor-not-allowed border-slate-600 text-slate-500"
                    : "border-cyan-400 text-cyan-300"
                }`}
              >
                {output.validated ? "Already validated" : "Mark as validated"}
              </button>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
