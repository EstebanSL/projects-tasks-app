import { useContext } from 'react'
import { ModalsContext } from '../context/ModalsContext'

export const useModals = (): any => {
  return useContext(ModalsContext)
}
