import React from 'react'
import {ScrollView} from 'react-native'
import {Text, Button} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import FillInTheBlankQuestionService from "../services/FillInTheBlankQuestionServicClient";
import QuestionList from "../components/QuestionList"

class FillInTheBlankQuestionUpdater extends React.Component {
    static navigationOptions = { title: "Update Fill in the Blank Question"};
    constructor(props) {
        super(props);
        this.state = {
            examId: 1,
            questionId:1,
            lessonId: 1,
            blanksQuestion: {title: '', description: '', points: 0, questionText: '', variables: '', type: 'FillInTheBlank'}
        };
        this.fillInTheBlankQuestionService = FillInTheBlankQuestionService.instance;
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
            blanksQuestion: question
        })
    }

    updateBlanksTitle(newTitle) {
        this.setState({blanksQuestion: {title: newTitle,
                description: this.state.blanksQuestion.description,
                points: this.state.blanksQuestion.points,
                questionText: this.state.blanksQuestion.questionText,
                variables: this.state.blanksQuestion.variables,
                type: this.state.blanksQuestion.type}});
    }

    updateBlanksDescription(newDescription) {
        this.setState({blanksQuestion: {title: this.state.blanksQuestion.title,
                description: newDescription,
                points: this.state.blanksQuestion.points,
                questionText: this.state.blanksQuestion.questionText,
                variables: this.state.blanksQuestion.variables,
                type: this.state.blanksQuestion.type}});
    }

    updateBlanksPoints(newPoints) {
        this.setState({blanksQuestion: {title: this.state.blanksQuestion.title,
                description: this.state.blanksQuestion.description,
                points: newPoints,
                questionText: this.state.blanksQuestion.questionText,
                variables: this.state.blanksQuestion.variables,
                type: this.state.blanksQuestion.type}});
    }

    updateQuestionText(newQuestionText) {

        let words = [];
        newQuestionText.replace(/\[(.+?)\]/g, function($0, $1) { words.push($1) });

        if(words){
            console.log(words.join());
            this.setState({blanksQuestion: {title: this.state.blanksQuestion.title,
                    description: this.state.blanksQuestion.description,
                    points: this.state.blanksQuestion.points,
                    questionText: newQuestionText,
                    variables: words.join(),
                    type: this.state.blanksQuestion.type}});
        }
        else{
            this.setState({blanksQuestion: {title: this.state.blanksQuestion.title,
                    description: this.state.blanksQuestion.description,
                    points: this.state.blanksQuestion.points,
                    questionText: newQuestionText,
                    variables: this.state.blanksQuestion.variables,
                    type: this.state.blanksQuestion.type}});
        }

    }

    createFillInTheBlank(){
        this.fillInTheBlankQuestionService.createFillInTheBlank(this.state.examId, this.state.blanksQuestion)
    }

    updateFillInTheBlank(){
        this.fillInTheBlankQuestionService.updateFillInTheBlank(this.state.questionId, this.state.blanksQuestion)
            .then(() => {
            this.props.navigation
                .navigate("QuestionList", {examId: this.state.examId, lessonId: this.state.lessonId});})
    }


    deleteFillInTheBlank(){
        this.fillInTheBlankQuestionService
            .deleteFillInTheBlank(this.state.questionId)
            .then(() => {
                this.props.navigation
                    .navigate("QuestionList", {examId: this.state.examId, lessonId: this.state.lessonId});
            })}

    render() {

        return(
            <ScrollView>
                <FormLabel>Title</FormLabel>
                <FormInput
                    value ={this.state.blanksQuestion.title}
                    onChangeText={
                    text => this.updateBlanksTitle(text)
                }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput
                    value ={this.state.blanksQuestion.description}
                    onChangeText={
                    text => this.updateBlanksDescription(text)
                }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <FormLabel>Points</FormLabel>
                <FormInput
                    value ={(this.state.blanksQuestion.points).toString()}
                    onChangeText={
                    text => this.updateBlanksPoints(text)
                }/>
                <FormValidationMessage>
                    Points are required
                </FormValidationMessage>

                <FormLabel>Question Text</FormLabel>
                <FormInput
                    value ={this.state.blanksQuestion.questionText}
                    onChangeText={
                    text => this.updateQuestionText(text)
                }/>
                <FormValidationMessage>
                    Question text is required
                </FormValidationMessage>


                <Button	backgroundColor="green"
                           color="white"
                           title="Save"
                           onPress={() => {this.updateFillInTheBlank()}}/>

                <Button	backgroundColor="blue"
                           color="white"
                           title="Cancel"
                           onPress={() => {
                               this.props.navigation
                                   .navigate("QuestionList", {examId: this.state.examId, lessonId: this.state.lessonId})}}/>

                <Button	backgroundColor="red"
                           color="white"
                           onPress={() => {this.deleteFillInTheBlank()}}
                           title="Delete"/>

                <Text h3>Preview</Text>

                <Text>{this.state.blanksQuestion.questionText.replace(/\[([^\]]+)\]/g, '[         ]')}</Text>
                <Text h2>{this.state.blanksQuestion.title}</Text>
                <Text>{this.state.blanksQuestion.description}</Text>
                <Text>{this.state.blanksQuestion.points}</Text>

            </ScrollView>
        )
    }
}

export default FillInTheBlankQuestionUpdater