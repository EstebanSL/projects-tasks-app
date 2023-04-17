export const Alert = ({ alert }: any) => {
  return (
    <p className='text-red-600 text-center p-2 bg-red-200 rounded-md mt-4 font-bold'>{ alert.msg }</p>
  )
}