import * as React from 'react';
import {
  Typography,Grid,Paper,Table,TableCell, IconButton,
  TableRow,Tooltip,TableHead,TableSortLabel,
  TableBody,Button,TablePagination,TextField
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  table:{
    backgroundColor: 'white'
  },
  tableHead:{
    backgroundColor: '#cca677ff'
  }
})

const columnData = [
  {
    id: 'uid', label: 'UID',
  },
  {
    id: 'username', label: 'Username',
  },
  {
    id: 'email', label: 'Email',
  },
  {
    id: 'state', label: 'Status',
  },
];

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const Users = (props) => {
  const { people, value, index, classes, order,
    orderBy, handleSortChange,
    handlePageChange, handleRowChange, handleOrderByChange, ...other
  } = props;
  console.log('props', props)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const createSortHandler = (property) => {
    handleOrderByChange(property);
    if (order === 'desc') {
      handleSortChange('asc');
    } else {
      handleSortChange('desc');
    }
  };
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, people.length - page * rowsPerPage);
  const doPageChange = (event, newPage) => {
    handlePageChange(newPage);
  };
  const doRowChange = (event) => {
    handleRowChange(event.target.value);
  };
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && 
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead className={classes.tableHead}>
              <TableRow>
                {columnData.map(column => (
                  <TableCell
                    key={column.id}
                    padding={column.disablePadding ? 'none' : 'default'}
                    sortDirection={orderBy === column.id ? order : false}
                  >
                    <Tooltip
                      title="Sort"
                      placement='bottom-end'
                      enterDelay={300}
                    >
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={order}
                        onClick={() => { createSortHandler(column.id); }}
                      >
                        {column.label}
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                ), this)}
                <TableCell>
                  <TableSortLabel>
                    Edit
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { stableSort(people, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => (
                  <TableRow hover tabIndex={0} key={n.uid}>
                    <TableCell>{n.uid}</TableCell>
                    <TableCell>{n.username}</TableCell>
                    <TableCell>{n.email}</TableCell>
                    <TableCell>{n.state}</TableCell>
                    <TableCell>
                    <IconButton aria-label="delete">
                      <EditIcon />
                    </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
              <TableRow style={{ height: 49 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={people.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={doPageChange}
            onChangeRowsPerPage={doRowChange}
          />
        </div>
      }
    </Typography>
  );
  };
  
  
  export default withStyles(styles, { withTheme: true })(Users);