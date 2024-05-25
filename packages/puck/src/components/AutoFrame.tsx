import { type ReactNode, useEffect, forwardRef } from 'react'
import Frame, {
  type FrameComponentProps,
  useFrame,
} from 'react-frame-component'
import hash from 'object-hash'

const styleSelector = 'style, link[rel="stylesheet"]'

const collectStyles = (doc: Document) => {
  const collected: HTMLElement[] = []

  for (const style of doc.head.querySelectorAll(styleSelector)) {
    collected.push(style as HTMLElement)
  }

  return collected
}

const getStyleSheet = (el: HTMLElement) => {
  return Array.from(document.styleSheets).find((ss) => {
    const ownerNode = ss.ownerNode as HTMLLinkElement

    return ownerNode.href === (el as HTMLLinkElement).href
  })
}

const getStyles = (styleSheet?: CSSStyleSheet) => {
  if (styleSheet) {
    try {
      return [...styleSheet.cssRules].map((rule) => rule.cssText).join('')
    } catch (err) {
      console.error(err)

      console.warn(
        'Access to stylesheet %s is denied. Ignoring…',
        styleSheet.href,
      )
    }
  }

  return ''
}

const defer = (fn: () => void) => setTimeout(fn, 0)

type CopyHostStylesProps = {
  children: ReactNode
  debug?: boolean
  onStylesLoaded?: () => void
}

const CopyHostStyles = ({
  children,
  debug = false,
  onStylesLoaded = () => null,
}: CopyHostStylesProps) => {
  const { document: doc, window: win } = useFrame()

  useEffect(() => {
    if (!win || !doc) {
      return () => {}
    }

    const elements: { original: HTMLElement; mirror: HTMLElement }[] = []
    const hashes: Record<string, boolean> = {}

    const lookupEl = (el: HTMLElement) =>
      elements.findIndex((elementMap) => elementMap.original === el)

    const mirrorEl = async (el: HTMLElement, inlineStyles = false) => {
      let mirror: HTMLStyleElement

      if (el.nodeName === 'LINK' && inlineStyles) {
        mirror = document.createElement('style') as HTMLStyleElement
        mirror.type = 'text/css'

        let styleSheet = getStyleSheet(el)

        if (!styleSheet) {
          await new Promise<void>((resolve) => {
            const fn = () => {
              resolve()
              el.removeEventListener('load', fn)
            }

            el.addEventListener('load', fn)
          })

          styleSheet = getStyleSheet(el)
        }

        const styles = getStyles(styleSheet)

        if (!styles) {
          if (debug) {
            console.warn(
              `Tried to load styles for link element, but couldn't find them. Skipping...`,
            )
          }

          return
        }

        mirror.innerHTML = styles

        // biome-ignore lint/style/noNonNullAssertion: This is a known element
        mirror.setAttribute('data-href', el.getAttribute('href')!)
      } else {
        mirror = el.cloneNode(true) as HTMLStyleElement
      }

      return mirror
    }

    const addEl = async (el: HTMLElement) => {
      const index = lookupEl(el)

      if (index > -1) {
        if (debug) {
          console.log(
            'Tried to add an element that was already mirrored. Updating instead...',
          )
        }

        const element = elements[index]

        if (element?.mirror) {
          element.mirror.innerText = el.innerText
        }

        return
      }

      const mirror = await mirrorEl(el)

      if (!mirror) {
        return
      }

      const elHash = hash(mirror.outerHTML)

      if (hashes[elHash]) {
        if (debug) {
          console.log(
            'iframe already contains element that is being mirrored. Skipping...',
          )
        }

        return
      }

      hashes[elHash] = true

      doc.head.append(mirror as HTMLElement)
      elements.push({ original: el, mirror: mirror })

      if (debug) {
        console.log(`Added style node ${el.outerHTML}`)
      }
    }

    const removeEl = (el: HTMLElement) => {
      const index = lookupEl(el)

      if (index === -1) {
        if (debug) {
          console.log(
            'Tried to remove an element that did not exist. Skipping...',
          )
        }

        return
      }

      const elHash = hash(el.outerHTML)

      elements[index]?.mirror?.remove()

      delete hashes[elHash]

      if (debug) {
        console.log(`Removed style node ${el.outerHTML}`)
      }
    }

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          for (const addedNode of mutation.addedNodes) {
            if (
              addedNode.nodeType === Node.TEXT_NODE ||
              addedNode.nodeType === Node.ELEMENT_NODE
            ) {
              const el =
                addedNode.nodeType === Node.TEXT_NODE
                  ? addedNode.parentElement
                  : (addedNode as HTMLElement)

              if (el?.matches(styleSelector)) {
                defer(() => addEl(el))
              }
            }
          }

          for (const removedNode of mutation.removedNodes) {
            if (
              removedNode.nodeType === Node.TEXT_NODE ||
              removedNode.nodeType === Node.ELEMENT_NODE
            ) {
              const el =
                removedNode.nodeType === Node.TEXT_NODE
                  ? removedNode.parentElement
                  : (removedNode as HTMLElement)

              if (el?.matches(styleSelector)) {
                defer(() => removeEl(el))
              }
            }
          }
        }
      }
    })

    const parentDocument = win?.parent.document

    const collectedStyles = collectStyles(parentDocument)
    const hrefs: string[] = []

    let stylesLoaded = 0

    Promise.all(
      collectedStyles.map(async (styleNode, i) => {
        if (styleNode.nodeName === 'LINK') {
          const linkHref = (styleNode as HTMLLinkElement).href

          // Don't process link elements with identical hrefs more than once
          if (hrefs.indexOf(linkHref) > -1) {
            return
          }

          hrefs.push(linkHref)
        }

        const mirror = await mirrorEl(styleNode)

        if (!mirror) {
          return
        }

        elements.push({ original: styleNode, mirror })

        return mirror
      }),
    ).then((mirrorStyles) => {
      const filtered = mirrorStyles.filter(
        (el) => typeof el !== 'undefined',
      ) as HTMLStyleElement[]

      for (const mirror of filtered) {
        mirror.onload = () => {
          stylesLoaded = stylesLoaded + 1

          if (stylesLoaded >= elements.length) {
            onStylesLoaded()
          }
        }

        mirror.onerror = () => {
          console.warn("AutoFrame couldn't load a stylesheet")

          stylesLoaded = stylesLoaded + 1

          if (stylesLoaded >= elements.length) {
            onStylesLoaded()
          }
        }
      }

      // Reset HTML (inside the promise) so in case running twice (i.e. for React Strict mode)
      doc.head.innerHTML = ''

      // Inject initial values in bulk
      doc.head.append(...filtered)

      observer.observe(parentDocument.head, { childList: true, subtree: true })

      for (const el of filtered) {
        const elHash = hash(el.outerHTML)

        hashes[elHash] = true
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return <>{children}</>
}

export type AutoFrameProps = FrameComponentProps & {
  debug?: boolean
  onStylesLoaded?: () => void
}

const AutoFrame = forwardRef<HTMLIFrameElement, AutoFrameProps>(
  ({ children, debug, onStylesLoaded, ...props }: AutoFrameProps, ref) => (
    <Frame {...props} ref={ref}>
      <CopyHostStyles debug={debug} onStylesLoaded={onStylesLoaded}>
        {children}
      </CopyHostStyles>
    </Frame>
  ),
)

AutoFrame.displayName = 'AutoFrame'

export default AutoFrame
