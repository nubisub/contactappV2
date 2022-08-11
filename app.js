const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
require("dotenv").config();

// MongoDB Query
const db = require("./utils/query");

// EJS
app.set("view engine", "ejs");

// Body Parser
const bodyParser = require("body-parser");

// make public assets available to the app
app.use(express.static("public"));

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Coba Database
app.get("/coba", async (req, res) => {
	const contact = await db.getContacts();
	res.send(contact);
});

// Home Page
app.get("/", (req, res) => {
	res.render("index", {
		title: "Contact: Home",
		layout: "layouts/main-layout",
	});
});

// About Page
app.get("/about", (req, res) => {
	res.render("about", {
		layout: "layouts/main-layout",
		title: "Contact: About",
	});
});

// Contact Page
app.get("/contact", async (req, res) => {
	const contact = await db.getContacts();
	res.render("contact", {
		data: contact,
		layout: "layouts/main-layout",
		title: "Contact: Contact",
	});
});

// Add Contact Action
app.post("/contact", async (req, res) => {
	await db.addContact(req.body);
	res.redirect("/contact");
});

// Add Contact Form
app.get("/add", (req, res) => {
	res.render("add", {
		layout: "layouts/main-layout",
		title: "Contact: Add",
	});
});

// Edit Contact Form
app.post("/contact/update/:id", async (req, res) => {
	await db.updateContact(req.params.id, req.body);
	res.redirect("/contact");
});

// Delete Contact
app.get("/contact/delete/:id", async (req, res) => {
	await db.deleteContact(req.params.id);
	res.redirect("/contact");
});

// Detail Contact Page
app.get("/contact/:nama", async (req, res) => {
	const contact = await db.getContactByName(req.params.nama);
	res.render("detail", {
		data: contact,
		layout: "layouts/main-layout",
		title: "Contact: Contact",
	});
});

// Edit Contact Action
app.get("/contact/edit/:id", async (req, res) => {
	// const contact = await Contact.findOne({ nama: req.params.id });
	const contact = await db.getContactByName(req.params.id);
	res.render("edit", {
		data: contact,
		layout: "layouts/main-layout",
		title: "Contact: Edit",
	});
});

// 404 Page
app.use("/", (req, res) => {
	res.status(404);
	res.render("error", {
		layout: "layouts/main-layout",
		title: "Contact: Error",
	});
});

app.listen(port, () => {
	console.log(`Server started on port http://localhost:${port}`);
});
