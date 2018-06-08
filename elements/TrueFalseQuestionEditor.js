import React from 'react'
import {ScrollView, View} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import TrueFalseQuestionService from "../services/TrueFalseQuestionServiceClient";

class TrueFalseQuestionEditor extends React.Component {
    static navigationOptions = { title: "True False"};
    constructor(props) {
        super(props);
        this.state = {
            examId: 1,
            trueFalseQuestion: {title: '', description: '', points: 0, isTrue: true, type: 'TrueFalse' }
        };
        this.trueFalseQuestionService = TrueFalseQuestionService.instance;
        this.updateIsTrue = this.updateIsTrue.bind(this);
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


    createTrueFalse(){
        this.trueFalseQuestionService.createTrueFalse(this.state.examId, this.state.trueFalseQuestion)
            .then(() => {
                this.props.navigation
                    .navigate("QuestionList", {examId: this.state.examId})
            });
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
                <FormValidationMessage>
                    Points are required
                </FormValidationMessage>


                <CheckBox onPress={() => this.updateIsTrue(!this.state.trueFalseQuestion.isTrue)}
                        checked={this.state.trueFalseQuestion.isTrue} title='The answer is true'/>

                <Button	backgroundColor="green"
                           color="white"
                           title="Save"
                           onPress={() => {this.createTrueFalse()}}/>

                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"/>


                <Text h3>Preview</Text>

                <Text>{this.state.trueFalseQuestion.title}</Text>
                <Text>{this.state.trueFalseQuestion.description}</Text>

            </ScrollView>
        )
    }
}

export default TrueFalseQuestionEditor;