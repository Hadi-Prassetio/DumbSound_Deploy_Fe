import Image from "next/image";
import Link from "next/link";
import { Fragment, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import DropDown from "./dropdown";
import { useContext } from "react";
import { useRouter } from "next/router";
import { API } from "../../pages/api/api";

export default function MenuUser() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [auth, setAuth] = useContext(UserContext);
  // const [profile, setProfile] = useState({});
  const router = useRouter();

  // useEffect(() => {
  //   const getProfile = async (e) => {
  //     try {
  //       const response = await API.get("/check-auth");
  //       setProfile(response.data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getProfile();
  // }, [setProfile]);

  const logOut = () => {
    setAuth({
      type: "LOGOUT",
    });
    router.push("/");
  };

  const role = auth.user.status;

  return (
    <Fragment>
      <div className='flex items-center'>
        <div className='ml-5'>
          <button onClick={() => setShowDropdown(true)}>
            <div>
              <img
                // src={profile?.image == "" ? "/user.png" : profile?.image}
                src='user.png'
                alt='user'
                className='w-12 h-12 rounded-full'
              />
            </div>
          </button>
        </div>
      </div>
      <DropDown isVisible={showDropdown} onClose={() => setShowDropdown(false)}>
        <Link href='/pay'>
          <div
            className={
              role === "admin"
                ? "hidden"
                : "flex items-center mb-1 mr-10 ml-4 cursor-pointer"
            }>
            <Image src='/pay.svg' alt='profile' width={33.37} height={39.95} />
            <p className='ml-2 text-white'>Pay</p>
          </div>
        </Link>
        <Link href='/add-song'>
          <div
            className={
              role === "user"
                ? "hidden"
                : "flex items-center mb-1 mr-10 ml-4 cursor-pointer"
            }>
            <Image
              src='/music.svg'
              alt='profile'
              width={33.37}
              height={39.95}
            />
            <p className='ml-2 text-white'>Add Song</p>
          </div>
        </Link>
        <Link href='/add-artist'>
          <div
            className={
              role === "user"
                ? "hidden"
                : "flex items-center mb-1 mr-10 ml-4 cursor-pointer"
            }>
            <Image
              src='/artist.svg'
              alt='profile'
              width={33.37}
              height={39.95}
            />
            <p className='ml-2 text-white'>Add Artist</p>
          </div>
        </Link>
        <hr />
        <div
          onClick={logOut}
          className='flex items-center mt-1  mr-10 ml-4 cursor-pointer'>
          <Image src='/logout.svg' alt='profile' width={33.37} height={39.95} />
          <p className='ml-2 text-white'>Logout</p>
        </div>
      </DropDown>
    </Fragment>
  );
}
