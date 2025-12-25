type ConfirmModalProps = {
  open: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal = ({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Yes",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  if (!open) return null;

  return (
    <div
      className="
      fixed inset-0 z-[999]
      flex items-center justify-center
      bg-black/60 backdrop-blur-sm
    "
    >
      <div
        className="
        bg-white dark:bg-[#1F1F1F]
        rounded-xl p-6 w-[90%] max-w-[380px]
        text-black dark:text-white
        shadow-xl
      "
      >
        <h3 className="text-lg font-semibold mb-2">{title}</h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="
              px-4 py-2 rounded-lg border
              border-gray-300 dark:border-gray-600
              hover:bg-gray-100 dark:hover:bg-gray-700
              transition
            "
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="
              px-4 py-2 rounded-lg
              bg-red-500 text-white
              hover:bg-red-600
              transition
            "
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
