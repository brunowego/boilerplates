import { render } from '@testing-library/react'

import { OrderStatus } from './order-status'

describe('Order Status', () => {
  it('should display the right text based on order status', () => {
    let wrapper = render(<OrderStatus status='pending' />)

    expect(wrapper.getByText('Pending')).toBeInTheDocument()

    wrapper = render(<OrderStatus status='processing' />)

    expect(wrapper.getByText('In preparation')).toBeInTheDocument()

    wrapper = render(<OrderStatus status='delivering' />)

    expect(wrapper.getByText('In delivery')).toBeInTheDocument()

    wrapper = render(<OrderStatus status='delivered' />)

    expect(wrapper.getByText('Delivered')).toBeInTheDocument()

    wrapper = render(<OrderStatus status='canceled' />)

    expect(wrapper.getByText('Canceled')).toBeInTheDocument()
  })
})
