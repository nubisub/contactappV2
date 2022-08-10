const fs = require("fs");

const loadContacts = () => {
	const data = fs.readFileSync("db.json");
	return JSON.parse(data);
};

const findContacts = (id) => {
	const data = loadContacts();
	return data.find((contact) => contact.nama === id);
};

const replaceContact = (data) => {
	fs.writeFileSync("db.json", JSON.stringify(data));
};

const addContact = (data) => {
	const contacts = loadContacts();
	contacts.push(data);
	replaceContact(contacts);
};

const deleteContact = (id) => {
	const data = loadContacts();
    const newData = (data.filter((contact) => contact.nama !== id));
	replaceContact(newData);
};

const updateContact = (id, data) => {
	const contacts = loadContacts();
	const newData = contacts.map((contact) => {
		if (contact.nama === id) {
			return data;
		} else {
			return contact;
		}
	}
	);
	replaceContact(newData);
};


module.exports = {
	loadContacts,
	findContacts,
	addContact,
	deleteContact,
	updateContact,
};
