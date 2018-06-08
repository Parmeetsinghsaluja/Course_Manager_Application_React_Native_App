import 'es6-symbol/implement';
const ESSAY_EXAM_API_URL =
    'http://react-native-course-manager.herokuapp.com/api/exam/EID/essay';
const EXAM_API_URL =
    'http://react-native-course-manager.herokuapp.com/api/essay';


let _singleton = Symbol();
export default class EssayQuestionService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new EssayQuestionService(_singleton);
        return this[_singleton]
    }

    findAllEssayForExam(examId) {
        return fetch(
            ESSAY_EXAM_API_URL
                .replace('EID', examId))
            .then(function (response) {
                return response.json();
            })
    }

    createEssay(examId,essay) {
        return fetch(ESSAY_EXAM_API_URL
                .replace('EID', examId),
            {
                body: JSON.stringify(essay),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            })
            .then(function (response)
            { return response.json(); })
    }

    updateEssay(questionId, question) {
        console.log(questionId)
        return fetch(EXAM_API_URL+'/'+ questionId,
            {
                body: JSON.stringify(question),
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT'
            })
            .then(function (response)
            {
                return response.json();
            });
    }

    deleteEssay(questionId) {
        return fetch(EXAM_API_URL + '/' + questionId,
            {
                method: 'DELETE'
            })
            .then(function (response)
            {
                return response;
            });
    }


}