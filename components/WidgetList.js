
import React, {Component} from 'react'
import {ScrollView} from 'react-native'
import {Button, ListItem} from 'react-native-elements'

class WidgetList extends Component {
    static navigationOptions = {title: 'Widgets'};

    constructor(props) {
        super(props);
        this.state = {
            widgets: [],
            courseId: 1,
            moduleId: 1,
            lessonId: 1
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId");
        this.setState({
            lessonId: lessonId
        })
        fetch("http://react-native-course-manager.herokuapp.com/api/lesson/" + lessonId + "/widget")
            .then(response => (response.json()))
            .then(widgets => this.setState({widgets}))
    }

    componentWillReceiveProps(newProps) {
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId");
        this.setState({
            lessonId: lessonId
        })
        fetch("http://react-native-course-manager.herokuapp.com/api/lesson/" + lessonId + "/widget")
            .then(response => (response.json()))
            .then(widgets => this.setState({widgets}))
    }

    render() {
        return (
            <ScrollView style={{padding: 15}}>
                <Button backgroundColor="green"
                        color="white"
                        onPress={() => this.props.navigation.navigate('WidgetEditor', {lessonId: this.state.lessonId})}
                        title="Add Widget"/>
                {this.state.widgets.map(
                    (widget, index) => (
                        <ListItem
                            onPress={() => {
                                if (widget.widgetType === "Exam") {
                                    this.props.navigation.navigate("QuestionList", {examId: widget.id,
                                                                                    lessonId: this.state.lessonId})
                                }
                                else {
                                    this.props.navigation.navigate("AssignmentEditor", {assignmentId: widget.id,
                                                                                        widget: widget,
                                                                                        lessonId: this.state.lessonId })
                                }
                            }}
                            key={index}
                            title={widget.title}
                            subtitle={widget.description}/>
                    ))}
            </ScrollView>
        )
    }
}

export default WidgetList