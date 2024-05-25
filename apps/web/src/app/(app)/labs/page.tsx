import Page from '@acme/ui/components/page'

import Labs from './components/labs'

export default function LabsPage(): JSX.Element {
  return (
    <Page>
      <Page.Content>
        <Labs />
      </Page.Content>
    </Page>
  )
}
