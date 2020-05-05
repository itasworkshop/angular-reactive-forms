export class DataModel {
}

export class Student {
    id = 0;
    name = '';
    addresses: Address[];
}

export class Address {
    street = '';
    city = '';
    state = '';
    zip = '';
}

export const students: Student[] = [
    {
        id: 1,
        name: 'Raj',
        addresses: [
            { street: '123 Main', city: 'Anywhere', state: 'KA', zip: '94801' },
            { street: '456 3rd cross', city: 'Somewhere', state: 'KA', zip: '23226' },
        ]
    },
    {
        id: 2,
        name: 'Ram',
        addresses: [
            { street: '789 New', city: 'Some', state: 'AP', zip: '04501' },
        ]
    },
    {
        id: 3,
        name: 'Rajesh',
        addresses: []
    },
];

export const states = ['KA', 'MP', 'AP', 'TN'];
