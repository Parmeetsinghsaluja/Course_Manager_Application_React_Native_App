import React from 'react'
import {ScrollView} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import TrueFalseQuestionService from "../services/TrueFalseQuestionServiceClient";
import QuestionList from "../components/QuestionList"

class TrueFalseQuestionUpdater extends React.Component {
    static navigationOptions = { title: "Update True False Question"};
    constructor(props) {
        super(props);
        this.state = {
            examId: 1,
            questionId: 1,
            lessonId: 1,
            trueFalseQuestion: {title: '', description: '', points: 0, isTrue: true, type: 'TrueFalse' }
        };
        this.trueFalseQuestionService = TrueFalseQuestionService.instance;
        this.updateIsTrue=this.updateIsTrue.bind(this);
    }

    componentWillReceiveProps(newProps){
        this.setState({
            examId: newProps.examId,
            questionId: newProps.questionId,
            lessonId: newProps.lessonId,
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
            trueFalseQuestion: question
        })
    }


    updateTitle(newTitle) {
        this.setState({trueFalseQuestion: {title: newTitle,
                description: this.state.trueFalseQuestion.description,
                points: this.state.trueFalseQuestion.points,
                isTrue: this.state.trueFalseQuestion.isTrue,
                type: this.state.trueFalseQuestion.type}});
    }

    updateDescription(newDescription) {
        this.setState({trueFalseQuestion: {title: this.state.trueFalseQuestion.title,
                description: newDescription,
                points: this.state.trueFalseQuestion.points,
                isTrue: this.state.trueFalseQuestion.isTrue,
                type: this.state.trueFalseQuestion.type}});
    }

    updatePoints(newPoints) {
        this.setState({trueFalseQuestion: {title: this.state.trueFalseQuestion.title,
                description: this.state.trueFalseQuestion.description,
                points: newPoints,
                isTrue: this.state.trueFalseQuestion.isTrue,
                type: this.state.trueFalseQuestion.type}});
    }

    updateIsTrue(newIsTrue) {
        this.setState({trueFalseQuestion: {title: this.state.trueFalseQuestion.title,
                description: this.state.trueFalseQuestion.description,
                points: this.state.trueFalseQuestion.points,
                isTrue: newIsTrue,
                type: this.state.trueFalseQuestion.type}});
    }

    updateTrueFalse(){
        this.trueFalseQuestionService.updateTrueFalse(this.state.questionId, this.state.trueFalseQuestion)
            .then(() => {
                this.props.navigation
                    .navigate("QuestionList", {examId: this.state.examId, lessonId: this.state.lessonId});})
    }


    deleteTrueFalse(){
        this.trueFalseQuestionService
            .deleteTrueFalse(this.state.questionId)
            .then(() => {
                this.props.navigation
                    .navigate("QuestionList", {examId: this.state.examId, lessonId: this.state.lessonId});
            })}

    render() {
        return(
            <ScrollView>
                <FormLabel>Title</FormLabel>
                <FormInput
                    value ={this.state.trueFalseQuestion.title}
                    onChangeText={
                    titleText => this.updateTitle(titleText)
                }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput
                    value ={this.state.trueFalseQuestion.description}
                    onChangeText={
                    descriptionText => this.updateDescription(descriptionText)
                }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <FormLabel>Points</FormLabel>
                <FormInput
                    value ={(this.state.trueFalseQuestion.points).toString()}
                    onChangeText={
                    pointsText => this.updatePoints(pointsText)
                }/>
                <FormValidationMessage>
                    Points are required
                </FormValidationMessage>


                <CheckBox
                          value ={this.state.trueFalseQuestion.isTrue}
                          onPress={() => this.updateIsTrue(!this.state.trueFalseQuestion.isTrue)}
                          checked={this.state.trueFalseQuestion.isTrue} title='The answer is true'/>

                <Button	backgroundColor="green"
                           color="white"
                           title="Update"
                           onPress={() => {this.updateTrueFalse()}}/>

                <Button	backgroundColor="blue"
                           color="white"
                           title="Cancel"
                           onPress={() => {
                               this.props.navigation
                                   .navigate("QuestionList", {examId: this.state.examId, lessonId: this.state.lessonId})}}/>

                <Button backgroundColor="red"
                        color="white"
                        onPress={() => {this.deleteTrueFalse()}}
                        title="Delete Question"/>


                <Text h3>Preview</Text>

                <Text>{this.state.trueFalseQuestion.title}</Text>
                <Text>{this.state.trueFalseQuestion.description}</Text>

            </ScrollView>
        )
    }
}

export default TrueFalseQuestionUpdater;