import {
  forwardRef,
  type HTMLAttributes,
  type ThHTMLAttributes,
  type TdHTMLAttributes,
} from 'react'

import cn from '../utils/cn'

const TableRoot = forwardRef<
  HTMLTableElement,
  HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className='relative w-full overflow-auto'>
    <table
      className={cn('w-full caption-bottom text-sm', className)}
      ref={ref}
      {...props}
    />
  </div>
))
TableRoot.displayName = 'TableRoot'

const TableHeader = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead className={cn('[&_tr]:border-b', className)} ref={ref} {...props} />
))
TableHeader.displayName = 'TableHeader'

const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    className={cn('[&_tr:last-child]:border-0', className)}
    ref={ref}
    {...props}
  />
))
TableBody.displayName = 'TableBody'

const TableFooter = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    className={cn(
      'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0',
      className,
    )}
    ref={ref}
    {...props}
  />
))
TableFooter.displayName = 'TableFooter'

const TableRow = forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    className={cn(
      'border-b transition-colors data-[state=selected]:bg-muted hover:bg-input',
      className,
    )}
    ref={ref}
    {...props}
  />
))
TableRow.displayName = 'TableRow'

const TableHead = forwardRef<
  HTMLTableCellElement,
  ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    className={cn(
      'h-10 px-2 text-left align-middle font-medium text-muted-foreground [&>[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pr-0 last-of-type:pr-4 lg:last-of-type:pr-5 first-of-type:pl-4 lg:first-of-type:pl-5',
      className,
    )}
    ref={ref}
    {...props}
  />
))
TableHead.displayName = 'TableHead'

const TableCell = forwardRef<
  HTMLTableCellElement,
  TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    className={cn(
      'p-2 align-middle [&>[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pr-0 last-of-type:pr-4 lg:last-of-type:pr-5 first-of-type:pl-4 lg:first-of-type:pl-5',
      className,
    )}
    ref={ref}
    {...props}
  />
))
TableCell.displayName = 'TableCell'

const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    className={cn('mt-4 text-muted-foreground text-sm', className)}
    ref={ref}
    {...props}
  />
))
TableCaption.displayName = 'TableCaption'

type TableProps = typeof TableRoot & {
  Header: typeof TableHeader
  Body: typeof TableBody
  Footer: typeof TableFooter
  Head: typeof TableHead
  Row: typeof TableRow
  Cell: typeof TableCell
  Caption: typeof TableCaption
}

const Table = TableRoot as TableProps

Table.Header = TableHeader
Table.Body = TableBody
Table.Footer = TableFooter
Table.Head = TableHead
Table.Row = TableRow
Table.Cell = TableCell
Table.Caption = TableCaption

export default Table
