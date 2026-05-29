 export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200">
      {message}
    </div>
  );
}

