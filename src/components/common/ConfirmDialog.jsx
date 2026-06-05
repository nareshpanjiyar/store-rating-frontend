export default function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/60
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-full
          max-w-md
          bg-white
          dark:bg-slate-900
          rounded-2xl
          shadow-2xl
          p-6
          border
          border-slate-200
          dark:border-slate-800
        "
      >
        <h2 className="text-xl font-bold mb-3">{title}</h2>

        <p className="text-slate-600 dark:text-slate-300 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="
              px-4
              py-2
              rounded-lg
              border
              border-slate-300
              dark:border-slate-700
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="
              px-4
              py-2
              rounded-lg
              bg-red-500
              hover:bg-red-600
              text-white
            "
          >
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
}
