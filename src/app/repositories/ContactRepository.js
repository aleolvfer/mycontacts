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
  async findAll(order = 'ASC') {
    const direction = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM contacts ORDER BY name ${direction}`);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM contacts WHERE id = $1', [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [email]);
    return row;
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
