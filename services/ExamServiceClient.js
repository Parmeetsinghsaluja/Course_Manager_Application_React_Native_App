import 'es6-symbol/implement';
const LESSON_EXAM_URL =
    'http://react-native-course-manager.herokuapp.com/api/lesson/LID/exam';
const EXAM_URL =
    'http://react-native-course-manager.herokuapp.com/api/exam';

let _singleton = Symbol();
export default class ExamServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new ExamServiceClient(_singleton);
        return this[_singleton]
    }

    createExam(lessonId,exam) {
        return fetch(LESSON_EXAM_URL
                .replace('LID', lessonId),
            {
                body: JSON.stringify(exam),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            })
            .then(function (response)
            {
                return response;
            })
            .catch(function(error) {
                console.log(error.message);
            })
    }

    deleteExam(examId) {
        return fetch(EXAM_URL + '/' + examId,
            {
                method: 'DELETE'
            })
            .then(function (response)
            {
                return response;
            })
            .catch(function(error) {
                console.log(error.message);
            })
    }


}