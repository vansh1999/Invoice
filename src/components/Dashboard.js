import React , {useState , useEffect} from 'react';
import {  withStyles, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {auth} from '../firebase'
import {useHistory} from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DescriptionIcon from '@material-ui/icons/Description';
import EventIcon from '@material-ui/icons/Event';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {db} from '../firebase'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 220,
  },
  table: {
    minWidth: 700,
  },
}));

export default function Dashboard({user}) {
    const classes = useStyles();
    const history =  useHistory()
    console.log("Dashboard" , user)

    // Logout Function
    const onLogout = async(e) => {
        
        await auth.signOut();
        console.log("Signout")
        history.push('/login')
    }

    // Start Add invoice //

    // Add invoice modal 
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    // Add invoice states and get invoice from db

    var Today = new Date();

    const [invoiceInput , setInvoiceInput] = useState({})
    
    const [myinvoices , setMyinvoices] = useState([])

    

    useEffect(() => {
      if(user){
        const docRef = db.collection('invoices').doc(user.uid)

        docRef.onSnapshot( docSnap => {
          if(docSnap.exists){
            setMyinvoices(docSnap.data().userinvoices)
          }else{
            console.log("no docs")
          }
        })
      }else{
        history.push('/login')
    }
    } , [])

    
    // add new invoice function
    const addNewInvoice = async() => {


      // add new invoice here
      await db.collection('invoices').doc(user.uid).set({
        userinvoices : [...myinvoices , invoiceInput ]
      })
      setInvoiceInput('')
      alert('client added to invoice')
      handleClose()

    }

    // end New invoice


    // table secion

    const StyledTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: '#3F51B5',
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    }))(TableCell);
    
    const StyledTableRow = withStyles((theme) => ({
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    }))(TableRow);
    
    

    // end table


  return (
    <>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Invoice
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {['My Invoices', 'Pending Invoices'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <DescriptionIcon /> : <EventIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          
          {user ? 
            <> 
            <List onClick={(e) => onLogout()}>
              <ListItem button >
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText>Logout</ListItemText>
              </ListItem>
          </List>
            </>  : 
            <>
            <Link to="/login" style={{textDecoration:"none" , color: '#000000DE'}}> 
            <List >
              <ListItem button >
              <ListItemIcon><LockOpenIcon /></ListItemIcon>
              <ListItemText>Login</ListItemText>
              </ListItem>
          </List>
            </Link>

            <Link to="/signup" style={{textDecoration:"none" , color: '#000000DE'}}> 
            <List >
              <ListItem button >
              <ListItemIcon><LockOpenIcon /></ListItemIcon>
              <ListItemText>Signup</ListItemText>
              </ListItem>
          </List>
            </Link>
            </>
        }
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />

        <Grid container spacing={3}>

        <Grid item xs={12}>
        {user ? 
        <div> <Typography variant="h5" component="h5">
        <DescriptionIcon fontSize="small"/>  Invoices 
        </Typography>
        </div> :   <Typography variant="h5" component="h5">
         Login/Signup to continue 
        </Typography>
      }
          </Grid>

          <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
        New invoice
      </Button>

      {/* popup modal start*/}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new invoice</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            
            label="Client Name"
            type="text"
            fullWidth
            key="clientname"
            name = "clientname"
            onChange = {({target}) => setInvoiceInput( state => ({...state , clientname: target.value}))}
            value={invoiceInput.clientname}
          />
          <TextField
            autoFocus
            margin="dense"
            
            label="Hours of work"
            type="number"
            fullWidth
            key="hours"
            name = "hours"
            onChange = {({target}) => setInvoiceInput( state => ({...state , hours: target.value}))}
            value={invoiceInput.hours}
            
          />
          <TextField
            autoFocus
            margin="dense"
            
            label="Rate"
            type="number"
            fullWidth
            key="rate"
            name = "rate"
            onChange = {({target}) => setInvoiceInput( state => ({...state , rate: target.value}))}
            value={invoiceInput.rate}
          />
          <TextField
            autoFocus
            margin="dense"
            
            label="Email Address"
            type="email"
            fullWidth
            key="email"
            name = "email"
            onChange = {({target}) => setInvoiceInput( state => ({...state , email: target.value}))}
            value={invoiceInput.email}
          />
          <TextField
            autoFocus
            margin="dense"
            
            label="Notes"
            type="text"
            fullWidth
            key="notes"
            name = "notes"
            onChange = {({target}) => setInvoiceInput( state => ({...state , notes: target.value}))}
            value={invoiceInput.notes}
          />

<TextField
            autoFocus
            margin="dense"
            style={{ marginTop : '5px'}}
            label="Invoice Id"
            type="text"
            fullWidth
            key="invoiceid"
            name = "invoiceid"
            onClick = {({target}) => setInvoiceInput( state => ({...state , invoiceid: new Date().getTime()}))}
            value={invoiceInput.invoiceid}
          />



<TextField
    id="date"
    label="Due Date"
    type="date"
    defaultValue= {Today}
    className={classes.textField}
    style={{ marginTop : '5px'}}
    InputLabelProps={{
      shrink: true,
    }}
            key="duedate"
            name = "duedate"
            onChange = {({target}) => setInvoiceInput( state => ({...state , duedate: target.value}))}
            value={invoiceInput.duedate}
  />

        <FormControl className={classes.formControl} style={{marginLeft : '10px' , marginTop : '5px'}}> 
          <InputLabel>Status</InputLabel>
          <Select 
          autoFocus fullWidth label="Status" m={3}
            key="status"
            name = "status"
            onChange = {({target}) => setInvoiceInput( state => ({...state , status: target.value}))}
            value={invoiceInput.status}
          
          > 
          
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
          </FormControl>


        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained" onClick={addNewInvoice}>
            Submit
          </Button>
          <Button onClick={handleClose} color="primary">
          Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {/* Close popup modal */}
          </Grid>

          <Grid item xs={12}>
          <TableContainer component={Paper}>

      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Invoice Id</StyledTableCell>
            <StyledTableCell align="right">Client name</StyledTableCell>
            <StyledTableCell align="right">Hours of work</StyledTableCell>
            <StyledTableCell align="right">Rate</StyledTableCell>
            <StyledTableCell align="right">Client email</StyledTableCell>
            <StyledTableCell align="right">Notes</StyledTableCell>
            <StyledTableCell align="right">Due date</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myinvoices.map((row) => (
            <StyledTableRow key={row.invoiceid}>
              <StyledTableCell component="th" scope="row">
                #{row.invoiceid}
              </StyledTableCell>
              <StyledTableCell align="right">{row.clientname}</StyledTableCell>
              <StyledTableCell align="right">{row.hours}</StyledTableCell>
              <StyledTableCell align="right">{row.rate}</StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <StyledTableCell align="right">{row.notes}</StyledTableCell>
              <StyledTableCell align="right">{row.duedate}</StyledTableCell>
              <StyledTableCell align="right">{row.status}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>

    </TableContainer>
          </Grid>
        </Grid>
        
      </main>
    </div>
    </>
  );
}
