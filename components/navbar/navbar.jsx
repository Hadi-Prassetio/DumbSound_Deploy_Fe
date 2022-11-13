import Image from "next/image";
import Link from "next/link";
import { Fragment, useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import Login from "../auth/login";
import Register from "../auth/register";
import Button from "../button";
import Modal from "../modal";
import Menu from "./menu";
import { API } from "../../pages/api/api";

export default function Navbar({ showLogin, setShowLogin, counter }) {
  const [auth, setAuth] = useContext(UserContext);
  const isLogin = auth.isLogin;

  const [showRegister, setShowRegister] = useState(false);

  const switchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };
  const switchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  return (
    <Fragment>
      <nav
        className={
          auth.user.status == "admin"
            ? "bg-[#1F1F1F] fixed w-full top-0"
            : "bg-transparant fixed w-full top-0"
        }>
        <div className='flex justify-between items-center'>
          <div className='md:ml-10'>
            <Link
              href={auth.user.status === "admin" ? "/income-transaction" : "/"}>
              <Image
                src='/navicon.svg'
                width={124}
                height={40}
                alt='icon'
                className='cursor-pointer'
              />
            </Link>
          </div>
          <div className='md:mr-10 flex items-center'>
            {isLogin ? (
              <div>
                <Menu />
              </div>
            ) : (
              <>
                <Button
                  name='Register'
                  onClick={() => setShowRegister(true)}
                  className='bg-transparant border border-white md:px-7 md:py-1 px-2 py-1 mx-1 text-white rounded-md hover:bg-base hover:text-btn active:bg-gray-400 active:text-white'
                />
                <Button name='Login' onClick={() => setShowLogin(true)} />
                <Modal
                  isVisible={showLogin}
                  onClose={() => setShowLogin(false)}>
                  <Login />
                  <p className='text-center text-pholder'>
                    Don't have an Account? klik{" "}
                    <b className='cursor-pointer' onClick={switchToRegister}>
                      Here
                    </b>
                  </p>
                </Modal>
                <Modal
                  isVisible={showRegister}
                  onClose={() => setShowRegister(false)}>
                  <Register />
                  <p className='text-center text-pholder'>
                    Already have an Account? klik{" "}
                    <b className='cursor-pointer' onClick={switchToLogin}>
                      Here
                    </b>
                  </p>
                </Modal>
              </>
            )}
          </div>
        </div>
      </nav>
    </Fragment>
  );
}
