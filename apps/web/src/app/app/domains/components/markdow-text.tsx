type MarkdownTextProps = {
  text: string
}

export default function MarkdownText({ text }: MarkdownTextProps): JSX.Element {
  return (
    <p
      className='prose-sm prose-code:rounded-md prose-code:bg-border prose-code:p-1 prose-code:font-semibold'
      // biome-ignore lint/security/noDangerouslySetInnerHtml: The text is sanitized
      dangerouslySetInnerHTML={{ __html: text }}
    />
  )
}
