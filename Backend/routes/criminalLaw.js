const { Router } = require("express");
const criminalLawsRouter = Router();
const { IPC_Model, CRPC_Model } = require("../DataBase/lawDB");


criminalLawsRouter.get("/ipc", async function (req, res) {

    const sections = Array.isArray(req.query.sections) 
    ? req.query.sections.map(section => section.toUpperCase()) //if multiple section passed 
    : [req.query.sections.toUpperCase()]; //if only one section passed

    try {
        const ipcDataPromises = sections.map(section =>
            IPC_Model.findOne({ section: section })
        );

        const ipcDataResults = await Promise.all(ipcDataPromises);

        const formattedResults = ipcDataResults.map((ipcData, index) => {
            if (!ipcData) {
                return {
                    section: sections[index],
                    message: `Section ${sections[index]} not found`
                };
            }
            return {
                chapter: ipcData.chapter,
                chapterTitle: ipcData.chapterTitle,
                section: ipcData.section,
                sectionTitle: ipcData.sectionTitle,
                sectionDesc: ipcData.sectionDesc
            };
        });

        return res.status(200).json({
            message: "IPC sections data retrieved successfully",
            lawData: formattedResults
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }

});


criminalLawsRouter.get("/crpc", async function (req, res) {
   
const sections = Array.isArray(req.query.sections) 
    ? req.query.sections.map(section => section.toUpperCase()) //if multiple section passed 
    : [req.query.sections.toUpperCase()]; //if only one section passed
    
    try {
        const crpcDataPromises = sections.map(section =>
            CRPC_Model.findOne({ section: section })
        );

        const crpcDataResults = await Promise.all(crpcDataPromises);

        const formattedResults = crpcDataResults.map((crpcData, index) => {
            if (!crpcData) {
                return {
                    section: sections[index],
                    message: `Section ${sections[index]} not found`
                };
            }
            return {
                chapter: crpcData.chapter,
                section: crpcData.section,
                sectionTitle: crpcData.sectionTitle,
                sectionDesc: crpcData.sectionDesc
            };
        });

        return res.status(200).json({
            message: "CRPC sections data retrieved successfully",
            lawData: formattedResults
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});


module.exports = {
    criminalLawsRouter: criminalLawsRouter
}



