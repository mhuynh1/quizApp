import React from "react";
import PropTypes from 'prop-types';
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { cardTitle } from "assets/jss/material-kit-react.jsx";
import * as quizzesService from "../../services/quizzes.service"
const style = {
  cardTitle,
  textCenter: {
    textAlign: "center"
  },
  textRight: {
    textAlign: "right"
  }
};

const deleteIcon = {
  position: "absolute",
  right: "10px",
  top: "40px",
  zIndex: 1,
  color: "#9E9E9E",
  fontSize: "20px"
}

const editIcon = {
  position: "absolute",
  right: "40px",
  top: "40px",
  zIndex: 1,
  color: "#9E9E9E",
  fontSize: "18px"
}

class QuizCard extends React.Component {

  static propTypes = {
    cardTitle: PropTypes.string,
    choiceA: PropTypes.string,
    choiceB: PropTypes.string,
    choiceC: PropTypes.string,
    choiceD: PropTypes.string,
    id: PropTypes.string
  }

  

  render() {
    const { classes } = this.props;
    return (
      <div style={{ "position": "relative" }}>
      <i id={this.props.id} className="material-icons" style={editIcon} onClick={e => this.props.handleEdit(e)}>edit</i>
      <i id={this.props.id} className="material-icons" style={deleteIcon} onClick={e => this.props.handleDelete(e)}>delete_outline</i>
        <Card className={classes.textCenter} style={{ width: "20rem" }}>
          <CardBody>
            <h4 className={classes.cardTitle} style={{ 'marginTop': '1.625rem' }}>{this.props.cardTitle}</h4>
            <Button color="primary" fullWidth>{this.props.choiceA}</Button>
            <Button color="primary" fullWidth>{this.props.choiceB}</Button>
            <Button color="primary" fullWidth>{this.props.choiceC}</Button>
            <Button color="primary" fullWidth>{this.props.choiceD}</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
};

export default withStyles(style)(QuizCard);