import React, { MouseEventHandler } from 'react'
import PropTypes from 'prop-types';

interface Props {
  styleType?: 'primary' | 'secondary',
  onClick?: MouseEventHandler | undefined
  btnText: string,
  type?: 'button' | 'submit'
}

const ButtonComponent = ({
  type = 'submit',
  btnText = 'Confirm',
  styleType = 'primary',
  onClick
}: Props) => {

  const styleTypeClassess: any = {
    primary: ' bg-sky-600 '
  }

  return (
    <button 
      type={type}
      className={
        `px-4 py-2 mt-4 rounded-md text-white font-bold hover:opacity-75 transition ease-in duration-100 ${styleTypeClassess[styleType]}`
      }
      onClick={type === 'button' ? onClick : undefined}
    >
{btnText}
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

export default ButtonComponent