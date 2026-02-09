type ConfirmModalProps = {
  open: boolean;
  title?: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmModal = ({
    open,
    title = 'Confirm action',
    message,
    onCancel,
    onConfirm,
    }: ConfirmModalProps) => {

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {title}
            </h3>

            <p className="text-gray-600 mb-6">{message}</p>

            <div className="flex justify-end gap-3">
            <button
                onClick={onCancel}
                className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-200 cursor-pointer"
            >
                Cancel
            </button>

            <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-700 cursor-pointer"
            >
                Delete
            </button>
            </div>
        </div>
        </div>
    );
};

export default ConfirmModal;
