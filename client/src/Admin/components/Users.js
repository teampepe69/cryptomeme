import * as React from 'react';
import {
  Typography,Grid,Paper,Table,TableCell, IconButton,
  TableRow,Tooltip,TableHead,TableSortLabel,
  TableBody,Button,TablePagination,TextField
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import EditUser from '../components/EditUser';

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


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const Users = (props) => {
  const { people, value, index, classes, ...other} = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setUser] = React.useState({ uid: 69,  username: 'test', email:'my', state:'code'})

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const createSortHandler = property => event => {
    handleRequestSort(event, property);
  };

  const openModal = (user) => {
    const targetUser = { uid: user.uid, username: user.username, email:user.email, state:user.state};
    setUser(targetUser); 
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, people.length - page * rowsPerPage);
  
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
                        onClick={createSortHandler(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                ), this)}
                <TableCell>
                  Edit
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { stableSort(people, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => (
                  <TableRow hover tabIndex={0} key={n.uid}>
                    <TableCell>{n.uid}</TableCell>
                    <TableCell>{n.username}</TableCell>
                    <TableCell>{n.email}</TableCell>
                    <TableCell>{n.state}</TableCell>
                    <TableCell>
                    <IconButton aria-label="delete" onClick={() => openModal(n)}>
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
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <EditUser modalState={open} handleClose={closeModal} userInfo={selectedUser}/>
        </div>
      }
    </Typography>
  );
  };
  
  
  export default withStyles(styles, { withTheme: true })(Users);