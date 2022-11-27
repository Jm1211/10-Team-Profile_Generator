const generateHTML = require('./src/html-template');
const fs = require('fs');
const inquirer = require('inquirer');

const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const { validate } = require('@babel/types');

const employees = [];

const init = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'Who is the manager of this team?',
            validate: nameInput => {
                if(nameInput) {
                    return true;
                
                }else {
                    console.log( "Please enter a name for the Manager!");
                    return false;
                }
            }

        },
        {
            type: 'input',
            name: 'id',
            message: 'Please enter the Manager id',
            validate: nameInput => {
                if(isNaN (nameInput)) {
                    console.log( "Please enter a Manager id!");
                    return false;
                
                }else {
                    return true;
                }
            }

        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the Manager email? (required)',
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log('Please enter an email for the Manager!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the Manager office number?',
            validate: officeInput => {
                if(officeInput) {
                    return true;
                } else {
                    console.log('Please enter an office number for the Manager!');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'moreEmployees',
            message: 'Would you like to add another employee?',
            choices: ['Add Engineer', 'Add Intern', 'Finish building my team']
        }
        
    ])
    .then (data => {
        const {name, id, email, office, moreEmployees} = data;
        const manager = new Manager (name, id, email, office);

        employees.push(manager);

        return moreEmployees;
    });
}

const addEmployee = (data) => {
    if(data === 'Add Engineer') {
        return inquirer.prompt ([
            {
                type: 'input',
                name: 'name',
                message: 'Who is the Engineer for your team?',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    }else {
                        console.log('Please enter a name for the Engineer!')
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is the Engineer id?',
                validate: idInput => {
                    if (idInput) {
                        return true;
                    }else {
                        console.log('Please enter an id for the Engineer!')
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is the email for the Engineer?',
                validate: emailInput => {
                    if (emailInput) {
                        return true;
                    }else {
                        console.log('Please enter an email for the Engineer!')
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'github',
                message: 'What is the Github username for the Engineer?',
                validate: githubInput => {
                    if (githubInput) {
                        return true;
                    }else {
                        console.log('Please enter a Github username for the Engineer!')
                        return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'moreEmployees',
                message: 'Would you like to add another employee?',
                choices: ['Add Engineer', 'Add Intern', 'Finish building my team']
            }
        ])
        .then (data => {
            const {name, id, email, github, moreEmployees} = data;
            const engineer = new Engineer (name, id, email, github);
    
            employees.push(engineer);
    
            addEmployee(moreEmployees);
        })
    } else if (data === 'Add Intern') {
        return inquirer.prompt ([
            {
                type: 'input',
                name: 'name',
                message: 'Who is the Intern for your team?',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    }else {
                        console.log('Please enter a name for the Intern!')
                        return false;
                    }

                }
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is the Intern id?',
                validate: idInput => {
                    if (idInput) {
                        return true;
                    }else {
                        console.log('Please enter an id for the Intern!')
                        return false;
                    }

                }
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is the Intern email?',
                validate: emailInput => {
                    if (emailInput) {
                        return true;
                    }else {
                        console.log('Please enter an email for the Intern!')
                        return false;
                    }

                }
            },
            {
                type: 'input',
                name: 'school',
                message: 'What is the school name for the Intern?',
                validate: schoolInput => {
                    if (schoolInput) {
                        return true;
                    }else {
                        console.log('Please enter a school name for the Intern!')
                        return false;
                    }

                }
            },
            {
                type: 'list',
                name: 'moreEmployees',
                message: 'Would you like to add another employee?',
                choices: ['Add Engineer', 'Add Intern', 'Finish building my team']
            }

        ])
        .then (data => {
            const {name, id, email, school, moreEmployees} = data;
            const intern = new Intern (name, id, email, school);
    
            employees.push(intern);
    
            addEmployee(moreEmployees);
        })
    }else {
        const html = generateHTML(employees);
        return writeFile(html);
    }
}

init ()
    .then(data => {
        addEmployee(data)
    })
    .catch(err => {
        console.log(err);
    })

    const writeFile = (data) => {
        return new Promise((resolve, reject) => {
            fs.writeFile('./dist/index.html', data, err => {
                if(err) {
                    reject(err);
                    return;
                }
    
                resolve({
                    ok: true,
                    message: 'File Created!'
                });
            });
        });
    };