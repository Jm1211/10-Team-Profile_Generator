const generateHTML = require('./src/html-template');
const fs = require('fs');
const inquirer = require('inquirer');

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
            name: 'officeNumber',
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
            type: `list`,
            name: `moreEmployee`,
            message: `Would you like to add another employee?`,
            choices: ['Add Engineer', 'Add Intern', 'Build my team']
        }
        
    ])
    .then (data => {
        const {name, id, email, officeNumber, moreEmployee} = data;
        const manager = new Manager (name, id, email, officeNumber);

        employees.push(manager);

        return moreEmployee;
    })
};

const addEmployee = (data) => {
    if(data === 'Add Engineer') {
        return inquirer.prompt([
            {
                type: `input`,
                name: `name`,
                message: `What is the engineer's name?`,
                validate: nameInput => {
                    if(nameInput) {
                        return true;
                    } else {
                        console.log(`Please enter the engineer's name!`);
                        return false;
                    }
                }
            },
            {
                type: `input`,
                name: `id`,
                message: `What is the engineer's id?(Required)`,
                validate: idInput => {
                    if(idInput) {
                        return true;
                    } else {
                        console.log(`Please enter the engineer's id!`);
                        return false;
                    }
                }
            },
            {
                type: `input`,
                name: `email`,
                message: `What is the engineer's email?(Required)`,
                validate: emailInput => {
                    if(emailInput) {
                        return true;
                    } else {
                        console.log(`Please enter the engineer's email!`);
                        return false;
                    }
                }
            },
            {
                type: `input`,
                name: `github`,
                message: `What is the engineer's GitHub username?(Required)`,
                validate: githubInput => {
                    if(githubInput) {
                        return true;
                    } else {
                        console.log(`Please enter a Github username for the engineer`);
                        return false;
                    }
                }
            },
            {
                type: `list`,
                name: `moreEmployee`,
                message: `Would you like to add another employee?`,
                choices: ['Add Engineer', 'Add Intern', 'Build my team']
            }
        ])
        .then(data => {
            const { name, id, email, github, moreEmployee } = data;
            const engineer = new Engineer(name, id, email, github);

            employees.push(engineer);

            addEmployee(moreEmployee);
        })
    } else if (data === 'Add Intern') {
        return inquirer.prompt([
            {
                type: `input`,
                name: `name`,
                message: `What is the intern's name?`,
                validate: nameInput => {
                    if(nameInput) {
                        return true;
                    } else {
                        console.log(`Please enter the intern's name!`);
                        return false;
                    }
                }
            },
            {
                type: `input`,
                name: `id`,
                message: `What is the intern's id?`,
                validate: idInput => {
                    if(idInput) {
                        return true;
                    } else {
                        console.log(`Please enter the intern's id!`);
                        return false;
                    }
                }
            },
            {
                type: `input`,
                name: `email`,
                message: `What is the intern's email?`,
                validate: emailInput => {
                    if(emailInput) {
                        return true;
                    } else {
                        console.log(`Please enter the intern's email!`);
                        return false;
                    }
                }
            },
            {
                type: `input`,
                name: `school`,
                message: `What is the intern's school name?`,
                validate: schoolInput => {
                    if(schoolInput) {
                        return true;
                    } else {
                        console.log(`Please enter the intern's school name!`);
                        return false;
                    }
                }
            },
            {
                type: `list`,
                name: `moreEmployee`,
                message: `Would you like to add another employee?`,
                choices: ['Add Engineer', 'Add Intern', 'Build my team']
            }
        ])
        .then(data => {
            const { name, id, email, school, moreEmployee } = data;
            const intern = new Intern(name, id, email, school);

            employees.push(intern);

            addEmployee(moreEmployee);
        })
    } else {
        const html = generateHTML(employees);
        return writeFile(html);
    }
}

init()
  .then(data => {
      addEmployee(data)
  })
  .catch(err => {
      console.log(err);
  })    

  const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
       
        if (err) {
            console.log(err);
            return;
       
        } else {
            console.log("Your team profile has been successfully created!")
        }
    })
}; 