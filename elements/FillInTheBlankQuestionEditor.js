import React from 'react'
import {ScrollView} from 'react-native'
import {Text, Button} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import FillInTheBlankQuestionService from "../services/FillInTheBlankQuestionServicClient";
import QuestionList from "../components/QuestionList"

class FillInTheBlankQuestionEditor extends React.Component {
    static navigationOptions = { title: "Add Fill in the Blank Question"};
    constructor(props) {
        super(props);
        this.state = {
            examId: 1,
            lessonId:1,
            blanksQuestion: {title: '', description: '', points: 0, questionText: '', variables: '', type: 'FillInTheBlank'}
        };
        this.fillInTheBlankQuestionService = FillInTheBlankQuestionService.instance;
    }

    componentWillReceiveProps(newProps){
        this.setState({
            examId: newProps.examId,
            lessonId: newProps.lessonId
        })
    }

    componentDidMount() {
        const {navigation} = this.props;
        const examId = this.props.examId;
        const lessonId = this.props.lessonId;
        this.setState({
            examId: examId,
            lessonId: lessonId
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
        let regex = /\[(.+?)\]/g;
        newQuestionText.replace(regex, function($0, $1) { words.push($1) });

        if(words){
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
        this.fillInTheBlankQuestionService
            .createFillInTheBlank(this.state.examId, this.state.blanksQuestion)
            .then(() => {
                this.props.navigation
                    .navigate("QuestionList", {examId: this.state.examId, lessonId: this.state.lessonId});
            })
    }

    render() {

        return(
            <ScrollView>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={
                    text => this.updateBlanksTitle(text)
                }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={
                    text => this.updateBlanksDescription(text)
                }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <FormLabel>Points</FormLabel>
                <FormInput onChangeText={
                    text => this.updateBlanksPoints(text)
                }/>
                <FormValidationMessage>
                    Points are required
                </FormValidationMessage>

                <FormLabel>Question Text</FormLabel>
                <FormInput onChangeText={
                    text => this.updateQuestionText(text)
                }/>
                <FormValidationMessage>
                    Question text is required
                </FormValidationMessage>



                <Button	backgroundColor="green"
                           color="white"
                           title="Save"
                           onPress={() => {this.createFillInTheBlank()}}/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"
                           onPress={() => {
                               this.props.navigation
                                   .navigate("QuestionList", {examId: this.state.examId,
                                                                lessonId: this.state.lessonId})}}/>

                <Text h3>Preview</Text>
                <Text>{this.state.blanksQuestion.questionText.replace(/\[([^\]]+)\]/g, '[         ]')}</Text>
                <Text h2>{this.state.blanksQuestion.title}</Text>
                <Text>{this.state.blanksQuestion.description}</Text>
                <Text>{this.state.blanksQuestion.points}</Text>
            </ScrollView>
        )
    }
}

export default FillInTheBlankQuestionEditor