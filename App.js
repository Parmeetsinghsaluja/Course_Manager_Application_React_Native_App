import 'es6-symbol/implement';
import React from 'react';
import {StatusBar, ScrollView } from 'react-native';
import FixedHeader from './elements/FixedHeader'
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
import TrueFalseQuestionUpdater from "./elements/TrueFalseQuestionUpdater";
import EssayQuestionUpdater from "./elements/EssayQuestionUpdater";
import FillInTheBlankQuestionUpdater from "./elements/FillInTheBlankQuestionUpdater";
import MultipleChoiceQuestionUpdater from "./elements/MultipleChoiceQuestionUpdater";
import TrueFalseQuestionEditor from "./elements/TrueFalseQuestionEditor";
import EssayQuestionEditor from "./elements/EssayQuestionEditor";
import FillInTheBlankQuestionEditor from "./elements/FillInTheBlankQuestionEditor";
import MultipleChoiceQuestionEditor from "./elements/MultipleChoiceQuestionEditor";

class Home extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };
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
    TrueFalseQuestionUpdater,
    TrueFalseQuestionEditor,
    MultipleChoiceQuestionEditor,
    MultipleChoiceQuestionUpdater,
    EssayQuestionUpdater,
    EssayQuestionEditor,
    FillInTheBlankQuestionUpdater,
    FillInTheBlankQuestionEditor,
});

export default App;
