import  { useContext } from 'react'
import { ProjectsContext } from '../context/ProjectsContext'

const useProjects = (): any => {
  return useContext(ProjectsContext)
}

export default useProjects