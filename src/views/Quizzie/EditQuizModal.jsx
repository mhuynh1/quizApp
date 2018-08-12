import React from 'react';
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.jsx";
import modalStyle from "../../assets/jss/material-kit-react/modalStyle";
import TextField from '@material-ui/core/TextField';
import NewQuizModalForm from "./NewQuizModalForm";
import Icon from '@material-ui/core/Icon';


function Transition(props) {
    return <Slide direction="down" {...props} />;
}
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 500,
    },
});

const editIcon = {
  position: "absolute",
  right: "40px",
  top: "40px",
  zIndex: 1,
  color: "#9E9E9E",
  fontSize: "18px",
  cursor: "pointer"
}

class EditQuizModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
    }
    handleClickOpen(modal) {
        var x = [];
        x[modal] = true;
        this.setState(x);
    }
    handleClose(modal) {
        var x = [];
        x[modal] = false;
        this.setState(x);
    }
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };
    render() {
        const { classes } = this.props;
        return (
            <div>
        <i id={this.props.id} className="material-icons" style={editIcon} onClick={() => this.handleClickOpen("modal")}>edit</i>
                <Dialog
                    classes={{
                        root: classes.center,
                        paper: classes.modal
                    }}
                    open={this.state.modal}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => this.handleClose("modal")}
                    aria-labelledby="modal-slide-title"
                    aria-describedby="modal-slide-description">
                    <DialogTitle
                        id="classic-modal-slide-title"
                        disableTypography
                        className={classes.modalHeader}>
                        <IconButton
                            className={classes.modalCloseButton}
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={() => this.handleClose("modal")}>
                            <Close className={classes.modalClose} />
                        </IconButton>
                        <h4 className={classes.modalTitle}>Add New Category</h4>
                    </DialogTitle>
                    <DialogContent
                        id="modal-slide-description"
                        className={classes.modalBody}>
                        <NewQuizModalForm handleChange={this.handleChange} />
                    </DialogContent>
                    <DialogActions
                        className={classes.modalFooter + " " + classes.modalFooterCenter}>
                        <Button
                            onClick={() => this.handleClose("modal")}
                            color="successNoBackground">
                            <Icon color="disabled">add_circle</Icon>
                            &nbsp;Add Category
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(modalStyle)(EditQuizModal);