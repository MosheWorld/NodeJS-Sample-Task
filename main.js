"use strict";
const N = 3;
const getStudents = () => ['Eden', 'Refael', 'Yoni', 'Nitzan', 'Hadas'];
const getAttendees = () => [['Eden', 'Refael', 'Yoni', 'Nitzan', 'Hadas', 'Ortal'],
    ['Berry', 'Nitzan', 'Yoni', 'Eden', 'Hadas', 'Ortal'],
    ['Maxim', 'Ortal', 'Yoni', 'Refael', 'Nitzan', 'Alex'],
    ['Eden', 'Andrew', 'Yoni', 'Nitzan', 'Ortal', 'Nitzan']];
const topNStudentsAttendees = (students, attendees, N) => {
    removeDuplicatesFromAttendees(attendees);
    removeNamesFromAttendeesNotInStudents(students, attendees);
    let counterDictionary = {};
    for (const attendee of attendees) {
        for (const name of attendee) {
            if (!counterDictionary[name]) {
                counterDictionary[name] = 1;
            }
            else {
                counterDictionary[name] = counterDictionary[name] + 1;
            }
        }
    }
    const keysSorted = Object.keys(counterDictionary).sort((a, b) => counterDictionary[b] - counterDictionary[a]);
    return keysSorted.slice(0, N);
};
const removeDuplicatesFromAttendees = (attendees) => {
    for (let i = 0; i < attendees.length; i++) {
        attendees[i] = Array.from(new Set(attendees[i]));
    }
};
const removeNamesFromAttendeesNotInStudents = (students, attendees) => {
    const studentsDictionary = students.reduce((dict, student) => { dict[student] = true; return dict; }, {});
    for (let i = 0; i < attendees.length; i++) {
        attendees[i] = attendees[i].filter(attendee => studentsDictionary[attendee]);
    }
};
const main = (N) => {
    const results = topNStudentsAttendees(getStudents(), getAttendees(), N);
    console.log(results);
};
main(N);
