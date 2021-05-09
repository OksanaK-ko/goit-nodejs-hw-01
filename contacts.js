const fs = require("fs");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err);
    }
    const rawData = data.toString();
    if (!rawData) {
      process.exit(1);
    }
    const contactsList = JSON.parse(rawData);
    if (contactsList.length === 0) {
      console.log("Your list is empty");
      return;
    }
    console.table(contactsList);
  });
}
function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.log(err);
    }
    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id === +contactId);
    console.log(contact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.log(err);
    }
    let contacts = JSON.parse(data);
    const newContacts = contacts.filter(({ id }) => id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) => {
      if (err) {
        console.log(err);
      }
      console.table(newContacts);
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.log(err);
    }
    if (err) {
      console.log(err);
    }
    let contacts = JSON.parse(data);
    let id = contacts.length + 1;
    const user = {
      id,
      name: name,
      email: email,
      phone: phone,
    };
    let newContacts = contacts.concat(user);
    fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) => {
      if (err) {
        console.log(err);
      }
      console.table(newContacts);
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
