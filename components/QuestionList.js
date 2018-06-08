import React, {Component} from 'react'
import {Picker, Button, ScrollView} from 'react-native'
import {ListItem} from 'react-native-elements'
import ExamServiceClient from "../services/ExamServiceClient";
import WidgetList from "./WidgetList";
import MultipleChoiceQuestionEditor from "../elements/MultipleChoiceQuestionEditor";
import TrueFalseQuestionEditor from "../elements/TrueFalseQuestionEditor";
import EssayQuestionEditor from "../elements/EssayQuestionEditor";
import FillInTheBlankQuestionEditor from "../elements/FillInTheBlankQuestionEditor";
import FillInTheBlankQuestionUpdater from "../elements/FillInTheBlankQuestionUpdater";
import MultipleChoiceQuestionUpdater from "../elements/MultipleChoiceQuestionUpdater";
import TrueFalseQuestionUpdater from "../elements/TrueFalseQuestionUpdater";
import EssayQuestionUpdater from "../elements/EssayQuestionUpdater";

class QuestionList extends Component {
    static navigationOptions = {title: 'Questions'};

    constructor(props) {
        super(props);
        this.state = {
            widgets: [],
            questions: [],
            examId: 1,
            lessonId: 1,
            newQuestion: ''
        };
        this.examService = ExamServiceClient.instance;
        this.deleteExam = this.deleteExam.bind(this)

    }

    componentDidMount() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId");
        const lessonId = navigation.getParam("lessonId");
        this.setState({
            examId: examId,
            lessonId: lessonId
        });
        fetch("http://react-native-course-manager.herokuapp.com/api/exam/" + examId + "/question")
            .then(response => (response.json()))
            .then(questions => this.setState({questions: questions}));
    }

    componentWillReceiveProps(newProps) {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId");
        const lessonId = navigation.getParam("lessonId");
        this.setState({
            examId: examId,
            lessonId: lessonId
        });
        fetch("http://react-native-course-manager.herokuapp.com/api/exam/" + examId + "/question")
            .then(response => (response.json()))
            .then(questions => this.setState({questions: questions }));
    }

    deleteExam() {
        this.examService
            .deleteExam(this.state.examId)
            .then(() => {
                this.props.navigation
                    .navigate("WidgetList", {lessonId: this.state.lessonId})
            });
    }

    render() {
        return (

            <ScrollView style={{padding: 15}}>

                <Button backgroundColor="red"
                        color="black"
                        onPress={() => {
                            this.deleteExam()}}
                        title="Delete Exam"/>

                <Picker
                    onValueChange={(itemValue) =>
                        this.setState({newQuestion: itemValue})}
                    selectedValue={this.state.newQuestion}>
                    <Picker.Item value='MC'
                                 label="Multiple Choice" />
                    <Picker.Item value='TF'
                                 label="True or False" />
                    <Picker.Item value='FB'
                                 label="Fill in the Blanks" />
                    <Picker.Item value='EQ'
                                 label="Essay" />
                </Picker>
                {this.state.newQuestion === 'MC' && <MultipleChoiceQuestionEditor examId={this.state.examId}
                                                                                  lessonId={this.state.lessonId}
                                                                                  navigation={this.props.navigation}/>}
                {this.state.newQuestion === 'TF' && <TrueFalseQuestionEditor examId={this.state.examId}
                                                                             lessonId={this.state.lessonId}
                                                                             navigation={this.props.navigation}/>}
                {this.state.newQuestion === 'FB' && <FillInTheBlankQuestionEditor examId={this.state.examId}
                                                                                  lessonId={this.state.lessonId}
                                                                                  navigation={this.props.navigation}/>}
                {this.state.newQuestion === 'EQ' && <EssayQuestionEditor examId={this.state.examId}
                                                                         lessonId={this.state.lessonId}
                                                                         navigation={this.props.navigation}/>}

                {this.state.questions.map(
                    (question, index) => (
                        <ListItem
                            onPress={() => {
                                if (question.type === "TrueFalse")
                                {this.props.navigation
                                        .navigate("TrueFalseQuestionUpdater", {questionId: question.id,
                                                                                question: question,
                                                                                examId: this.state.examId,
                                                                                // lessonId: this.state.lessonId
                                        })}
                                if (question.type === "MultipleChoice")
                                {this.props.navigation
                                        .navigate("MultipleChoiceQuestionUpdater", {questionId: question.id,
                                                                                    question: question,
                                                                                    examId: this.state.examId,
                                                                                    // lessonId: this.state.lessonId
                                        })}
                                if (question.type === "Essay")
                                {this.props.navigation
                                    .navigate("EssayQuestionUpdater", {questionId: question.id,
                                                                        question: question,
                                                                         examId: this.state.examId,
                                                                            // lessonId: this.state.lessonId
                                        })}
                                if (question.type === "FillInTheBlank")
                                {this.props.navigation
                                    .navigate("FillInTheBlankQuestionUpdater", {questionId: question.id,
                                                                                question: question,
                                                                                examId: this.state.examId,
                                                                                // lessonId: this.state.lessonId
                                        })}
                            }}
                            key={index}
                            subtitle={question.description}
                            title={question.title}/>))}

            </ScrollView>
        )
    }
}

export default QuestionList