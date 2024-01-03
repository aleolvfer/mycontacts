const { uuid } = require('uuidv4');

const contacts = [
  {
    id: uuid(),
    name: 'Alex',
    email: 'alex@gmail.com',
    phone: '1122334455',
    category_id: uuid(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }
}

module.exports = new ContactsRepository();
