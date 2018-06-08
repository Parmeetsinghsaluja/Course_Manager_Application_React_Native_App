
import React from 'react'
import {ScrollView} from 'react-native'
import {Text, Button} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage,ButtonGroup} from 'react-native-elements'
import MultipleChoiceQuestionService from "../services/MultipleChoiceQuestionServiceClient";

class MultipleChoiceQuestionEditor extends React.Component {
    static navigationOptions = { title: "Multiple Choice"};
    constructor(props) {
        super(props);
        this.state = {
            examId: 1,
            multipleChoiceQuestion: {title: '', description: '', points: 0, options: '', correctOption: 0, type: 'MultiChoice' },
            buttons: []
        };
        this.multipleChoiceQuestionService = MultipleChoiceQuestionService.instance;
    }

    componentWillReceiveProps(newProps){
        this.setState({
            examId: newProps.examId
        })
    }

    componentDidMount() {
        const {navigation} = this.props;
        const examId = this.props.examId;
        this.setState({
            examId: examId
        })
    }

    updateTitle(newTitle) {
        this.setState({multipleChoiceQuestion: {title: newTitle,
                description: this.state.multipleChoiceQuestion.description,
                points: this.state.multipleChoiceQuestion.points,
                options: this.state.multipleChoiceQuestion.options,
                correctOption: this.state.multipleChoiceQuestion.correctOption,
                type: this.state.multipleChoiceQuestion.type}});
    }

    updateDescription(newDescription) {
        this.setState({multipleChoiceQuestion: {title: this.state.multipleChoiceQuestion.title,
                description: newDescription,
                points: this.state.multipleChoiceQuestion.points,
                options: this.state.multipleChoiceQuestion.options,
                correctOption: this.state.multipleChoiceQuestion.correctOption,
                type: this.state.multipleChoiceQuestion.type}});
    }
    updateOption (newSelectedIndex) {
        this.setState({multipleChoiceQuestion: {title: this.state.multipleChoiceQuestion.title,
                description: this.state.multipleChoiceQuestion.description,
                points: this.state.multipleChoiceQuestion.points,
                options: this.state.multipleChoiceQuestion.options,
                correctOption: newSelectedIndex,
                type: this.state.multipleChoiceQuestion.type}});
    }

    updatePoints(newPoints) {
        this.setState({multipleChoiceQuestion: {title: this.state.multipleChoiceQuestion.title,
                description: this.state.multipleChoiceQuestion.description,
                points: newPoints,
                options: this.state.multipleChoiceQuestion.options,
                correctOption: this.state.multipleChoiceQuestion.correctOption,
                type: this.state.multipleChoiceQuestion.type}});
    }

    updateOptions(newOptions) {
        this.setState({multipleChoiceQuestion: {title: this.state.multipleChoiceQuestion.title,
                description: this.state.multipleChoiceQuestion.description,
                points: this.state.multipleChoiceQuestion.points,
                options: newOptions,
                correctOption: this.state.multipleChoiceQuestion.correctOption,
                type: this.state.multipleChoiceQuestion.type}});
        this.setState({buttons: newOptions.split(",")})
    }

    createMultiChoice(){
        this.multipleChoiceQuestionService.createMultiChoice(this.state.examId, this.state.multipleChoiceQuestion)
    }

    render() {
        return(
            <ScrollView>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={
                    titleText => this.updateTitle(titleText)
                }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={
                    descriptionText => this.updateDescription(descriptionText)
                }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <FormLabel>Points</FormLabel>
                <FormInput onChangeText={
                    pointsText => this.updatePoints(pointsText)
                }/>

                <FormLabel>Options</FormLabel>
                <FormInput onChangeText={
                    optionsText => this.updateOptions(optionsText)
                }/>

                <FormValidationMessage>
                    Options are required
                </FormValidationMessage>

                <Button	backgroundColor="green"
                           color="white"
                           title="Save"
                           onPress={() => {this.createMultiChoice()}}/>

                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"/>


                <Text h3>Preview</Text>

                <Text>{this.state.multipleChoiceQuestion.title}</Text>
                <Text>{this.state.multipleChoiceQuestion.description}</Text>
                <Text>{this.state.multipleChoiceQuestion.points}</Text>

                <ButtonGroup
                    onPress={this.updateOption}
                    selectedIndex={this.state.multipleChoiceQuestion.correctOption}
                    buttons={this.state.buttons} />
            </ScrollView>
        )
    }
}

export default MultipleChoiceQuestionEditor;