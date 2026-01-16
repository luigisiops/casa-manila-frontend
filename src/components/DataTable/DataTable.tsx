import { Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import { StyledTableContainer, StyledTableHead, StyledTableRow } from './styles'
import type { Column, DataTableProps } from './types'

export function DataTable<T extends { id?: number | string }>({
  columns: columnDefs,
  data,
  handlers,
  emptyMessage = 'No data found',
  getRowId = (row) => (row as any).id,
}: DataTableProps<T>): React.ReactNode {
  const columns: Column<T>[] = columnDefs
  return (
    <StyledTableContainer>
      <Table>
        <StyledTableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                width={column.width}
                align={column.align || 'left'}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((row) => (
              <StyledTableRow key={getRowId(row)}>
                {columns.map((column) => (
                  <TableCell
                    key={`${getRowId(row)}-${column.id}`}
                    width={column.width}
                    align={column.align || 'left'}
                  >
                    {column.render ? (
                      column.render((row as any)[column.id], row, handlers || {})
                    ) : (
                      <Typography variant="body2">
                        {(row as any)[column.id] ?? '-'}
                      </Typography>
                    )}
                  </TableCell>
                ))}
              </StyledTableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                <Typography color="text.secondary">{emptyMessage}</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </StyledTableContainer>
  )
}
