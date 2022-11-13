import Layout from "../components/layout";
import Input from "../components/input";
import * as React from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { API } from "./api/api";
import { Success, Warning } from "../helper/toast";

export default function AddProduct() {
  const [artist, setArtist] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    setArtist({
      ...artist,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      setLoading(true);
      const name = artist.name;
      const role = artist.role;
      const old = JSON.parse(artist.old);
      const start_career = JSON.parse(artist.start_career);
      const body = { name, role, old, start_career };

      const response = await API.post("/artist", body);
      Success({ message: "Artist Added" });
      setLoading(false);
    } catch (error) {
      Warning({ message: "Failed Add Artist" });
      setLoading(false);
    }
  });

  return (
    <Layout pageTitle='Add Artist'>
      <div className='container max-w-6xl'>
        <h1 className='font-bold text-3xl md:mt-20 mt-5 mb-10 font-mainFont text-white'>
          Add Artist
        </h1>
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Input
            placeholder='Name'
            type='text'
            name='name'
            onChange={handleChange}
          />
          <Input
            placeholder='Old'
            type='number'
            name='old'
            onChange={handleChange}
          />
          <select
            className='w-full text-white py-2 my-3 pl-1 bg-auth bg-opacity-25 rounded-md border-2 border-gray-400/70 focus:outline-none focus:ring focus:ring-main'
            name='role'
            onChange={handleChange}>
            <option selected className=' hidden'>
              Role
            </option>
            <option value='solo' className='text-black'>
              Solo
            </option>
            <option value='duet' className='text-black'>
              Duet
            </option>
            <option value='group' className='text-black'>
              Group
            </option>
          </select>
          <Input
            placeholder='Start a Career'
            type='number'
            name='start_career'
            onChange={handleChange}
          />
          <div className='flex justify-center my-10'>
            <button
              type='submit'
              className='w-[30%] py-1 px-10 bg-btn text-white my-3 rounded-lg text-center hover:bg-main/70 active:bg-main'>
              {loading ? "loading..." : "Add Artist"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
