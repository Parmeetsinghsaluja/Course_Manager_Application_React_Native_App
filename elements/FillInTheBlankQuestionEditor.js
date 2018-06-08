// import React from 'react'
// import {View} from 'react-native'
// import {Text, Button, CheckBox} from 'react-native-elements'
// import {FormLabel, FormInput, FormValidationMessage}
//     from 'react-native-elements'
//
// class FillInTheBlankQuestionEditor extends React.Component {
//     static navigationOptions = { title: "True False"}
//     constructor(props) {
//         super(props)
//         this.state = {
//             title: '',
//             description: '',
//             points: 0,
//             isTrue: true,
//             examId: 1
//         }
//     }
//
//     componentWillReceiveProps(newProps){
//         this.setState({
//             examId: newProps.examId
//         })
//     }
//
//     updateForm(newState) {
//         this.setState(newState)
//     }
//
//     render() {
//         return(
//             <View>
//                 <FormLabel>Title</FormLabel>
//                 <FormInput onChangeText={
//                     text => this.updateForm({title: text})
//                 }/>
//                 <FormValidationMessage>
//                     Title is required
//                 </FormValidationMessage>
//
//                 <FormLabel>Description</FormLabel>
//                 <FormInput onChangeText={
//                     text => this.updateForm({description: text})
//                 }/>
//                 <FormValidationMessage>
//                     Description is required
//                 </FormValidationMessage>
//
//                 <FormLabel>Points</FormLabel>
//                 <FormInput onChangeText={
//                     text => this.updateForm({points: text})
//                 }/>
//                 <FormValidationMessage>
//                     Description is required
//                 </FormValidationMessage>
//
//                 <Button	backgroundColor="green"
//                            color="white"
//                            title="Save"/>
//                 <Button	backgroundColor="red"
//                            color="white"
//                            title="Cancel"/>
//
//                 <Text h3>Preview</Text>
//                 <Text h2>{this.state.title}</Text>
//                 <Text>{this.state.description}</Text>
//
//             </View>
//         )
//     }
// }
//
// export default FillInTheBlankQuestionEditor

import React from 'react'
import {ScrollView, View} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import FillInTheBlankQuestionService from "../services/FillInTheBlankQuestionServicClient";

class FillInTheBlankQuestionEditor extends React.Component {
    static navigationOptions = { title: "Fill in the Blank"}
    constructor(props) {
        super(props)
        this.state = {
            examId: 1,
            fbQuestion: {title: '', description: '', points: 0, questionText: '', variables: '', type: 'FillInTheBlank'}
        }
        this.fillInTheBlankQuestionService = FillInTheBlankQuestionService.instance;
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
        this.setState({fbQuestion: {title: newTitle,
                description: this.state.fbQuestion.description,
                points: this.state.fbQuestion.points,
                questionText: this.state.fbQuestion.questionText,
                variables: this.state.fbQuestion.variables,
                type: this.state.fbQuestion.type}});
    }

    updateDescription(newDescription) {
        this.setState({fbQuestion: {title: this.state.fbQuestion.title,
                description: newDescription,
                points: this.state.fbQuestion.points,
                questionText: this.state.fbQuestion.questionText,
                variables: this.state.fbQuestion.variables,
                type: this.state.fbQuestion.type}});
    }

    updatePoints(newPoints) {
        this.setState({fbQuestion: {title: this.state.fbQuestion.title,
                description: this.state.fbQuestion.description,
                points: newPoints,
                questionText: this.state.fbQuestion.questionText,
                variables: this.state.fbQuestion.variables,
                type: this.state.fbQuestion.type}});
    }

    updateQuestionText(newQuestionText) {

        let words = []
        newQuestionText.replace(/\[(.+?)\]/g, function($0, $1) { words.push($1) })

        if(words){
            console.log(words.join())
            this.setState({fbQuestion: {title: this.state.fbQuestion.title,
                    description: this.state.fbQuestion.description,
                    points: this.state.fbQuestion.points,
                    questionText: newQuestionText,
                    variables: words.join(),
                    type: this.state.fbQuestion.type}});
        }
        else{
            this.setState({fbQuestion: {title: this.state.fbQuestion.title,
                    description: this.state.fbQuestion.description,
                    points: this.state.fbQuestion.points,
                    questionText: newQuestionText,
                    variables: this.state.fbQuestion.variables,
                    type: this.state.fbQuestion.type}});
        }

    }

    updateForm(newState) {
        this.setState(newState)
    }

    createFillInTheBlank(){
        this.fillInTheBlankQuestionService.createFillInTheBlank(this.state.examId, this.state.fbQuestion)
    }



    render() {

        return(
            <ScrollView>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={
                    text => this.updateTitle(text)
                }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={
                    text => this.updateDescription(text)
                }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <FormLabel>Points</FormLabel>
                <FormInput onChangeText={
                    text => this.updatePoints(text)
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
                           title="Cancel"/>

                <Text h3>Preview</Text>
                <Text>{this.state.fbQuestion.questionText.replace(/\[([^\]]+)\]/g, '[         ]')}</Text>
                <Text h2>{this.state.fbQuestion.title}</Text>
                <Text>{this.state.fbQuestion.description}</Text>
                <Text>{this.state.fbQuestion.points}</Text>
            </ScrollView>
        )
    }
}

export default FillInTheBlankQuestionEditor