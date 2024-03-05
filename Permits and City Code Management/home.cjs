const express = require('express');
const fileUpload = require('express-fileupload');
const { google } = require('googleapis');
const fs = require('fs');

const app = express();

app.use(fileUpload());

// Google Drive API credentials
const credentials = require('./credentials.cjs'); // Update with your service account file
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const drive = google.drive({ version: 'v3', auth: credentials });

// Google Drive folder ID
const DRIVE_FOLDER_ID = 'https://drive.google.com/drive/folders/1QAxTt61l0TUk45z5U2ug5SS8zEJANSGn?usp=sharing'; // Update with your folder ID

async function uploadFileToDrive(file) {
    const fileMetadata = {
        'name': file.name,
        'parents': [DRIVE_FOLDER_ID]
    };
    const media = {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.tempFilePath)
    };
    const response = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    });
    return response.data.id;
}

app.post('/upload', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.file;
    const filePath = `/tmp/${file.name}`;

    file.mv(filePath, async (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        try {
            const fileId = await uploadFileToDrive(file);
            fs.unlinkSync(filePath);
            res.send(`File uploaded to Google Drive with ID: ${fileId}`);
        } catch (error) {
            res.status(500).send(error);
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
