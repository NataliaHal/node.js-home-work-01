// const { listContacts, getContactById, removeContact, addContact } = require('./contacts'); // Вказуйте абсолютний шлях до файлу contacts.js

// (async () => {
//   try {
//     const allContacts = await listContacts();
//     console.log('All Contacts:', allContacts);

//     const contactToFindId = 'AeHIrLTr6JkxGE6SN-0Rw';
//     const foundContact = await getContactById(contactToFindId);
//     console.log('Found Contact by ID:', foundContact);

//     const contactToRemoveId = 'qdggE76Jtbfd9eWJHrssH';
//     const removedContact = await removeContact(contactToRemoveId);
//     console.log('Removed Contact:', removedContact);

//     const newContact = await addContact('New Contact', 'new@example.com', '123-456-7890');
//     console.log('Added Contact:', newContact);
//   } catch (error) {
//     console.error('Error testing contacts:', error);
//   }
// })();

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await listContacts();
      console.log('All Contacts:', allContacts);
      break;

    case 'get':
      const foundContact = await getContactById(id);
      console.log('Found Contact by ID:', foundContact);
      break;

    case 'add':
      const newContact = await addContact(name, email, phone);
      console.log('Added Contact:', newContact);
      break;

    case 'remove':
      const removedContact = await removeContact(id);
      console.log('Removed Contact:', removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);

