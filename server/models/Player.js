const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const playerSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        salary: {type: Number, default: 0},
        team: [{type: mongoose.Types.ObjectId, ref: 'Teams'}]
    },
    {timestamps: true}
);
playerSchema.plugin(mongoosePaginate);

const Player = mongoose.model('Players', playerSchema);

module.exports = Player;