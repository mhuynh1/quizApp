import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import {Route} from 'react-router';
import QuizCard from './QuizCard';
import * as quizzesServices from '../../services/quizzes.service';
const styles = theme => ({
    root: {
        flexGrow: 1,
        minHeight: 800,
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});

class Mainwell extends React.Component {
    state = {
        quizzes: []
    }

    componentDidMount() {
        quizzesServices.readAll()
            .then(data => {
                console.log(data)
                this.setState({ quizzes: data })
            })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.quizzes !== this.state.quizzes){
            this.setState({
                quizzes: nextProps.quizzes
            })
        }
    }
    getAllQuizzes = () => {
        quizzesServices.readAll()
            .then(data => {
                setTimeout(() => {
                    this.setState({ quizzes: data })
                }, 700)
            })
    }

    handleDelete = e => {
        quizzesServices._delete(e.target.id)
            .then(() => {
                return quizzesServices.readAll()
            })
            .then(data => {
                this.setState({ quizzes: data })
            })
    }

    handleEdit = e => {
        this.setState({
            toggleEdit: true,
            quizId: e.target.id 
        })  
    }
    render() {
        const { classes, theme } = this.props;
        const quizzes = this.state.quizzes && this.state.quizzes.map(quiz => {
            return (<QuizCard id={quiz._id} handleDelete={this.handleDelete} handleEdit={this.handleEdit} getAllQuizzes={this.getAllQuizzes} key={quiz._id} cardTitle={quiz.question} choiceA={quiz.answer1} choiceB={quiz.answer2} choiceC={quiz.answer3} choiceD={quiz.answer4} />)
        })
        return (
            <React.Fragment>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
        <section style={{ 'display': 'flex', 'flexFlow': 'row wrap'}}>
                        {quizzes}
                    </section>
                </main>
                
            </React.Fragment>
        )
    }
}

Mainwell.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};
export default withRouter(withStyles(styles, { withTheme: true })(Mainwell));