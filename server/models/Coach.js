const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const coachSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        team: [{type: mongoose.Types.ObjectId, ref: 'Teams'}]
    },
    {timestamps: true}
);
const Coach = mongoose.model('Coachs', coachSchema);

module.exports = Coach;