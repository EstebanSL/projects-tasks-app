import React, { MouseEventHandler } from 'react'
import BtnLoader from './BtnLoader'

interface Props {
  styleType?: 'primary' | 'secondary' | 'destructive',
  onClick?: MouseEventHandler | undefined
  btnText: string,
  type?: 'button' | 'submit',
  addtionalStyles?: string,
  children?: React.ReactNode,
  loading?: boolean
}

export const ButtonComponent = ({
  type = 'submit',
  btnText = 'Confirm',
  styleType = 'primary',
  onClick,
  addtionalStyles,
  children,
  loading
}: Props) => {

  const styleTypeClassess: any = {
    primary: 'from-cyan-500 to-blue-500',
    destructive: 'from-red-500 to-orange-500'
  }

  return (
    <button 
      type={type}
      className={
        `bg-gradient-to-r flex gap-2 items-center justify-center px-4 py-2 box-border text-white font-bold hover:opacity-75 transition ease-in duration-100 ${styleTypeClassess[styleType]} ${addtionalStyles}`
      }
      onClick={type === 'button' ? onClick : undefined}
    >
    {
      loading ? 
      <BtnLoader />
      :<>{children} {' '} {btnText}</>
    }
    </button>
  )
}

ButtonComponent.propTypes = {
  onClick: function(props: any, propName: string) {
    if ((props['type'] === 'submit' && (props[propName] !== undefined))) {
      return new Error('Please remove onClick function when the button type is submit');
    }
    if(props['type'] === 'button' && props[propName] === undefined) {
      return new Error('Please provide a onClick function!');
    }
    if (props['type'] === 'button' && typeof(props[propName]) !== 'function') {
      return new Error('onClick must be a function!');
    }
  },
}