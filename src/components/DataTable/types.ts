export interface Column<T> {
  id: string
  label: string
  width?: string
  align?: 'left' | 'center' | 'right'
  render?: (value: any, row: T, handlers: DataTableHandlers) => React.ReactNode
}

export interface DataTableHandlers {
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
  onStatusChange?: (id: number, status: any) => void
  [key: string]: any
}

export interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  handlers?: DataTableHandlers
  emptyMessage?: string
  getRowId?: (row: T) => number | string
}
