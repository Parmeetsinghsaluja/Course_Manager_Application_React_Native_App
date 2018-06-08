import 'es6-symbol/implement';
const LESSON_ASSIGNMENT_URL =
    'http://react-native-course-manager.herokuapp.com/api/lesson/LID/assignment';
const ASSIGNMENT_URL =
    'http://react-native-course-manager.herokuapp.com/api/assignment';

let _singleton = Symbol();
export default class AssignmentServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new AssignmentServiceClient(_singleton);
        return this[_singleton]
    }

    updateAssignment(assignmentId, assignment) {
        return fetch(ASSIGNMENT_URL+'/'+ assignmentId,
            {
                body: JSON.stringify(assignment),
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

    createAssignment(lessonId,assignment) {
        return fetch(LESSON_ASSIGNMENT_URL
                .replace('LID', lessonId),
            {
                body: JSON.stringify(assignment),
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

    deleteAssignment(assignmentId) {
        return fetch(ASSIGNMENT_URL + '/' + assignmentId,
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