import * as React from "react";
import Button from "../button";
import Input from "../input";
import { useMutation } from "react-query";
import { API } from "../../pages/api/api";
import { Success, Error } from "../../helper/toast";

export default function Register() {
  const [form, setForm] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await API.post("/register", form);
      Success({ message: "Success Register" });
      setLoading(false);
    } catch (error) {
      Error({ message: "Failed Register" });
      setLoading(false);
    }
  });

  return (
    <form onSubmit={(e) => handleSubmit.mutate(e)}>
      <h3 className='mb-4 text-5xl font-medium text-main '>Register</h3>
      <Input
        placeholder='Email'
        type='email'
        name='email'
        onChange={handleChange}
      />
      <Input
        placeholder='Password'
        type='password'
        name='password'
        onChange={handleChange}
      />
      <Input
        placeholder='Fullname'
        type='text'
        name='fullname'
        onChange={handleChange}
      />
      <select
        className='text-white w-full py-2 my-3 pl-1 bg-auth bg-opacity-25 rounded-md border-2 border-gray-400/70 focus:outline-none focus:ring focus:ring-main'
        name='gender'
        onChange={handleChange}>
        <option selected className=' hidden'>
          Gender
        </option>
        <option value='male' className='text-black'>
          Male
        </option>
        <option value='female' className='text-black'>
          Female
        </option>
        <option value='non biner' className='text-black'>
          Non Biner
        </option>
      </select>

      <Input
        placeholder='Phone'
        type='number'
        name='phone'
        onChange={handleChange}
      />

      <Input
        placeholder='Address'
        type='text'
        name='address'
        onChange={handleChange}
      />
      <Button
        name={loading ? "loading..." : "Register"}
        type='submit'
        className='w-full bg-btn text-white rounded-lg py-2 my-5 hover:bg-main/70 active:bg-main/70'
      />
    </form>
  );
}
