const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs');
const path = require("path");
const { userModel } = require('../models/user.model');


/*-------------- export csv route --------------*/
exports.exportCSV = async (req, res) => {

    try {
        const users = await userModel.find();
        const csvWriter = createObjectCsvWriter({
            path: 'user.csv',
            header: [
                { id: 'id', title: 'Id' },
                { id: 'firstName', title: 'FirstName' },
                { id: 'lastName', title: 'LastName' },
                { id: 'email', title: 'Email' },
                { id: 'mobile', title: 'Mobile' },
                { id: 'gender', title: 'Gender' },
                { id: 'status', title: 'Status' },
                { id: 'profile', title: 'Profile' },
                { id: 'location', title: 'Location' },
                { id: 'createdAt', title: 'Created at' },
                { id: 'updatedAt', title: 'Updated at' },
            ],
        });

        csvWriter.writeRecords(users)
            .then(() => {
                // This will Read the CSV file data
                const filePath = path.join(__dirname, '../', 'user.csv');
                const csvData = fs.readFileSync(filePath, 'utf8');

                // setting appropriate headers for the CSV response
                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', 'attachment; filename=user.csv');

                // Sending CSV data as a response to the frontend
                res.send(csvData);

                // After sending the CSV data file will get deleted
                fs.unlinkSync(filePath)
            })
            .catch((error) => {
                console.error('Something went wrong. Unable to write the CSV file.', error);
                res.status(500).send({ error: 'Unable to export user data' });
            });
    } catch (error) {
        console.log('error:', error)
        res.status(500).send({ message: error.message })
    }


};
