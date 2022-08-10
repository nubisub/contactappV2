const fs = require("fs");
const express = require("express");
const { json } = require("express");
const app = express();
const port = 3000;
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
const contacts = require("./utils/contact");

app.set("view engine", "ejs");
const bodyParser = require("body-parser");
// built in middleware
// make public assets available to the app
app.use(express.static("public"));
// app.use(express.urlencoded ());
app.use(bodyParser.urlencoded({ extended: true }));

// middleware
// app.use((req, res, next) => {
// 	console.log("Time : " + Date.now());
// 	next();
// });
// Routing

app.get("/", (req, res) => {
	res.render("index", {
		title: "Contact: Home",
		layout: "layouts/main-layout",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		layout: "layouts/main-layout",
		title: "Contact: About",
	});
});

app.get("/contact", (req, res) => {
	res.render("contact", {
		data: contacts.loadContacts(),
		layout: "layouts/main-layout",
		title: "Contact: Contact",
	});
});

app.post("/contact", (req, res) => {
	contacts.addContact(req.body);
	res.redirect("/contact");
});

app.get("/add", (req, res) => {
	res.render("add", {
		layout: "layouts/main-layout",
		title: "Contact: Add",
	});
}),
app.post("/contact/update/:id", (req, res) => {
	contacts.updateContact(req.params.id, req.body);
	console.log(req.body);
	res.redirect("/contact");
}),

	app.get("/contact/delete/:id", (req, res) => {
		const data = contacts.findContacts(req.params.id);
		if (data) {
			contacts.deleteContact(req.params.id);
			res.redirect("/contact");
		} else {
			res.redirect("/contact");
		}
	});

app.get("/contact/:nama", (req, res) => {
	res.render("detail", {
		data: contacts.findContacts(req.params.nama),
		layout: "layouts/main-layout",
		title: "Contact: Contact",
	});
});

	app.get("/contact/edit/:id", (req, res) => {
		res.render("edit", {
			data: contacts.findContacts(req.params.id),
			layout: "layouts/main-layout",
			title: "Contact: Edit",
		});
	}),
	app.use("/", (req, res) => {
		res.status(404);
		res.render("error", {
			layout: "layouts/main-layout",
			title: "Contact: Error",
		});
	});

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
