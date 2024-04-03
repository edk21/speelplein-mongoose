const mongosse = require('mongoose');

const childSchema = new mongosse.Schema({
    childName: String,
    childFamilieName: String,
    childDateOfBirth: String,
    childSchool: String,
    childLevel: String,
    childGender: String,
    childPassport: String,
    streetAndHouseNumber: String,
    postalCodeAndCity: String,
    parentName1: String,
    parentFamilieName1: String,
    parentTel1: String,
    parentEmail1: String,
    parentDOB: String,
    parentName2: String,
    parentFamilieName2: String,
    parentTel2: String,
    parentEmail2: String,
    parentSSN: String,
    childSSN: String,
    childAllergies: String,
    medicals: Boolean,
    parentRemarks: String,
    teamRemarks: String,
    week1: String,
    week2: String,
    week3: String,
    week4: String,
    presence: String,
    balance: Number,
    social: String,
    totalAmount: Number
}, {
    timestamps: true,
});
const Child = mongosse.model("Child", childSchema);
module.exports = Child;
//export default mongosse.models.Child || model("Child", childSchema)