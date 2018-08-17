import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
});

const categories = [
    {
        value: 'category1',
        label: 'category 1',
    },
    {
        value: 'category2',
        label: 'category 2',
    },
    {
        value: 'category3',
        label: 'category 3',
    },
    {
        value: 'category4',
        label: 'category 4',
    },
];

class QuizModalForm extends React.Component {
    state = {
        multiline: 'Controlled',
        formData: {}
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.formData !== this.props.formData) {
            this.setState({ formData: nextProps.formData })
        }
    }
      
    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="question"
                    label="Question"
                    placeholder="Placeholder"
                    fullWidth
                    value={this.state.formData.question}
                    multiline
                    margin="normal"
                    onChange={this.props.handleChange('question')}
                    InputLabelProps={this.state.formData.question && { 
                        shrink: true
                      }} 

                >
                </TextField>
                <TextField
                    id="answer1"
                    label="Answer 1"
                    placeholder="Answer"
                    fullWidth
                    value={this.state.formData.answer1}
                    multiline
                    margin="normal"
                    onChange={this.props.handleChange('answer1')}
                    InputLabelProps={this.state.formData.answer1 && { 
                        shrink: true
                      }} 
                />
                <TextField
                    id="answer2"
                    label="Answer 2"
                    placeholder="Answer"
                    fullWidth
                    value={this.state.formData.answer2}
                    multiline
                    margin="normal"
                    onChange={this.props.handleChange('answer2')}
                    InputLabelProps={this.state.formData.answer2 && { 
                        shrink: true
                      }} 
                />
                <TextField
                    id="answer3"
                    label="Answer 3"
                    placeholder="Answer"
                    fullWidth
                    value={this.state.formData.answer3}
                    multiline
                    margin="normal"
                    onChange={this.props.handleChange('answer3')}
                    InputLabelProps={this.state.formData.answer3 && { 
                        shrink: true
                      }} 
                />
                <TextField
                    id="answer4"
                    label="Answer 4"
                    placeholder="Answer"
                    fullWidth
                    value={this.state.formData.answer4}
                    multiline
                    margin="normal"
                    onChange={this.props.handleChange('answer4')}
                    InputLabelProps={this.state.formData.answer4 && { 
                        shrink: true
                      }} 
                />
                {/* <TextField
                    id="select-category"
                    select
                    label="Select"
                    className={classes.textField}
                    value={this.state.currency}
                    onChange={this.props.handleChange('category')}
                    SelectProps={{
                        value: this.state.category,
                        MenuProps: {
                            className: classes.menu
                        },
                    }}
                    helperText="Please select your category"
                    margin="normal"
                >
                    {categories.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField> */}

            </form>
        );
    }
}

QuizModalForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuizModalForm);
