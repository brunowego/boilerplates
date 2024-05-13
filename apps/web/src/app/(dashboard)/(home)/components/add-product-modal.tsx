'use client'

import { type ReactNode, type JSX, useState } from 'react'

import Modal from '@acme/ui/components/modal'

import AddProductForm from './add-product-form'

type AddProductModalProps = {
  title: string | ReactNode
  subtitle: string | ReactNode
  trigger: ReactNode
}

export default function AddProductModal({
  title,
  subtitle,
  trigger,
}: AddProductModalProps): JSX.Element {
  const [open, setOpen] = useState(false)

  return (
    <Modal
      dialogProps={{
        open,
        onOpenChange: (val) => setOpen(val),
      }}
      size='xl'
      title={title}
      subtitle={subtitle}
      trigger={trigger}
    >
      <AddProductForm setOpen={setOpen} />
    </Modal>
  )
}
