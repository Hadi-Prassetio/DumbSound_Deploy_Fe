import * as React from "react";
import { useRouter } from "next/router";
import Button from "../components/button";
import Layout from "../components/layout";
import { API } from "./api/api";

export default function Pay() {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const [transaction, setTransaction] = React.useState();

  React.useEffect(() => {
    const getTransaction = async (e) => {
      const response = await API.get("/transaction");
      setTransaction(response.data.data);
    };
    getTransaction();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const response = await API.post("/transaction");
    console.log(response);

    const token = response.data.data.token;
    console.log(token, "tokennn");
    setLoading(false);

    window.snap.pay(token, {
      onSuccess: function (result) {
        /* You may add your own implementation here */
        console.log(result);
        router.push("/");
      },
      onPending: function (result) {
        /* You may add your own implementation here */
        console.log(result);
        router.push("/");
      },
      onError: function (result) {
        /* You may add your own implementation here */
        console.log(result);
      },
      onClose: function () {
        /* You may add your own implementation here */
        alert("you closed the popup without finishing the payment");
      },
    });
  };

  React.useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <Layout pageTitle='Buy Premium'>
      <div className='text-white text-center md:mt-[13rem] mt-10'>
        <h1 className='text-5xl font-bold mb-10'>
          {transaction == undefined ? "Premium" : "Anda Sudah Premium"}
        </h1>
        {transaction == undefined ? (
          <>
            <p>
              Bayar sekarang dan nikmati streaming music yang kekinian dari
              <b className='text-main'>DUMB</b>
              <b>SOUND</b>
            </p>
            <p>
              Hanya <b className='text-main'>Rp.20.000</b>
            </p>
          </>
        ) : (
          <>
            {" "}
            <p>
              Nikmati streaming music yang kekinian dari
              <b className='text-main'>DUMB</b>
              <b>SOUND</b>
            </p>
            <p>
              Sisa waktu <b className='text-main'>{transaction.limit} Hari</b>
            </p>
          </>
        )}
        {transaction == undefined && (
          <Button
            onClick={handleSubmit}
            name={loading ? "Loading..." : "Pay"}
            className='mt-10 bg-main text-white hover:bg-main/40 active:bg-main/80 py-2 w-32 rounded-lg'
          />
        )}
      </div>
    </Layout>
  );
}
