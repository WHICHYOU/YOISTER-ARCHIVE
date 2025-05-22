/* components/data-table.tsx */
'use client';

import * as React from 'react';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useReactTable,
} from '@tanstack/react-table';

import {
  CheckCircle2Icon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ColumnsIcon,
  GripVerticalIcon,
  LoaderIcon,
  MoreVerticalIcon,
  PlusIcon,
  TrendingUpIcon,
} from 'lucide-react';

import { toast } from 'sonner';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useIsMobile';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/* ------------------------------------------------------------------ */
/* Schema & columns -------------------------------------------------- */

export const schema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
});
type RowData = z.infer<typeof schema>;

function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({ id });
  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7 text-muted-foreground hover:bg-transparent"
    >
      <GripVerticalIcon className="size-3" />
      <span className="sr-only">Drag</span>
    </Button>
  );
}

const columns: ColumnDef<RowData>[] = [
  {
    id: 'drag',
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'select',
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected()
              ? true
              : table.getIsSomePageRowsSelected()
              ? 'indeterminate'
              : false
          }
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'header',
    header: 'Header',
    enableHiding: false,
  },
  {
    accessorKey: 'type',
    header: 'Section type',
    cell: ({ row }) => (
      <Badge variant="outline" className="px-1.5 text-muted-foreground">
        {row.original.type}
      </Badge>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3"
      >
        {row.original.status === 'Done' ? (
          <CheckCircle2Icon className="text-green-500 dark:text-green-400" />
        ) : (
          <LoaderIcon className="animate-spin" />
        )}
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: 'target',
    header: () => <div className="w-full text-right">Target</div>,
    cell: ({ row }) => (
      <InlineEditable
        id={`${row.original.id}-target`}
        defaultValue={row.original.target}
        label="Target"
      />
    ),
  },
  {
    accessorKey: 'limit',
    header: () => <div className="w-full text-right">Limit</div>,
    cell: ({ row }) => (
      <InlineEditable
        id={`${row.original.id}-limit`}
        defaultValue={row.original.limit}
        label="Limit"
      />
    ),
  },
  {
    accessorKey: 'reviewer',
    header: 'Reviewer',
    cell: ({ row }) => {
      if (row.original.reviewer !== 'Assign reviewer') {
        return row.original.reviewer;
      }
      return (
        <Select>
          <SelectTrigger className="h-8 w-40">
            <SelectValue placeholder="Assign reviewer" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
            <SelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    id: 'actions',
    enableSorting: false,
    enableHiding: false,
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground"
          >
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Helpers ----------------------------------------------------------- */

function InlineEditable({
  id,
  defaultValue,
  label,
}: {
  id: string;
  defaultValue: string;
  label: string;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        toast.promise(new Promise((r) => setTimeout(r, 800)), {
          loading: `Saving ${label}`,
          success: 'Saved',
          error: 'Error',
        });
      }}
    >
      <Label htmlFor={id} className="sr-only">
        {label}
      </Label>
      <Input
        id={id}
        defaultValue={defaultValue}
        className="h-8 w-16 border-transparent bg-transparent text-right shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background"
      />
    </form>
  );
}

function DraggableRow({ row }: { row: Row<RowData> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });
  return (
    <TableRow
      ref={setNodeRef}
      data-state={row.getIsSelected() && 'selected'}
      data-dragging={isDragging}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

/* ------------------------------------------------------------------ */
/* DataTable component ------------------------------------------------ */

export function DataTable({ data: incoming }: { data: RowData[] }) {
  const [data, setData] = React.useState(incoming);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  /* --- DnD -------------------------------------------------------- */
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );
  const rowIds = React.useMemo<UniqueIdentifier[]>(
    () => data.map((d) => d.id),
    [data]
  );
  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (active && over && active.id !== over.id) {
      setData((prev) => {
        const oldIndex = rowIds.indexOf(active.id);
        const newIndex = rowIds.indexOf(over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }

  /* --- Table ------------------------------------------------------ */
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    enableRowSelection: true,
    getRowId: (r) => r.id.toString(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const isMobile = useIsMobile();

  /* ---------------------------------------------------------------- */

  return (
    <Tabs defaultValue="outline" className="flex w-full flex-col gap-6">
      <TabsList className="w-max">
        <TabsTrigger value="outline">Table</TabsTrigger>
        <TabsTrigger value="chart">Trend</TabsTrigger>
      </TabsList>

      {/* ------------ TABLE VIEW ------------------------------------ */}
      <TabsContent value="outline">
        {/* Column toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline" className="gap-2">
              <ColumnsIcon className="size-4" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  checked={col.getIsVisible()}
                  onCheckedChange={(val) => col.toggleVisibility(!!val)}
                >
                  {col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator className="my-4" />

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={rowIds}
            strategy={verticalListSortingStrategy}
          >
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((hg) => (
                  <TableRow key={hg.id}>
                    {hg.headers.map((h) => (
                      <TableHead key={h.id}>
                        {flexRender(h.column.columnDef.header, h.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <DraggableRow key={row.id} row={row} />
                ))}
              </TableBody>
            </Table>
          </SortableContext>
        </DndContext>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeftIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {table.previousPage}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="px-2 text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </span>
          <Button
            variant="ghost"
            size="icon"
            tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {table.nextPage}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRightIcon />
          </Button>
        </div>
      </TabsContent>

      {/* ------------ CHART VIEW ------------------------------------ */}
      <TabsContent value="chart">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="w-full" variant="secondary">
              Open interactive chart
            </Button>
          </SheetTrigger>
          <SheetContent
            side={isMobile ? 'bottom' : 'right'}
            className="sm:w-[420px]"
          >
            <SheetHeader>
              <SheetTitle>Trends</SheetTitle>
            </SheetHeader>

            {/* Very light demo chart using recharts */}
            <div className="mt-6">
              <AreaChart width={350} height={200} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="header" hide />
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="var(--foreground)"
                  fill="var(--primary-500)"
                />
              </AreaChart>
            </div>
          </SheetContent>
        </Sheet>
      </TabsContent>
    </Tabs>
  );
}
