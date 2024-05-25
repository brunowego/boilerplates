import { useAppContext } from '../../context'
import { useComponentList } from '../../../../lib/use-component-list'
import { useMemo } from 'react'
import { ComponentList } from '../../../ComponentList'

export const Components = () => {
  const { config, state, overrides } = useAppContext()

  const componentList = useComponentList(config, state.ui)

  const Wrapper = useMemo(() => overrides.components || 'div', [overrides])

  return (
    <Wrapper className='divide-y'>
      {componentList ? componentList : <ComponentList id='all' />}
    </Wrapper>
  )
}
