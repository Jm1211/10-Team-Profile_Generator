const Manager = require('../lib/Manager')

test('create new Manager, get information',() => {
    const testManager = new Manager ('Rob', 12, 'rob@email.com', '1121')

    expect(testManager.getName()).toEqual('Rob');
    expect(testManager.getID()).toEqual(12);
    expect(testManager.getEmail()).toEqual('rob@email.com');
    expect(testManager.getOfficeNum()).toEqual('1121');
    expect(testManager.getRole()).toEqual('Manager');
});