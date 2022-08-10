const fs = require("fs");
const express = require("express");
const { json } = require("express");
const app = express();
const port = 3000;
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

app.set("view engine", "ejs");

// built in middleware
// make public assets available to the app
app.use(express.static("public"));


// middleware
// app.use((req, res, next) => {
// 	console.log("Time : " + Date.now());
// 	next();
// });
// Routing

app.get("/", (req, res) => {
	const data = fs.readFileSync("db.json");
	res.render("index", {
		data: JSON.parse(data),
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
		layout: "layouts/main-layout",
		title: "Contact: Contact",
	});
});

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
