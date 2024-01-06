const { v4 } = require('uuid');

const db = require('../database');

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

  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
    INSERT INTO contacts(name, email, phone, category_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `, [name, email, phone, category_id]);

    return row;
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
