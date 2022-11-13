export default function Modal({ isVisible, onClose, children }) {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "outSide") onClose();
  };

  return (
    <div
      className='z-[100] fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'
      onClick={handleClose}
      id='outSide'>
      <div className='w-[600px] flex flex-col'>
        <div className='relative p-4 w-full max-w-md h-full md:h-auto'>
          <div className='relative bg-base rounded-lg shadow '>
            <div className='py-6 px-6 lg:px-8'>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
