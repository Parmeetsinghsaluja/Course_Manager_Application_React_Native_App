import React from 'react'
import {Picker, ScrollView} from 'react-native'
import AssignmentContainer from "./AssignmentContainer";
import ExamContainer from "./ExamContainer";

export default class WidgetEditor extends React.Component {
    static navigationOptions = { title: "Add Exam/Assignment"};
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            widgetType: 'Exam',
            lessonId: 1
        }
    }
    componentDidMount() {
        const {navigation} = this.props;
        const lessonId = navigation.getParam('lessonId');
        this.setState({
            lessonId: lessonId,
        })
    }

    render() {
        return(
            <ScrollView>
                <Picker
                    onValueChange={(itemValue) =>
                        this.setState({widgetType: itemValue})}
                    selectedValue={this.state.widgetType}>
                    <Picker.Item value="Exam"
                                 label="Exam" />
                    <Picker.Item value="Assignment"
                                 label="Assignment" />
                </Picker>
                {this.state.widgetType === 'Exam' && <ExamContainer lessonId={this.state.lessonId} navigation={this.props.navigation}/>}
                {this.state.widgetType === 'Assignment' && <AssignmentContainer navigation={this.props.navigation} lessonId={this.state.lessonId}/>}
            </ScrollView>
        )
    }
}