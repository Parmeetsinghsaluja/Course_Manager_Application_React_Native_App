import 'es6-symbol/implement';

const FILL_BLANK_EXAM_API_URL =
    'http://react-native-course-manager.herokuapp.com/api/exam/EID/blanks';
const FILL_BLANK_API_URL =
    'http://react-native-course-manager.herokuapp.com/api/blanks';

let _singleton = Symbol();
export default class FillInTheBlankQuestionServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new FillInTheBlankQuestionServiceClient(_singleton);
        return this[_singleton]
    }

    findAllFillInTheBlankQuestionForExam(examId) {
        return fetch(
            FILL_BLANK_EXAM_API_URL
                .replace('EID', examId))
            .then(function (response) {
                return response.json();
            })
    }

    createFillInTheBlank(examId,blanks) {
        return fetch(FILL_BLANK_EXAM_API_URL
                .replace('EID', examId),
            {
                body: JSON.stringify(blanks),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            })
            .then(function (response)
            { return response.json(); })
    }

    updateFillInTheBlank(questionId, question) {
        return fetch(FILL_BLANK_API_URL+'/'+ questionId,
            {
                body: JSON.stringify(question),
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT'
            })
            .then(function (response)
            {
                return response.json();
            })
            .catch(function(error) {
                console.log(error.message);
            })
    }

    deleteFillInTheBlank(questionId) {
        return fetch(FILL_BLANK_API_URL + '/' + questionId,
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