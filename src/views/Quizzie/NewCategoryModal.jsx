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

class NewCategoryModal extends React.Component {
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
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button
                    color="default"
                    variant="outlined"
                    round
                    onClick={() => this.handleClickOpen("modal")}>
                    Add New Category
        </Button>
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
                        <form className={classes.container} noValidate autoComplete="off">
                            <TextField
                                id="name"
                                label="Category Name"
                                className={classes.textField}
                                value={this.state.name}
                                // onChange={this.handleChange('name')}
                                margin="normal"
                            />
                        </form>
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

export default withStyles(modalStyle)(NewCategoryModal);