const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        budget: {type: Number, required: true},
        password: {type: String, required: true},
        players: [{type: mongoose.Types.ObjectId, ref: 'Players'}]
    },
    {timestamps: true}
);

const Team = mongoose.model('Teams', teamSchema);

module.exports = Team;