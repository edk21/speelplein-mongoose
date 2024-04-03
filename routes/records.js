const express = require('express');
const router = express.Router();
const Child = require('../models/childModel');

// Add a new record
router.post('/addRecord', async (req, res) => {
    //let totalAmount = 0;
    //totalAmount = parseInt(req.body.balance) + parseInt(totalAmount);
    try {
        const newChild = new Child({
            childName: req.body.childName,
            childFamilieName: req.body.childFamilieName,
            childDateOfBirth: req.body.childDateOfBirth,
            childSchool: req.body.childSchool,
            childLevel: req.body.childLevel,
            childGender: req.body.childGender,
            childPassport: req.body.childPassport,
            streetAndHouseNumber: req.body.streetAndHouseNumber,
            postalCodeAndCity: req.body.postalCodeAndCity,
            parentName1: req.body.parentName1,
            parentFamilieName1: req.body.parentFamilieName1,
            parentTel1: req.body.parentTel1,
            parentEmail1: req.body.parentEmail1,
            parentDOB: req.body.parentDOB,
            parentName2: req.body.parentName2,
            parentFamilieName2: req.body.parentFamilieName2,
            parentTel2: req.body.parentTel2,
            parentEmail2: req.body.parentEmail2,
            parentSSN: req.body.parentSSN,
            childSSN: req.body.childSSN,
            childAllergies: req.body.childAllergies,
            medicals: req.body.medicals,
            parentRemarks: req.body.parentRemarks,
            teamRemarks: req.body.teamRemarks,
            week1: req.body.week1,
            week2: req.body.week2,
            week3: req.body.week3,
            week4: req.body.week4,
            presence: req.body.presence,
            balance: req.body.balance,
            social: req.body.social,
            totalAmount: req.body.totalAmount,
        });
        await newChild.save()
        .then((savedChild) => {
            console.log('Child saved:', savedChild);
            res.status(201).json({message: 'Child created successfully'});
        })
        .catch((error) => {
            console.log('Error:', error);

            if(error.code === 11000 && error.keyPattern && error.keyPattern.parentSSN) {
                return res.status(400).json({message: 'Duplicate parent parentSSN_1 dup key'});
            } else {
                res.status(500).json({message: `Unable to create a new Child data: ${error.message}`});
            }

        });
    } catch (error) {
        console.log(error)
        res.status(500).json({message: `Unable to create a new Child data: ${error.message}`});
    }
} );

// Get all records
router.get('/getRecords', async (req, res) => {
    try {
        const children = await Child.find()
        .then((childrens) => {
            console.log('Children:', childrens);
            res.status(200).json({children: childrens});
        })
        .catch((error) => {
            console.log('Error:', error)
            res.status(200).json({message: 'Unable to fetch records'});
        });
    } catch (error) {
        res.status(500).json({message: `Unable to fetch records: ${error.message}`});
    }
});

// Get a single record using ID
router.get('/getRecord/:id', async (req, res) => {
    try {
        // Extract the id from params
        const { id } = req.params;
        // Find the record using the id
        Child.findById(id)
        .then((child) => {
            console.log('Child:', child);
            res.status(200).json({child: child});
        })
        .catch((error) => {
            console.log('Error:', error)
            res.status(200).json({message: 'Unable to find the record'});
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: `Unable to find the record: ${error.message}`});
    }
});

// Search for a record using name
router.get('/searchRecord/:name', async (req, res) => {
    try {
        // Extract the name from params
        const { name } = req.params;
        // Find the record using the name
        Child.find({ childName: name })
        .then((child) => {
            console.log('Child:', child);
            res.status(200).json({child: child});
        })
        .catch((error) => {
            console.log('Error:', error)
            res.status(200).json({message: 'Unable to find the record'});
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: `Unable to find the record: ${error.message}`});
    }
});

// Search Records
router.get('/record/search', async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm;
        const searchregex = new RegExp(searchTerm, 'i');

        await Child.find({
            $or: [
                { childName: searchregex },
                { childFamilieName: searchregex }
            ]
        })
        .then((records) => {
            if(records.length === 0) {
                return res.status(200).json({message: 'No records found', records: []});
            } else {
                return res.status(200).json({records: records});
            }
        })
        .catch((error) => {
            console.log('Error:', error)
            res.status(500).json({message: 'Unable to find the record'});
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Unable to find the record: ${error.message}`});
    }
})

// Update a record using ID
router.put('/record/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedChild = {
            childName: req.body.childName,
            childFamilieName: req.body.childFamilieName,
            childDateOfBirth: req.body.childDateOfBirth,
            childSchool: req.body.childSchool,
            childLevel: req.body.childLevel,
            childGender: req.body.childGender,
            childPassport: req.body.childPassport,
            streetAndHouseNumber: req.body.streetAndHouseNumber,
            postalCodeAndCity: req.body.postalCodeAndCity,
            parentName1: req.body.parentName1,
            parentFamilieName1: req.body.parentFamilieName1,
            parentTel1: req.body.parentTel1,
            parentEmail1: req.body.parentEmail1,
            parentDOB: req.body.parentDOB,
            parentName2: req.body.parentName2,
            parentFamilieName2: req.body.parentFamilieName2,
            parentTel2: req.body.parentTel2,
            parentEmail2: req.body.parentEmail2,
            parentSSN: req.body.parentSSN,
            childSSN: req.body.childSSN,
            childAllergies: req.body.childAllergies,
            medicals: req.body.medicals,
            parentRemarks: req.body.parentRemarks,
            teamRemarks: req.body.teamRemarks,
            week1: req.body.week1,
            week2: req.body.week2,
            week3: req.body.week3,
            week4: req.body.week4,
            presence: req.body.presence,
            balance: req.body.balance,
            social: req.body.social,
            totalAmount: req.body.totalAmount,
        };

        await Child.findByIdAndUpdate({_id:  id}, updatedChild, {new: true})
        .then((updatedChild) => {
            console.log('Child:', updatedChild);
            res.status(200).json({message: 'Child updated successfully', childUpdated: updatedChild});
        })
        .catch((error) => {
            console.log('Error:', error)
            res.status(500).json({message: 'Unable to update the child data'});
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Unable to update the child data: ${error.message}`});
    }
});

// Delete a record using ID
router.delete('/record/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Child.findByIdAndDelete(id)
        .then((deletedChild) => {
            console.log('Child:', deletedChild);
            res.status(200).json({message: 'Child deleted successfully', childDeleted: deletedChild});
        })
        .catch((error) => {
            console.log('Error:', error)
            res.status(500).json({message: 'Unable to delete the child data'});
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Unable to delete the child data: ${error.message}`});
    }
});

module.exports = router;