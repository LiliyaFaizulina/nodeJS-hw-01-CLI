const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

/**
 *function to get contact list
 * @return {array} contact list
 */

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const list = JSON.parse(data);
    return list;
  } catch (error) {
    console.error(error.message);
  }
};

/**
 *function to get contact by id and console it
 * @param {string} contactId - contact`s id to search
 * @return {object} contact or null;
 */
const getContactById = async contactId => {
  try {
    const list = await listContacts();
    const contact = list.find(({ id }) => id === contactId);
    if (!contact) {
      return null;
    }
    return contact;
  } catch (error) {
    console.error(error.message);
  }
};

/**
 *function to delete contact and console updated contact list
 * @param {string} contactId - contact`s id to delete
 * @return {object} deleted contact;
 */
const removeContact = async contactId => {
  try {
    const list = await listContacts();
    const contactToDelete = list.find(({ id }) => id === contactId);
    if (!contactToDelete) {
      return null;
    }
    const data = list.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(data));
    return contactToDelete;
  } catch (error) {
    console.error(error.message);
  }
};

/**
 *function to add new contact and console updated contact list
 * @param {string} name - new contact`s name
 * @param {string} email - new contact`s email
 * @param {string} phone - new contact`s phone
 * @return {object} new contact;
 */
const addContact = async (name, email, phone) => {
  try {
    const list = await listContacts();
    const id = nanoid();
    const newContact = { id, name, email, phone };
    const data = JSON.stringify([newContact, ...list]);
    await fs.writeFile(contactsPath, data);
    return newContact;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
