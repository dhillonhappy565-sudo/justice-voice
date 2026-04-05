const Case = require('../models/Case');
const Evidence = require('../models/Evidence');
const PDFDocument = require('pdfkit');

// @desc    Create a new case
// @route   POST /api/cases
// @access  Private
exports.createCase = async (req, res) => {
    try {
        const { title, type, date, location, description, involvedParties, additionalDetails } = req.body;

        const newCase = await Case.create({
            userId: req.user.id,
            title,
            type,
            date: date || Date.now(),
            location,
            description,
            involvedParties,
            additionalDetails
        });

        // Check if there are any uploaded files
        if (req.files && req.files.length > 0) {
            const evidenceDocs = req.files.map(file => ({
                caseId: newCase._id,
                fileUrl: `/uploads/${file.filename}`,
                fileType: file.mimetype,
                originalName: file.originalname
            }));
            await Evidence.insertMany(evidenceDocs);
        }

        res.status(201).json({ message: 'Case created successfully', case: newCase });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get user's cases
// @route   GET /api/cases
// @access  Private
exports.getMyCases = async (req, res) => {
    try {
        const cases = await Case.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(cases);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get single case
// @route   GET /api/cases/:id
// @access  Private
exports.getCase = async (req, res) => {
    try {
        const caseItem = await Case.findById(req.params.id);
        
        if (!caseItem) {
            return res.status(404).json({ message: 'Case not found' });
        }

        // Authorize user (must be owner or admin)
        if (caseItem.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const evidence = await Evidence.find({ caseId: caseItem._id });

        res.status(200).json({ ...caseItem._doc, evidence });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Generate PDF report
// @route   GET /api/cases/:id/report
// @access  Private
exports.generateReport = async (req, res) => {
    try {
        const caseItem = await Case.findById(req.params.id);
        
        if (!caseItem) {
            return res.status(404).json({ message: 'Case not found' });
        }

        // Authorize user
        if (caseItem.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const evidence = await Evidence.find({ caseId: caseItem._id });

        // Generate PDF
        const doc = new PDFDocument({ margin: 50 });

        let filename = `case_report_${caseItem._id}.pdf`;
        res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-type', 'application/pdf');

        doc.pipe(res);

        // PDF Styling
        doc.fontSize(24).text('JusticeVoice Testimony Report', { align: 'center' });
        doc.moveDown();

        doc.fontSize(16).text(`Title: ${caseItem.title}`);
        doc.fontSize(12).text(`Type: ${caseItem.type}`);
        doc.text(`Date of Incident: ${new Date(caseItem.date).toLocaleDateString()}`);
        if(caseItem.location) doc.text(`Location: ${caseItem.location}`);
        doc.text(`Submitted On: ${new Date(caseItem.createdAt).toLocaleDateString()}`);
        doc.moveDown();

        doc.fontSize(16).text('Description:', { underline: true });
        doc.fontSize(12).text(caseItem.description, { align: 'justify' });
        doc.moveDown();

        if (caseItem.involvedParties) {
            doc.fontSize(14).text('Involved Parties:');
            doc.fontSize(12).text(caseItem.involvedParties);
            doc.moveDown();
        }

        if (evidence && evidence.length > 0) {
            doc.fontSize(14).text('Evidence Attached:');
            evidence.forEach((ev, idx) => {
                doc.fontSize(12).text(`${idx + 1}. ${ev.originalName} (${ev.fileType})`);
            });
            doc.moveDown();
        }

        doc.text('This document was generated securely by JusticeVoice.', { align: 'center', color: 'gray' });

        doc.end();

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error generating PDF' });
    }
};
