import React from 'react'
import {ScrollView} from 'react-native'
import {Text, Button} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage,ButtonGroup} from 'react-native-elements'
import MultipleChoiceQuestionService from "../services/MultipleChoiceQuestionServiceClient";
import QuestionList from "../components/QuestionList"

class MultipleChoiceUpdater extends React.Component {
    static navigationOptions = { title: "Multiple Choice"};
    constructor(props) {
        super(props)
        this.state = {
            examId: 1,
            questionId:1,
            lessonId: 1,
            multipleChoiceQuestion: {title: '', description: '',
                                    points: 0, options: '', correctOption: 0,
                                    type: 'MultiChoice' },
            buttons: []
        }
        this.multipleChoiceQuestionService = MultipleChoiceQuestionService.instance;
    }

    componentWillReceiveProps(newProps){
        this.setState({
            examId: newProps.examId,
            questionId: newProps.questionId,
            lessonId: newProps.lessonId
        })
    }

    componentDidMount() {
        const {navigation} = this.props;
        const questionId = navigation.getParam('questionId');
        const examId = navigation.getParam('examId');
        const lessonId = navigation.getParam('lessonId');
        const question = navigation.getParam('question');
        this.setState({
            questionId:questionId,
            examId: examId,
            lessonId: lessonId,
            multipleChoiceQuestion: question
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

    updateMultiChoice(){
        this.multipleChoiceQuestionService.updateMultiChoice(this.state.questionId, this.state.multipleChoiceQuestion)
    }


    deleteMultiChoice(){
        this.multipleChoiceQuestionService
            .deleteMultiChoice(this.state.questionId)
            .then(() => {
                this.props.navigation
                    .navigate("QuestionList", {examId: this.state.examId, lessonId: this.state.lessonId});
            })}

    render() {
        return(
            <ScrollView>
                <FormLabel>Title</FormLabel>
                <FormInput
                    value ={this.state.multipleChoiceQuestion.title}
                    onChangeText={
                    titleText => this.updateTitle(titleText)
                }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput
                    value ={this.state.multipleChoiceQuestion.description}
                    onChangeText={
                    descriptionText => this.updateDescription(descriptionText)
                }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <FormLabel>Points</FormLabel>
                <FormInput
                    value ={this.state.multipleChoiceQuestion.points}
                    onChangeText={
                    pointsText => this.updatePoints(pointsText)
                }/>

                <FormLabel>Options</FormLabel>
                <FormInput
                    value ={this.state.multipleChoiceQuestion.options}
                    onChangeText={
                    optionsText => this.updateOptions(optionsText)
                }/>

                <FormValidationMessage>
                    Options are required
                </FormValidationMessage>

                <Button	backgroundColor="green"
                           color="white"
                           title="Save"
                           onPress={() => {this.updateMultiChoice()}}/>

                <Button	backgroundColor="blue"
                           color="white"
                           title="Cancel"
                           onPress={() => {
                               this.props.navigation
                                   .navigate("QuestionList", {examId: this.state.examId})}}/>

                <Button	backgroundColor="red"
                           color="white"
                           onPress={() => {this.deleteMultiChoice()}}
                           title="Delete"/>


                <Text h3>Preview</Text>

                <Text>{this.state.multipleChoiceQuestion.title}</Text>
                <Text>{this.state.multipleChoiceQuestion.description}</Text>
                <Text>{this.state.multipleChoiceQuestion.points}</Text>
                <Text>{this.state.multipleChoiceQuestion.options}</Text>

                <ButtonGroup
                    onPress={this.updateOption}
                    selectedIndex={this.state.multipleChoiceQuestion.correctOption}
                    buttons={this.state.buttons} />
            </ScrollView>
        )
    }
}

export default MultipleChoiceUpdater;