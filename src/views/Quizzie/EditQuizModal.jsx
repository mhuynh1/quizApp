import React from 'react';
import { withRouter, Link } from 'react-router-dom';
// import { Link } from 'react-router';
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
import QuizModalForm from "./QuizModalForm";
import * as quizzesServices from '../../services/quizzes.service'

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
            modal: false,
            formData: {}
        };
    }
    componentDidMount() {
        if (this.props.match.params.id) {
            quizzesServices.readById(this.props.match.params.id)
                .then(data => {
                    this.setState({
                        modal: true,
                        formData: data
                    })
                })
        }
    }

    handleClickOpen = (modal, e) => {
        let id = e.target.id
        var x = [];
        x[modal] = true;
        this.setState(x, () => {
            quizzesServices.readById(id)
                .then(data => {
                    this.setState({
                        formData: data
                    })
                })
        })
    }

    handleClose(modal) {
        var x = [];
        x[modal] = false;
        this.setState(x ,() =>{
            this.props.history.goBack()
        });
    }

    handleChange = name => event => {
        let value = event.target.value
        this.setState(prev => ({
            formData: { ...prev.formData, [name]: value }
        }))
    };

    handleSave = () => {
        const data = { ...this.state.formData }
        delete data._id
        quizzesServices.update(this.state.formData._id, data)
            .then(() => {
                this.handleClose("modal")
            })
            .catch(error => console.log(error));
    }
    render() {
        const { classes } = this.props;
        return (
            <div style={{ "display": "inline" }}>
                <Link to={`/edit/${this.props.id}`} onClick={(e) => this.handleClickOpen("modal", e)}>
                    <i id={this.props.id} className="material-icons" style={{ "fontSize": "18px", "marginRight": "10px" }}>edit</i>
                </Link>
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
                        <h4 className={classes.modalTitle}>Edit Quiz Details</h4>
                    </DialogTitle>
                    <DialogContent
                        id="modal-slide-description"
                        className={classes.modalBody}>
                        <QuizModalForm editId={this.state.editId} formData={this.state.formData} handleChange={this.handleChange} />
                    </DialogContent>
                    <DialogActions
                        className={classes.modalFooter + " " + classes.modalFooterCenter}>
                        <Button
                            onClick={() => this.handleSave()}
                            color="successNoBackground">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withRouter(withStyles(modalStyle)(EditQuizModal));