import React from 'react';
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
import NewQuizModal from './NewQuizModal'
import NewCategoryModal from './NewCategoryModal'
import QuizCard from './QuizCard'
import Clearfix from '../../components/Clearfix/Clearfix'
import * as quizzesServices from '../../services/quizzes.service'
import Button from "components/CustomButtons/Button.jsx";
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
        },
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

class ResponsiveDrawer extends React.Component {
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


    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    handleDelete = e => {
        console.log(typeof e.target.id)
        quizzesServices._delete(e.target.id)
            .then(() => {
                return quizzesServices.readAll()
            })
            .then(data => {
                this.setState({ quizzes: data })
            })
    }

    handleEdit = e => {
        console.log(typeof e.target.id, e.target.id, 'update')
        this.setState({
            toggleEdit: true,
            quizId: e.target.id
        })
    }

    render() {
        const { classes, theme } = this.props;
        const quizzes = this.state.quizzes && this.state.quizzes.map(quiz => {
            return (<QuizCard id={quiz._id} handleDelete={this.handleDelete} handleEdit={this.handleEdit} key={quiz._id} cardTitle={quiz.question} choiceA={quiz.answer1} choiceB={quiz.answer2} choiceC={quiz.answer3} choiceD={quiz.answer4} />)
        })
        const drawer = (
            <div>
                <div className={classes.toolbar} />
                
                <NewQuizModal />
                <Divider />
                <List component="nav">
                    <ListItem button>
                        <ListItemText primary="Item 1" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Item 2" />
                    </ListItem>
                    <NewCategoryModal />
                </List>
            </div>
        );

        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar}>
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
                            Responsive drawer
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
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <section style={{ 'display': 'flex', 'flexFlow': 'row wrap', 'justifyContent': 'space-between' }}>
                        {quizzes}
                        {this.state.toggleEdit && <NewQuizModal quizId={this.state.quizId} />}
                    </section>
                </main>
                <Clearfix />
            </div>
        );
    }
}

ResponsiveDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
