const { default: test } = require('node:test');
const Employee = require('../lib/Employee');

test('create employee object',() => {
    const employee = new Employee ('Juana Maldonado', 11, 'jm@email.com');

    expect(employee.name).toEqual(expect.any(String));
    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.email).toEqual(expect.any(String));
});


