const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join('./db', 'contacts.json');

/**
 *function to read file and parse data
 * @return {array} contact list
 */
const getListContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const list = JSON.parse(data);
    return list;
  } catch (error) {
    console.error(error.message);
  }
};

/**
 *function to get contact list and console it
 */

const listContacts = async () => {
  try {
    const list = await getListContacts();
    console.table(list);
  } catch (error) {
    console.error(error.message);
  }
};

/**
 *function to get contact by id and console it
 * @param {string} contactId - contact`s id to search
 */
const getContactById = async contactId => {
  try {
    const list = await getListContacts();
    const { name, email, phone } = list.find(({ id }) => id === contactId);
    console.log(
      `User name: ${name} \nUser email: ${email} \nUser phone: ${phone}`
    );
  } catch (error) {
    console.error(error.message);
  }
};

/**
 *function to delete contact and console updated contact list
 * @param {string} contactId - contact`s id to delete
 */
const removeContact = async contactId => {
  try {
    const list = await getListContacts();
    const data = list.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(data));
    const updatedList = await getListContacts();
    console.table(updatedList);
  } catch (error) {
    console.error(error.message);
  }
};

/**
 *function to add new contact and console updated contact list
 * @param {string} name - new contact`s name
 * @param {string} email - new contact`s email
 * @param {string} phone - new contact`s phone
 */
const addContact = async (name, email, phone) => {
  try {
    const list = await getListContacts();
    const id = Date.now().toString();
    const newContact = { id, name, email, phone };
    const data = JSON.stringify([newContact, ...list]);
    await fs.writeFile(contactsPath, data);
    const updatedList = await getListContacts();
    console.table(updatedList);
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
