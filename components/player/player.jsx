import * as React from "react";

const Player = ({
  audioElem,
  isplaying,
  setisplaying,
  currentSong,
  setCurrentSong,
  songs,
}) => {
  const clickRef = React.useRef();

  const PlayPause = () => {
    setisplaying(!isplaying);
  };
  const Play = () => {
    setisplaying(true);
  };

  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth;
    const offset = e?.nativeEvent.offsetX;

    const divprogress = (offset / width) * 100;
    audioElem.current.currentTime = (divprogress / 100) * currentSong.length;
  };

  const skipBack = () => {
    const index = songs.findIndex((x) => x.title == currentSong.title);
    if (index == 0) {
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setCurrentSong(songs[index - 1]);
    }
    audioElem.current.currentTime = 0;
  };

  const skiptoNext = () => {
    const index = songs.findIndex((x) => x.title == currentSong.title);

    if (index == songs.length - 1) {
      setCurrentSong(songs[0]);
    } else {
      setCurrentSong(songs[index + 1]);
    }
    audioElem.current.currentTime = 0;
  };

  return (
    <div className='player_container bg-transparant bg-black/80'>
      <div className='grid grid-cols-12 w-full px-10 pt-2'>
        <img
          src={currentSong.image}
          alt='thumbnail'
          className={
            isplaying
              ? "w-[4rem] h-[4rem] rounded-full animate-spin-slow"
              : "w-[4rem] h-[4rem] rounded-full"
          }
        />
        <div className='col-span-11 ml-2 grid grid-cols-3'>
          <div className='title text-center col-span-3'>
            <p className='font-bold'>{currentSong.title}</p>
          </div>
          <div className='navigation col-span-3'>
            <div
              className='navigation_wrapper'
              onClick={
                !isplaying
                  ? () => {
                      Play();
                    }
                  : checkWidth
              }
              ref={clickRef}>
              <div
                className='seek_bar'
                style={{ width: `${currentSong.progress + "%"}` }}></div>
            </div>
          </div>
          <></>
          <div className='controls col-span-3 grid justify-items-center my-3 mx-auto'>
            <img
              src='/nextback.svg'
              alt='pause'
              onClick={() => {
                skipBack();
                PlayPause();
              }}
            />
            {isplaying ? (
              <img
                src='/pause.svg'
                alt='pause'
                onClick={PlayPause}
                className='mx-4'
              />
            ) : (
              <img
                src='/play.svg'
                alt='pause'
                onClick={PlayPause}
                className='mx-4'
              />
            )}
            <img
              src='/next.svg'
              alt='pause'
              onClick={() => {
                skiptoNext();
                PlayPause();
              }}
            />
          </div>
          <></>
        </div>
      </div>
    </div>
  );
};

export default Player;
