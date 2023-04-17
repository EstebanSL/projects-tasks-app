import { ButtonComponent } from '.'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks'

export const Sidebar = () => {

  const { auth } = useAuth()
  const navigate = useNavigate()

  return (
    <aside className='md:w-60 lg:w-80 flex flex-col items-center px-4 py-6'>
      <p>Hello, {auth.username}</p>

      <ButtonComponent btnText='Create project' onClick={() => navigate('create-project')} type='button' addtionalStyles='mt-4 w-full'/>
    </aside>
  )
}