
const Engineer = require ('../lib/Engineer')

test('create new Engineer, get information',() => {
    const testEngineer = new Engineer ('Rob', 12, 'rob@email.com', 'rob12@gitgub.com')

    expect(testemployee.getName()).toEqual('Rob');
    expect(testemployee.getID()).toEqual(12);
    expect(testemployee.getEmail()).toEqual('rob@email.com');
    expect(testemployee.getGithub()).toEqual('rob12@github.com');
    expect(testemployee.getRole()).toEqual('Engineer');
});