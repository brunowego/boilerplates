type FieldLengthProps = {
  currentLength: number
  maxLength: number
}

export default function FieldLength({
  currentLength,
  maxLength,
}: FieldLengthProps) {
  return (
    <span className='ml-auto text-muted-foreground text-xs'>
      {currentLength}/{maxLength}
    </span>
  )
}
