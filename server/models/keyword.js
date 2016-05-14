var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var PairSchema = new mongoose.Schema({
	pair: String,
  count: Number,
})
mongoose.model('Pair', PairSchema);
var KeywordSchema = new mongoose.Schema({
	search: [{type: Schema.Types.ObjectId, ref: "Pair"}],
  created_at: {type: Date, default: Date.now}
});
mongoose.model('Keyword', KeywordSchema);