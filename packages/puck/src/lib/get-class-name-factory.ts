import classnames from 'classnames'

export const getGlobalClassName = (rootClass, options) => {
  if (typeof options === 'string') {
    return `${rootClass}-${options}`
  }

  const mappedOptions = {}

  for (const option in options) {
    mappedOptions[`${rootClass}--${option}`] = options[option]
  }

  return classnames({
    [rootClass]: true,
    ...mappedOptions,
  })
}

const getClassNameFactory =
  (rootClass, styles, { baseClass = '' } = {}) =>
  (options = {}) => {
    let descendant: any = false
    let modifiers: any = false

    if (typeof options === 'string') {
      descendant = options
    } else if (typeof options === 'object') {
      modifiers = options
    }

    if (descendant) {
      const style = styles[`${rootClass}-${descendant}`]

      if (style) {
        return baseClass + styles[`${rootClass}-${descendant}`] || ''
      }

      return ''
    }

    if (modifiers) {
      const prefixedModifiers = {}

      for (const modifier in modifiers) {
        prefixedModifiers[styles[`${rootClass}--${modifier}`]] =
          modifiers[modifier]
      }

      const c = styles[rootClass]

      return (
        baseClass +
        classnames({
          [c]: !!c, // only apply the class if it exists
          ...prefixedModifiers,
        })
      )
    }

    return baseClass + styles[rootClass] || ''
  }

export default getClassNameFactory
