import React from 'react'
import { Route,withRouter } from 'react-router-dom'
import Mainwell from './Mainwell'
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
                <Route exact path="/quizzie" render={(props) => (<Mainwell {...props} quizzes={this.state.quizzes}/>)}/>
            </React.Fragment>
        )
    }
}
export default withRouter(PageContent)