
import React, {Component} from 'react'
import {ScrollView} from 'react-native'
import {Text, Button} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import AssignmentServiceClient from "../services/AssignmentServiceClient";
import WidgetList from "../components/WidgetList";


class AssignmentContainer extends React.Component {
    static navigationOptions = { title: "Assignment Editor"};
    constructor(props) {
        super(props);
        this.assignmentService = AssignmentServiceClient.instance;
        this.state = {
            lessonId: this.props.lessonId,
            assignment: {
                title: '',
                description: '',
                points: 0,
                widgetType: 'Assignment'}
        }
    }

    componentDidMount() {
        this.setState({
            lessonId: this.props.lessonId
        })
    }

    componentWillReceiveProps(newProps){
        this.setState({
            lessonId: newProps.lessonId
        })
    }

    updateTitle(newTitle) {
        this.setState({assignment: {title: newTitle,
                description: this.state.assignment.description,
                points: this.state.assignment.points,
                widgetType:this.state.assignment.widgetType}});
    }

    updateDescription(newDescription) {
        this.setState({assignment: {title: this.state.assignment.title,
                description: newDescription,
                points: this.state.assignment.points,
                widgetType:this.state.assignment.widgetType}});
    }

    updatePoints(newPoints) {
        this.setState({assignment: {title: this.state.assignment.title,
                description: this.state.assignment.description,
                points: newPoints,
                widgetType:this.state.assignment.widgetType}});
    }

    updateForm(newState) {
        this.setState(newState)
    }

    createAssignment(){
        this.assignmentService
            .createAssignment(this.state.lessonId, this.state.assignment)
            .then(() => {
                this.props.navigation
                    .navigate("WidgetList", {lessonId: this.state.lessonId})
            });
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
                    points => this.updatePoints(points)
                }/>
                <FormValidationMessage>
                    Points are required
                </FormValidationMessage>

                <Button	backgroundColor="green"
                           color="white"
                           title="Save"
                           onPress={() => {this.createAssignment()}}/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"
                           onPress={() => {
                               this.props.navigation
                                   .navigate("WidgetList", {lessonId: this.state.lessonId})
                           }}/>

                <Text h3>Preview</Text>

                <Text>{this.state.assignment.title}</Text>
                <Text>{this.state.assignment.description}</Text>
                <Text>{this.state.assignment.points}</Text>


                <Text h4>Essay Answer</Text>
                <FormInput/>

                <Text h4>Upload a file</Text>
                <FormInput/>

                <Text h4>Submit a Link</Text>
                <FormInput/>

            </ScrollView>
        )
    }
}

export default AssignmentContainer