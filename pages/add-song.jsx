import { useRouter } from "next/router";
import * as React from "react";
import { useMutation } from "react-query";
import Input from "../components/input";
import Layout from "../components/layout";
import { Success, Warning } from "../helper/toast";
import { API } from "./api/api";

export default function AddProduct() {
  const [artist, setArtist] = React.useState();
  const [song, setSong] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const getArtist = async () => {
    const response = await API.get("/artists");
    setArtist(response.data.data);
  };
  React.useEffect(() => {
    getArtist();
  }, []);

  const handleChange = (e) => {
    setSong({
      ...song,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const formData = new FormData();
      formData.set("title", song.title);
      formData.set("year", song.year);
      formData.set("artist_id", song.artist);
      formData.set("image", song.image[0], song.image[0].name);
      formData.set("song", song.song[0], song.song[0].name);
      console.log(formData);

      await API.post("/song", formData);
      Success({ message: "Song Added" });
      setLoading(false);
    } catch (error) {
      console.log(error);
      Warning({ message: "Failed Add Song" });
      setLoading(false);
    }
  });

  return (
    <Layout pageTitle='Add Song'>
      <div className='container max-w-6xl'>
        <h1 className='font-bold text-3xl md:mt-20 mt-5 mb-10 font-mainFont text-white'>
          Add Music
        </h1>
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className='grid md:grid-cols-12 md:gap-4'>
            <div className='md:col-span-8'>
              <Input
                placeholder='Title'
                type='text'
                name='title'
                onChange={handleChange}
              />
            </div>
            <div className='md:col-span-4 grid content-center'>
              <input
                type='file'
                id='image'
                hidden
                name='image'
                onChange={handleChange}
              />
              <label
                htmlFor='image'
                className='w-full p-2 grid grid-cols-2 bg-auth bg-opacity-25 rounded-lg border-2 text-white border-gray-400/70'>
                <div>Attach Thumbnail</div>
                <div className='grid justify-end'>
                  <img src='/pin.svg' width={15} />
                </div>
              </label>
            </div>
          </div>
          <Input
            placeholder='Year'
            type='number'
            name='year'
            onChange={handleChange}
          />
          <select
            className='w-full text-white py-2 my-3 pl-1 bg-auth bg-opacity-25 rounded-md border-2 border-gray-400/70 focus:outline-none focus:ring focus:ring-main'
            name='artist'
            onChange={handleChange}>
            <option selected className=' hidden'>
              Artist
            </option>
            {artist?.map((item) => (
              <option key={item.id} value={item.id} className='text-black'>
                {item.name}
              </option>
            ))}
          </select>
          <div className='w-[10%] md:col-span-3 my-3 '>
            <input
              type='file'
              id='song'
              hidden
              name='song'
              onChange={handleChange}
            />
            <label
              htmlFor='song'
              className='w-full md:grid p-2  text-center bg-auth bg-opacity-25 rounded-lg border-2 text-white border-gray-400/70'>
              Attach
            </label>
          </div>
          <div className='flex justify-center my-10'>
            <button
              type='submit'
              className='w-[30%] py-1 px-10 bg-btn text-white my-3 rounded-lg text-center hover:bg-main/70 active:bg-main'>
              {loading ? "loading..." : "Add Song"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
