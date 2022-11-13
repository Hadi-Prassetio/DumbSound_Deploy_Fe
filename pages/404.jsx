import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 2000);
  }, []);

  return (
    <div className='mx-auto text-center '>
      <div className=' mt-[15rem]'>
        <h1 className='text-8xl font-bold text-txt'>Ooops....</h1>
        <br />
        <h1 className='text-3xl font-bold text-txt'>
          Halaman yang anda cari tidak ditemukan!
        </h1>
      </div>
    </div>
  );
}
