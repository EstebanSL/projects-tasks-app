import toast from 'react-hot-toast';
export const errorToast = (msg: string) => {
  toast.error(msg, { 
    position: 'bottom-center'
  } );
}

export const successToast = (msg: string) => {
  toast.success(msg, { 
    position: 'bottom-center'
  } );
}

