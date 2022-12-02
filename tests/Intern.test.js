const Intern = require('../lib/Intern')

test('create new Intern, get information',() => {
    const testIntern = new Intern ('Rob', 12, 'rob@email.com', 'University of Utah')

    expect(testemployee.getName()).toEqual('Rob');
    expect(testemployee.getID()).toEqual(12);
    expect(testemployee.getEmail()).toEqual('rob@email.com');
    expect(testemployee.getSchool()).toEqual('University of Utah');
    expect(testemployee.getRole()).toEqual('Intern');
});