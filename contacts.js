const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading contacts:', error.message);
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find(contact => contact.id === contactId) || null;
  } catch (error) {
    console.error('Error getting contact by id:', error.message);
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contactToRemove = contacts.find(contact => contact.id === contactId);
    if (!contactToRemove) {
      return null;
    }

    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

    return contactToRemove;
  } catch (error) {
    console.error('Error removing contact:', error.message);
    return null;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: Math.random().toString(36).substring(7),
      name,
      email,
      phone
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
  } catch (error) {
    console.error('Error adding contact:', error.message);
    return null;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};



