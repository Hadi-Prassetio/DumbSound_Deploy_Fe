import * as React from "react";
import Layout from "../components/layout";
import { API } from "./api/api";
import RP from "rupiah-format";

export default function IncomeTransaction() {
  const [income, setIncome] = React.useState();

  React.useEffect(() => {
    const getIncome = async (e) => {
      const response = await API.get("/transactions");
      setIncome(response.data.data);
    };
    getIncome();
  }, []);

  return (
    <Layout pageTitle='Income Transaction'>
      {income == "" ? (
        <div className='flex justify-center mt-5'>
          <img src='/empty.png' alt='no transaction' width={750} />
        </div>
      ) : (
        <>
          <div className='md:px-40 md:py-10'>
            <p className='font-bold text-4xl my-10 font-header text-white'>
              Income Transaction
            </p>
            <div className='overflow-x-auto '>
              <table className='w-full text-sm text-left text-gray-500'>
                <thead className='text-md bg-[#2B2B2B] text-main text-center'>
                  <tr>
                    <th scope='col' className='py-3 px-6'>
                      No
                    </th>
                    <th scope='col' className='py-3 px-6'>
                      Users
                    </th>
                    <th scope='col' className='py-3 px-6'>
                      Remaining Active
                    </th>
                    <th scope='col' className='py-3 px-6'>
                      Status User
                    </th>
                    <th scope='col' className='py-3 px-6'>
                      Status Payment
                    </th>
                  </tr>
                </thead>
                {income?.map((item, index) => (
                  <tbody key={item.id}>
                    <tr className='border-b bg-[#3A3A3A] text-center'>
                      <td className='py-4 px-6 text-white'>{index + 1}</td>
                      <td
                        scope='row'
                        className='py-4 px-6 font-medium whitespace-nowrap text-white'>
                        {item.user.fullname}
                      </td>
                      <td className='py-4 px-6 text-white'>
                        {item.limit} /Hari
                      </td>
                      <td
                        className={
                          item.status_user == "Not Active"
                            ? "py-4 px-6 text-red-400"
                            : "py-4 px-6 text-green-400"
                        }>
                        {item.status_user}
                      </td>
                      <td
                        className={
                          item.status == "pending"
                            ? "py-4 px-6 text-yellow-400"
                            : item.status == "failed"
                            ? "py-4 px-6 text-red-400"
                            : item.status == "success" &&
                              "py-4 px-6 text-green-400"
                        }>
                        {item.status}
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}
