const mongoose = require("mongoose");
const { Schema } = mongoose;

// Indian Penal Code, 1860
const IPC_Schema = new Schema({
    chapter: { type: Number },
    chapterTitle: { type: String },
    section: { type: String },
    sectionTitle: { type: String },
    sectionDesc: { type: String }
});

// Code of Criminal Procedure, 1973
const CRPC_Schema = new Schema({
    chapter: { type: Number, },
    section: { type: String, },
    sectionTitle: { type: String, },
    sectionDesc: { type: String, }
});

// Civil Procedure Code, 1908
const CPC_Schema = new Schema({
    section: { type: String, },
    title: { type: String, },
    desc: { type: String, }
});

// Indian Divorce Act, 1869
const IDA_Schema = new Schema({
    section: { type: String },
    title: { type: String },
    desc: { type: String }
});

// Indian Evidence Act, 1872
const IEA_Schema = new Schema({
    chapter: { type: Number, },
    section: { type: String, },
    sectionTitle: { type: String, },
    sectionDesc: { type: String, }
});

// Motor Vehicles Act
const MVA_Schema = new Schema({
    section: { type: String, },
    title: { type: String, },
    desc: { type: String, }
});


const IPC_Model = mongoose.model("IPC", IPC_Schema);
const CRPC_Model = mongoose.model("CRPC", CRPC_Schema);
const CPC_Model = mongoose.model("CPC", CPC_Schema);
const IDA_Model = mongoose.model("IDA", IDA_Schema);
const IEA_Model = mongoose.model("IEA", IEA_Schema);
const MVA_Model = mongoose.model("MVA", MVA_Schema);


module.exports = {
    IPC_Model,
    CRPC_Model,
    CPC_Model,
    IDA_Model,
    IEA_Model,
    MVA_Model
};
