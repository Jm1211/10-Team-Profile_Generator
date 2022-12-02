const Intern = require('../lib/Intern')

test('create new Intern, get information',() => {
    const testIntern = new Intern ('Rob', 12, 'rob@email.com', 'University of Utah')

    expect(testIntern.getName()).toEqual('Rob');
    expect(testIntern.getID()).toEqual(12);
    expect(testIntern.getEmail()).toEqual('rob@email.com');
    expect(testIntern.getSchool()).toEqual('University of Utah');
    expect(testIntern.getRole()).toEqual('Intern');
});