function SuccessMessage({ message }) {
  if (!message) return null;

  return (
    <div className="rounded-2xl border border-lime-400/20 bg-lime-400/10 p-4 text-sm text-lime-200">
      {message}
    </div>
  );
}

export default SuccessMessage;