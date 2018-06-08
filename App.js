import 'es6-symbol/implement';
import React from 'react';
import {StatusBar, ScrollView } from 'react-native';
import FixedHeader from './elements/FixedHeader'
import TrueFalseQuestionEditor from './elements/TrueFalseQuestionEditor'
import MultipleChoiceQuestionEditor from './elements/MultipleChoiceQuestionEditor'
import { createStackNavigator } from 'react-navigation'
import {Button} from 'react-native-elements'
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import WidgetList from './components/WidgetList'
import QuestionList from './components/QuestionList'
import WidgetEditor from "./elements/WidgetEditor";
import AssignmentContainer from "./elements/AssignmentContainer";
import AssignmentEditor from "./elements/AssignmentEditor";
import ExamContainer from "./elements/ExamContainer";
import TrueFalseUpdator from "./elements/TrueFalseUpdater";

class Home extends React.Component {
    static navigationOptions = {
        title: 'Home'
    }
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <ScrollView>
                <StatusBar barStyle="light-content"/>
                <FixedHeader/>

                <Button title="Courses"
                        onPress={() => this.props.navigation
                            .navigate('CourseList') } />

            </ScrollView>
        )
    }
}


const App = createStackNavigator({
    Home,
    CourseList,
    ModuleList,
    LessonList,
    WidgetList,
    WidgetEditor,
    ExamContainer,
    AssignmentContainer,
    AssignmentEditor,
    QuestionList,
    TrueFalseUpdator,
    TrueFalseQuestionEditor,
    MultipleChoiceQuestionEditor
});

export default App;
