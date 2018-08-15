import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Mainwell from './Mainwell';
class PageContent extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Route path="/" render={(props) => (<Mainwell {...props} />)} />
            </React.Fragment>
        )
    }
}
export default withRouter(PageContent)