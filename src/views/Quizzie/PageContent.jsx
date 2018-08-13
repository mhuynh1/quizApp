import React from 'react';
import { Route,withRouter } from 'react-router-dom';
import Mainwell from './Mainwell';
import EditQuizModal from './EditQuizModal';
class PageContent extends React.Component {
    state = {}
    componentWillReceiveProps(nextProps){
        if(nextProps.quizzes !== this.state.quizzes){
            this.setState({
                quizzes: nextProps.quizzes
            })
        }
    }
    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => (<Mainwell {...props} quizzes={this.state.quizzes}/>)}/>
                <Route exact path="/edit/:id" component={EditQuizModal} />
            </React.Fragment>
        )
    }
}
export default withRouter(PageContent)