import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { CommonTableColumn, CommonTableConfig } from "./common-table.interface";
import { ApiState, PaginatedQuery } from "interfaces/api.interface";
import { Dialog, DialogTitle, Skeleton } from "@mui/material";
import Loader from "components/loader";
import { Fragment, useEffect } from "react";
import FilterWrapper from "./filter-wrapper";

type Order = "asc" | "desc";

interface CommonTableHeadProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  columns: CommonTableColumn<any>[];
  showIndex?: boolean;
  selection?: boolean;
}

function CommonTableHead(props: CommonTableHeadProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    columns,
    showIndex,
    selection,
  } = props;
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {selection ? (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
        ) : null}
        {showIndex ? <TableCell>S.No</TableCell> : null}

        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sorting ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.title}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.title
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface CommonTableToolbarProps {
  numSelected: number;
  filter?: boolean;
  tableTitle: string;
  handleFilterOpen: () => void;
}

function CommonTableToolbar(props: CommonTableToolbarProps) {
  const { numSelected, filter, tableTitle, handleFilterOpen } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h4"
          id="tableTitle"
          component="h1"
        >
          {tableTitle}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : filter ? (
        <Tooltip title="Filter list">
          <IconButton onClick={handleFilterOpen}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
}
interface CommonTableProps {
  config: CommonTableConfig;
  rows: Array<any>;
  total: number;
  children: any;
  pageOptions: PaginatedQuery;
  status: ApiState;
  handlePageOptionsChanged: (data: PaginatedQuery) => void;
}
export default function CommonTable(props: CommonTableProps) {
  useEffect(() => {
    console.log(props.config.options.filterComponent);
  }, []);

  const {
    config,
    rows,
    total,
    children,
    pageOptions,
    status,
    handlePageOptionsChanged,
  } = props;
  const {
    config: {
      options: { filterComponent },
    },
  } = props;
  const [order, setOrder] = React.useState<Order>(
    pageOptions.sort_order || "asc"
  );
  const [orderBy, setOrderBy] = React.useState<string>(
    pageOptions.sort_by || ""
  );
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(pageOptions.pageIndex);
  const [rowsPerPage, setRowsPerPage] = React.useState(pageOptions.pageSize);
  const [filterOpen, setFilterOpen] = React.useState(false);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    handlePageOptionsChanged({
      pageIndex: 0,
      pageSize: rowsPerPage,
      sort_by: property,
      sort_order: isAsc ? "desc" : "asc",
    });
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    handlePageOptionsChanged({ pageIndex: newPage, pageSize: rowsPerPage });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    handlePageOptionsChanged({
      pageIndex: 0,
      pageSize: parseInt(event.target.value, 10),
    });
  };
  const handleFilterClose = () => {
    setFilterOpen(false);
  };
  const handleFilterOpen = () => {
    setFilterOpen(true);
  };
  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const renderLoading = () => {
    return (
      <Paper sx={{ display: "flex", flexDirection: "column", padding: "16px" }}>
        <Loader />
        <Skeleton
          height={100}
          width={"100%"}
          variant="rectangular"
          animation="wave"
          sx={{ borderRadius: "8px", marginTop: "16px" }}
        />
        <Skeleton
          height={500}
          width={"100%"}
          variant="rectangular"
          animation="wave"
          sx={{ borderRadius: "8px", marginTop: "16px" }}
        />
      </Paper>
    );
  };
  const renderTable = () => {
    return (
      <div
        style={{ display: "flex", flexDirection: "column", padding: "16px" }}
      >
        {/* {filterComponent()} */}

        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <CommonTableHead
              columns={config.columns}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              showIndex={!!config.options.showIndex}
              selection={!!config.options.selection}
            />
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = isSelected(row._id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row._id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row._id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    {config.options.selection ? (
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                    ) : null}
                    {config.options.showIndex && (
                      <TableCell style={{ width: "20px" }} align="left">
                        {index + 1 + page * rowsPerPage}
                      </TableCell>
                    )}
                    {config.columns.map(
                      (column: CommonTableColumn<any>, idx: number) => (
                        <TableCell key={idx} align="left">
                          {column.resolve
                            ? column.resolve(row)
                            : children[column.templateBy!](row)}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    );
  };
  return (
    <Fragment>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <CommonTableToolbar
            numSelected={selected.length}
            filter={config.options.filter}
            tableTitle={config.options.tableTitle}
            handleFilterOpen={handleFilterOpen}
          />
          <>{status === "loading" && renderLoading()}</>
          <>{status === "succeeded" && renderTable()}</>
        </Paper>
      </Box>
      <FilterWrapper
        handleFilterClose={handleFilterClose}
        filterOpen={filterOpen}
        filterComponent={filterComponent!}
      />
    </Fragment>
  );
}
