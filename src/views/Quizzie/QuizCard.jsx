import React from "react";
import { withRouter, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { cardTitle } from "assets/jss/material-kit-react.jsx";
import EditQuizModal from "./EditQuizModal"

const style = {
  cardTitle,
  textCenter: {
    textAlign: "center"
  },
  textRight: {
    textAlign: "right"
  }
  // ,deleteIcon: {
  //   position: "absolute",
  //   right: "10px",
  //   top: "40px",
  //   zIndex: 1,
  //   color: "#9E9E9E",
  //   fontSize: "20px"
  // },
  // editIcon: {
  //   position: "absolute",
  //   right: "40px",
  //   top: "40px",
  //   zIndex: 1,
  //   color: "#9E9E9E",
  //   fontSize: "18px"
  // }
};

// const iconStyles = () => ({
//   deleteIcon: {
//     position: "absolute",
//     right: "10px",
//     top: "40px",
//     zIndex: 1,
//     color: "#9E9E9E",
//     fontSize: "20px"
//   },
//   editIcon: {
//     position: "absolute",
//     right: "40px",
//     top: "40px",
//     zIndex: 1,
//     color: "#9E9E9E",
//     fontSize: "18px"
//   }
// })

const cardIcon = {
  position: "absolute",
  right: "27px",
  top: "40px",
  zIndex: 1,
  color: "#9E9E9E",
  fontSize: "20px",
  cursor: "pointer"
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
    const { classes, iconStyles } = this.props;
    return (
      <div style={{ "position": "relative", "padding": "0 20px" }}>
        <div style={cardIcon}>
          {/* <EditQuizModal id={this.props.id} getAllQuizzes={this.props.getAllQuizzes} /> */}


          {/* link to route that will render modal:true */}
          <Link to={`/edit/${this.props.id}`}>
            <i id={this.props.id} className="material-icons" style={{ "fontSize": "18px", "marginRight": "10px" }}>edit</i>
          </Link>
          <i id={this.props.id} className="material-icons" style={{ "fontSize": "18px", "marginRight": "10px" }} onClick={e => this.props.handleDelete(e)}>delete_outline</i>
        </div>
        <Card className={classes.textCenter} style={{ width: "20rem" }}>
          <CardBody>
            <h4 className={classes.cardTitle} style={{ 'marginTop': '1.625rem' }}>{this.props.cardTitle}</h4>
            <Button color="warning" fullWidth>{this.props.choiceA}</Button>
            <Button color="info" fullWidth>{this.props.choiceB}</Button>
            <Button color="rose" fullWidth>{this.props.choiceC}</Button>
            <Button color="primary" fullWidth>{this.props.choiceD}</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
};

export default withRouter(withStyles(style)(QuizCard));