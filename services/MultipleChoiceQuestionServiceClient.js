import 'es6-symbol/implement';
const MULTI_CHOICE_EXAM_API_URL =
    'http://react-native-course-manager.herokuapp.com/api/exam/EID/choice';

const MULTI_CHOICE_API_URL =
    'http://react-native-course-manager.herokuapp.com/api/choice';

let _singleton = Symbol();
export default class MultipleChoiceQuestionServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new MultipleChoiceQuestionServiceClient(_singleton);
        return this[_singleton]
    }

    findAllMultiChoiceForExam(examId) {
        return fetch(
            MULTI_CHOICE_EXAM_API_URL
                .replace('EID', examId))
            .then(function (response) {
                return response.json();
            })
    }

    createMultiChoice(examId,choice) {
        return fetch(MULTI_CHOICE_EXAM_API_URL
                .replace('EID', examId),
            {
                body: JSON.stringify(choice),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            })
            .then(function (response)
            { return response.json(); })
    }

    updateMultiChoice(questionId, question) {
        return fetch(MULTI_CHOICE_API_URL +'/'+ questionId,
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

    deleteMultiChoice(questionId) {
        return fetch(MULTI_CHOICE_API_URL + '/' + questionId,
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