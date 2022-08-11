require("../utils/db");
const db = require("../utils/db");

const addContact = async (data) => {
	const contact = new db(data);
	await contact.save();
};

const getContacts = async () => {
	const contacts = await db.find();
	return contacts;
};

const getContactByName = async (id) => {
	const contact = await db.findOne({ nama: id });
	return contact;
};

const updateContact = async (id, data) => {
	await db.findOneAndUpdate({ nama: id }, data);
};

const deleteContact = async (id) => {
	await db.findOneAndDelete({ nama: id });
};

module.exports = {
	addContact,
	getContacts,
	getContactByName,
	updateContact,
	deleteContact,
};
