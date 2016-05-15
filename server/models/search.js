var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Search = new mongoose.Schema({
	keywords: [{
		pair: String,
	  count: Number,
	}],
  created_at: {type: Date, default: Date.now}
});
mongoose.model('Search', Search);