import React from 'react';

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-semibold text-center mb-4">Xác nhận</h3>
        <p className="text-center mb-4">{message}</p>
        <div className="flex justify-around">
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-yellow hover:text-black"
          >
            Có
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-yellow hover:text-black"
          >
            Không
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
