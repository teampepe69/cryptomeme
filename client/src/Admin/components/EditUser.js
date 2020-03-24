import * as React from 'react';
import {
  Button, Modal, Card, TextField, CardMedia, Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2, 4, 3),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 8, 4),
    minWidth: '70%',
    minHeight: '50%'
  },
  button: {
    height: '50px',
    backgroundColor: '#6aa84fff',
    color: 'whitesmoke',
    "&:hover": {
      backgroundColor: "#6aa84fff"
    }
  }, 
  media: {
    maxHeight: "160px", 
    width: "auto", 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});

const EditUser = (props) => {
  const {
    classes, modalState, handleClose, userInfo
  } = props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={modalState}
          onClose={handleClose}
          className={classes.modal}
        >
          <Card className={classes.paper}>
            <div style={{position:'static', minHeight: '65px'}}>
                <div style={{ width: "75%", float: "left" }}>
                <Typography variant="h4" gutterBottom>
                    {userInfo.username}
                </Typography>
                </div>
                <div style={{ width: "25%", float: "right"}}>
                    {userInfo.state === 'Active' && 
                        <Button disabled fullWidth style={{backgroundColor:'#57bb8aff', color:'white'}}>
                            {userInfo.state}
                        </Button>
                    }
                    {userInfo.state === 'Admin' && 
                        <Button disabled fullWidth style={{backgroundColor:'#cca677ff', color:'white'}}>
                            {userInfo.state}
                        </Button>
                    }
                    {userInfo.state === 'Deactivated' && 
                        <Button disabled fullWidth style={{backgroundColor:'#666666ff', color:'white'}}>
                            {userInfo.state}
                        </Button>
                    }
                </div>
            </div>
            <div style={{position:'relative'}}>
                <Typography variant="p" gutterBottom>
                    UID: {userInfo.uid}
                </Typography>
                <br />
                <Typography variant="p" gutterBottom>
                    Email: {userInfo.email}
                </Typography>
            </div>
            {userInfo.state ==='Active' &&
                <div style={{position:'relative', height:'220px', paddingTop:'10px'}}>
                    <div style={{ width: "45%", float: "left"}}>
                        <CardMedia
                        component="img"
                        className={classes.media}
                        image={require("../../img/makeAdmin.png")}
                        />
                        <Button fullWidth style={{backgroundColor:'#5d4037ff', color:'white'}}>
                            Make Admin
                        </Button>
                    </div>
                    <div style={{ width: "45%", float: "right", paddingLeft:'10px'}}>
                        <CardMedia
                            component="img"
                            className={classes.media}
                            image={require("../../img/deactivatepepe.png")}
                        /> 
                        <Button fullWidth style={{backgroundColor:'#cc0000ff', color:'white'}}>
                            Deactivate
                        </Button>
                    </div>
                </div>
            }
            {userInfo.state ==='Deactivated' &&
                <div style={{position:'relative', height:'220px', paddingTop:'10px'}}>

                </div>
            }
          </Card>
        </Modal>
      </div>
    );
  };
  
  
  export default withStyles(styles, { withTheme: true })(EditUser);