import { render } from '@testing-library/react'

// import { vi } from 'vitest'
import { MainNav } from './main-nav'

describe('Main Navigation', () => {
  // beforeEach(() => {
  //   vi.restoreAllMocks()
  //   vi.clearAllMocks()
  // })

  it('should display the first link based on main navigation', () => {
    let wrapper = render(<MainNav />)

    expect(wrapper.getByText('Overview')).toBeInTheDocument()
  })
})
