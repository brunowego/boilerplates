import toast from 'react-hot-toast'

const style = {
  borderRadius: '2px',
  boxShadow: 'none',
}

export default function showToast(message: string, variant: 'success' | 'warning' | 'error') {
  switch (variant) {
    case 'success':
      toast.success(message, {
        duration: 6000,
        style: {
          ...style,
          background: '#333',
          color: '#fff',
        },
      })
      break
    case 'error':
      toast.error(message, {
        duration: 6000,
        style: {
          ...style,
          background: '#FEE2E2',
          color: '#B91C1C',
        },
      })
      break
    case 'warning':
      toast(message, {
        duration: 6000,
        style: {
          ...style,
          background: '#FFEDD5',
          color: '#C2410C',
        },
      })
      break
  }
}
