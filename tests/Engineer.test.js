
const Engineer = require ('../lib/Engineer')

test('create new Engineer, get information',() => {
    const testEngineer = new Engineer ('Rob', 12, 'rob@email.com', 'rob12@github.com')

    expect(testEngineer.getName()).toEqual('Rob');
    expect(testEngineer.getID()).toEqual(12);
    expect(testEngineer.getEmail()).toEqual('rob@email.com');
    expect(testEngineer.getGithub()).toEqual('rob12@github.com');
    expect(testEngineer.getRole()).toEqual('Engineer');
});