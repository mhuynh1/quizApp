import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import NewQuizModal from './NewQuizModal';
import NewCategoryModal from './NewCategoryModal';
import Clearfix from '../../components/Clearfix/Clearfix';
import * as quizzesServices from '../../services/quizzes.service';
import PageContent from './PageContent';
const drawerWidth = 240;

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
    appBar: {
        position: 'absolute',
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        }
    },

    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});

class Layout extends React.Component {
    state = {
        mobileOpen: null,
        quizzes: []
    }

    handleDrawerToggle = () => {

        this.setState(state => ({ ...state, mobileOpen: !state.mobileOpen }));
    };

    getAllQuizzes = () => {
        quizzesServices.readAll()
            .then(data => {
                setTimeout(() => {
                    this.setState({ quizzes: data })
                }, 700)
            })
    }

    render() {
        const { classes, theme } = this.props;
        const drawer = (
            <div>
                <div className={classes.toolbar} />
                <List component="nav">
                    <ListItem button>
                        <NewQuizModal getAllQuizzes={this.getAllQuizzes} />
                    </ListItem>
                </List>
                <Divider />
                <List component="nav">
                    <ListItem button>
                        <ListItemText primary="Item 1" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Item 2" />
                    </ListItem>
                    <ListItem button>
                        <NewCategoryModal />
                    </ListItem>
                </List>
            </div>
        );

        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar} color="default">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.navIconHide}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" noWrap>
                            Pick A Quizzie
            </Typography>
                    </Toolbar>
                </AppBar>
                <Hidden mdUp>
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={this.state.mobileOpen}
                        onClose={this.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        variant="permanent"
                        open
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <PageContent quizzes={this.state.quizzes} />
                <Clearfix />
            </div>
        );
    }
}

Layout.propTypes = {
    classes: PropTypes.object,
    theme: PropTypes.object
};

export default withRouter(withStyles(styles, { withTheme: true })(Layout));
