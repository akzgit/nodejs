// server/controllers/formController.js
const exceljs = require('exceljs');
const fs = require('fs');

exports.submitForm = (req, res) => {
  const { name, email, message } = req.body;
  const filePath = 'contactFormData.xlsx';

  // Check if the file already exists
  let workbook;
  if (fs.existsSync(filePath)) {
    // If the file exists, read it
    workbook = new exceljs.Workbook();
    workbook.xlsx.readFile(filePath)
      .then(() => {
        // Add a new worksheet or use an existing one
        const worksheet = workbook.getWorksheet(1) || workbook.addWorksheet('Contact Form Data');
        
        // Add new data to the worksheet
        worksheet.addRow([name, email, message]);

        // Save the updated workbook to the same file
        workbook.xlsx.writeFile(filePath)
          .then(() => {
            console.log('Data appended to Excel file.');
            res.json({ success: true });
          })
          .catch(err => {
            console.error('Error saving data to Excel file:', err);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
          });
      })
      .catch(err => {
        console.error('Error reading Excel file:', err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      });
  } else {
    // If the file doesn't exist, create a new workbook and worksheet
    workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Contact Form Data');

    // Add header row
    worksheet.addRow(['Name', 'Email', 'Message']);

    // Add data row
    worksheet.addRow([name, email, message]);

    // Save the new workbook to the file
    workbook.xlsx.writeFile(filePath)
      .then(() => {
        console.log('Data saved to Excel file.');
        res.json({ success: true });
      })
      .catch(err => {
        console.error('Error saving data to Excel file:', err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      });
  }
};
