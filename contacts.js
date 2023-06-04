import { promises as fs} from 'fs';
import { nanoid } from 'nanoid';
import path from 'path';

const contactsPath = path.join('db', 'contacts.json');

async function listContacts() {
    try {
        const readContacts = await fs.readFile(contactsPath);
        return JSON.parse(readContacts);
    } catch(error) {
        console.log(error);
    }
}

async function getContactById(contactId) {
    try {
        const findContact = await listContacts();
        return findContact.find(({ id }) => id === contactId);
    } catch(error) {
        console.log(error);
    }
}

async function addContact(name, email, phone) {
    try{
        const allContacts = await listContacts();
        const addedContact = {
            id: nanoid(),
            name: name,
            email: email,
            phone: phone,
        };
        await updateContacts([...allContacts, addedContact])
    } catch(error) {
        console.log(error);
    }
}

async function removeContact(contactId) {
    try {
        const allContacts = await listContacts();
        const filteredContact = allContacts.filter(({id}) => id !== contactId);
        updateContacts(filteredContact);

        return filteredContact;
    } catch(error) {
        console.log(error);
    }
}

async function updateContacts(data) {
    try {
        await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    } catch(error) {
        console.log(error);
    }
}

export {
    listContacts,
    getContactById,
    addContact,
    removeContact,
}
