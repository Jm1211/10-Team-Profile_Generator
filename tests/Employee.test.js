
const Employee = require('../lib/Employee');

test('create employee object, get information',() => {
    const testemployee = new Employee ('Rob', 11, 'rob@email.com');

    expect(testemployee.getName()).toEqual('Rob');
    expect(testemployee.getID()).toEqual(11);
    expect(testemployee.getEmail()).toEqual('rob@email.com');
    expect(testemployee.getRole()).toEqual('Employee');
});


