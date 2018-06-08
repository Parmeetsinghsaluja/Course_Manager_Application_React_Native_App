import React from 'react'
import {ScrollView} from 'react-native'
import {Text, Button} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import EssayQuestionService from "../services/EssayQuestionService";
import QuestionList from "../components/QuestionList"

class EssayQuestionEditor extends React.Component {
    static navigationOptions = { title: "Add Essay Question"};
    constructor(props) {
        super(props);
        this.state = {
            examId: 1,
            lessonId:1,
            essayQuestion: {title: '', description: '', points: 0, type: 'Essay'}
        };
        this.essayQuestionService = EssayQuestionService.instance;
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

    updateEssayTitle(newTitle) {
        this.setState({essayQuestion: {title: newTitle,
                description: this.state.essayQuestion.description,
                points: this.state.essayQuestion.points,
                type: this.state.essayQuestion.type}});
    }

    updateEssayDescription(newDescription) {
        this.setState({essayQuestion: {title: this.state.essayQuestion.title,
                description: newDescription,
                points: this.state.essayQuestion.points,
                type: this.state.essayQuestion.type}});
    }

    updateEssayPoints(newPoints) {
        this.setState({essayQuestion: {title: this.state.essayQuestion.title,
                description: this.state.essayQuestion.description,
                points: newPoints,
                type: this.state.essayQuestion.type}});
    }


    createEssay(){
        this.essayQuestionService
            .createEssay(this.state.examId, this.state.essayQuestion)
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
                    text => this.updateEssayTitle(text)
                }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={
                    text => this.updateEssayDescription(text)
                }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <FormLabel>Points</FormLabel>
                <FormInput onChangeText={
                    text => this.updateEssayPoints(text)
                }/>
                <FormValidationMessage>
                    Points are required
                </FormValidationMessage>

                <Button	backgroundColor="green"
                           color="white"
                           title="Save"
                           onPress={() => {this.createEssay()}}/>

                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"
                           onPress={() => {
                               this.props.navigation
                                   .navigate("QuestionList", {examId: this.state.examId,
                                                                lessonId: this.state.lessonId})}}/>

                <Text h3>Preview</Text>

                <Text>{this.state.essayQuestion.title}</Text>
                <Text>{this.state.essayQuestion.description}</Text>
                <Text>{this.state.essayQuestion.points}</Text>

            </ScrollView>
        )
    }
}

export default EssayQuestionEditor