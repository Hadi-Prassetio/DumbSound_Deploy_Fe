export default function PlayModal({
  isVisible,
  children,
  onClose,
  setisplaying,
}) {
  if (!isVisible) return null;

  const pausePlay = () => {
    setisplaying(false);
  };

  const handleClose = (e) => {
    onClose();
  };

  return (
    <div className='fixed inset-0 flex justify-center items-end' id='outSide'>
      <div className='grid grid-cols-1 w-full'>
        <button
          onClick={() => {
            handleClose();
            pausePlay();
          }}
          className='text-white mx-5 font-bold grid justify-items-end '>
          X
        </button>
        <div className=''>
          <div className='relative bg-transparant shadow'>{children}</div>
        </div>
      </div>
    </div>
  );
}
