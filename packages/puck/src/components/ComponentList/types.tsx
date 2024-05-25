import type Icon from '@acme/ui/components/icon'

export type TComponentListItem = {
  icon: keyof typeof Icon
  label?: string
}
