/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const DeleteModal = ({ open, onClose, childern }) => {
  return (
    <div
      className={`fixed z-50 inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      } `}
      onClick={onClose}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow pt-2 pb-6 px-6  transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        {childern}
      </div>
    </div>
  );
};

export default DeleteModal;
