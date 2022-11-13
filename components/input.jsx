export default function Input({ ...input }) {
  return (
    <div>
      <input
        className='w-full py-2 my-3 pl-1 bg-auth bg-opacity-25 rounded-lg border-2 border-gray-400/70 focus:outline-none focus:ring focus:ring-main text-white'
        {...input}
      />
    </div>
  );
}
