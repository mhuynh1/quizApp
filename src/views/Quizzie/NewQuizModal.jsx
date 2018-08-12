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
import NewQuizModalForm from "./NewQuizModalForm";
import * as quizzesServices from "../../services/quizzes.service"

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
    width: 200,
  },
});

class NewQuizModal extends React.Component {
  state = {
    modal: false,
    currency: 'EUR',
  }

  static propTypes = {
    // quizId: PropTypes.string,

  }
  componentDidMount() {
    //check if url has id to toggle edit mode
    // if(this.props.match.params.id){
    //     quizzesServices.readById(this.props.match.params.id)
    //     .then(data =>{
    //         this.setState({

    //         })
    //     })
    // }

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

  handleSave = () => {
    quizzesServices.create(this.state)
      .then(data => {
        this.handleClose("modal")
      })
     .then(()=>{
       debugger
        this.props.getAllQuizzes()
     })
      .catch(error => console.log(error));
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          color="rose"
          round
          onClick={() => this.handleClickOpen("modal")}>
          New Quiz
        </Button>
        <Dialog modal={this.state.modal} />
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
            <h4 className={classes.modalTitle}>Add New Quiz</h4>
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
            >
              Never Mind
            </Button>
            <Button
              onClick={() => this.handleSave()}
              color="successNoBackground">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(modalStyle)(NewQuizModal);