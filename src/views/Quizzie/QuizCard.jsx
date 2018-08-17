import React from "react";
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { cardTitle } from "assets/jss/material-kit-react.jsx";

const style = {
  cardTitle,
  textCenter: {
    textAlign: "center"
  },
  textRight: {
    textAlign: "right"
  }
};


class QuizCard extends React.Component {
  state = {
    correctAnswer: 'answer'
  }
  static propTypes = {
    cardTitle: PropTypes.string,
    choiceA: PropTypes.string,
    choiceB: PropTypes.string,
    choiceC: PropTypes.string,
    choiceD: PropTypes.string,
    id: PropTypes.string
  }
  
  selectAnswer = e => {

  }

  render() {
    const { classes } = this.props;
    return (
      <div style={{ "position": "relative", "padding": "0 20px" }}>
        <div className="cardIcons">
          <Link to={`/edit/${this.props.id}`}>
            <i id={this.props.id} className="material-icons" >edit</i>
          </Link>
          <i id={this.props.id} className="material-icons" onClick={e => this.props.handleDelete(e)}>delete_outline</i>
        </div>
        <Card className={classes.textCenter + ' quizCard'} style={{ width: "20rem" }}>
          <CardBody>
            <h4 className={classes.cardTitle} style={{ 'marginTop': '1.625rem' }}>{this.props.cardTitle}</h4>
            <Button color="warning" value={this.props.choiceA} fullWidth onClick={(e) => this.selectAnswer(e)}>{this.props.choiceA}</Button>
            <Button color="info" value={this.props.choiceB} fullWidth onClick={(e) => this.selectAnswer(e)}>{this.props.choiceB}</Button>
            <Button color="rose" value={this.props.choiceC} fullWidth onClick={(e) => this.selectAnswer(e)}>{this.props.choiceC}</Button>
            <Button color="primary" value={this.props.choiceD} fullWidth onClick={(e) => this.selectAnswer(e)}>{this.props.choiceD}</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
};

export default withRouter(withStyles(style)(QuizCard));