export default function DropDown({ isVisible, onClose, children }) {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "outSide") onClose();
  };
  return (
    <>
      <div
        className='fixed inset-0 flex justify-end'
        onClick={handleClose}
        id='outSide'>
        <div className='mt-[50px] md:mr-10 mr-1 h-10'>
          <div className='triangle-up relative ml-[155px] mr-[10px] z-40 '></div>
          <div className='relative bg-[#3A3A3A] rounded-lg shadow py-1'>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
