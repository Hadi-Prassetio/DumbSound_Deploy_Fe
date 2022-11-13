export default function MapModal({ isVisible, children, onClose }) {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "outSide") onClose();
  };

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-25 flex justify-center items-end'
      onClick={handleClose}
      id='outSide'>
      <div className='md:w-4/5'>
        <div className='relative bg-white rounded-lg shadow'>{children}</div>
      </div>
    </div>
  );
}
