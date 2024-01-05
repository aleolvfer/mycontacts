const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'Alex',
    email: 'alex@gmail.com',
    phone: '1122334455',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Joao',
    email: 'joao@gmail.com',
    phone: '9988776655',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Maria',
    email: 'maria@gmail.com',
    phone: '3322114455',
    category_id: v4(),
  },
];

class ContactRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.id === id));
    });
  }

  findByEmail(email) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.email === email));
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);

      resolve();
    });
  }

  create({
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const contact = {
        id: v4(),
        name,
        email,
        phone,
        category_id,
      };
      contacts.push(contact);

      resolve();
    });
  }

  update(id, {
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) => (
        contact.id === id ? updatedContact : contact
      ));
      resolve(updatedContact);
    });
  }
}

module.exports = new ContactRepository();
