const mongoose = require("mongoose");
mongoose.connect(
	"mongodb+srv://newuser123:" +
		process.env.SECRET_KEY +
		"@mongo.yeaxtb7.mongodb.net/contactapp?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

const contactSchema = new mongoose.Schema({
	nama: String,
	email: String,
	phone: String,
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
