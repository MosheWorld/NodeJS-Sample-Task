const N: number = 3

const getStudents = (): Array<string> => ['Eden', 'Refael', 'Yoni', 'Nitzan', 'Hadas'];
const getAttendees = (): Array<Array<string>> => [['Eden', 'Refael', 'Yoni', 'Nitzan', 'Hadas', 'Ortal'],
['Berry', 'Nitzan', 'Yoni', 'Eden', 'Hadas', 'Ortal'],
['Maxim', 'Ortal', 'Yoni', 'Refael', 'Nitzan', 'Alex'],
['a', 'Eden', 'Andrew', 'Yoni', 'Nitzan', 'Ortal', 'Nitzan']];

const topNStudentsAttendees = (students: Array<string>, attendees: Array<Array<string>>, N: number): Array<string> => {
    removeDuplicatesFromAttendees(attendees)
    removeNamesFromAttendeesNotInStudents(students, attendees);

    let counterDictionary: { [key: string]: number } = {};

    for (const attendee of attendees) {
        for (const name of attendee) {
            if (!counterDictionary[name]) {
                counterDictionary[name] = 1;
            } else {
                counterDictionary[name] = counterDictionary[name] + 1;
            }
        }
    }

    const keysSorted: Array<string> = Object.keys(counterDictionary).sort((a: string, b: string) => counterDictionary[b] - counterDictionary[a]);
    return keysSorted.slice(0, N);
}

const removeDuplicatesFromAttendees = (attendees: Array<Array<string>>): void => {
    for (let i = 0; i < attendees.length; i++) {
        attendees[i] = Array.from(new Set(attendees[i]));
    }
}

const removeNamesFromAttendeesNotInStudents = (students: Array<string>, attendees: Array<Array<string>>): void => {
    const studentsDictionary: { [key: string]: boolean } = students.reduce((dict: { [key: string]: boolean }, student: string) => { dict[student] = true; return dict; }, {});
    for (let i = 0; i < attendees.length; i++) {
        attendees[i] = attendees[i].filter(attendee => studentsDictionary[attendee]);
    }
};

const main = (N: number): void => {
    const results: Array<string> = topNStudentsAttendees(getStudents(), getAttendees(), N);
    console.log(results);
}

main(N);
