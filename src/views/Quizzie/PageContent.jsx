import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Mainwell from './Mainwell';
import EditQuizModal from './EditQuizModal';
class PageContent extends React.Component {
    render() {
        return (
            <React.Fragment>
                {/* <Mainwell quizzes={this.state.quizzes}/> */}
                <Route path="/" render={(props) => (<Mainwell {...props} />)} />
            </React.Fragment>
        )
    }
}
export default withRouter(PageContent)