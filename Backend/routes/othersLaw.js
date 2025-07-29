const {Router} = require("express");
const othersLawsRouter = Router();
const {MVA_Model,IEA_Model} = require("../DataBase/lawDB");


othersLawsRouter.get("/iea", async function(req,res)
{
    
    const sections = Array.isArray(req.query.sections) 
    ? req.query.sections.map(section => section.toUpperCase()) //if multiple section passed 
    : [req.query.sections.toUpperCase()]; //if only one section passed

    try {
        const ieaDataPromises = sections.map(section =>
            IEA_Model.findOne({ section: section })
        );

        const ieaDataResults = await Promise.all(ieaDataPromises);

        const formattedResults = ieaDataResults.map((ieaData, index) => {
            if (!ieaData) {
                return {
                    section: sections[index],
                    message: `Section ${sections[index]} not found`
                };
            }
            return {
                chapter: ieaData.chapter,
                section: ieaData.section,
                sectionTitle: ieaData.sectionTitle,
                sectionDesc: ieaData.sectionDesc
            };
        });

        return res.status(200).json({
            message: "IEA sections data retrieved successfully",
            lawData: formattedResults
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});

othersLawsRouter.get("/mva", async function(req,res)
{
    
const sections = Array.isArray(req.query.sections) 
    ? req.query.sections.map(section => section.toUpperCase()) //if multiple section passed 
    : [req.query.sections.toUpperCase()]; //if only one section passed
    
    try {
        const mvaDataPromises = sections.map(section =>
            MVA_Model.findOne({ section: section })
        );

        const mvaDataResults = await Promise.all(mvaDataPromises);

        const formattedResults = mvaDataResults.map((mvaData, index) => {
            if (!mvaData) {
                return {
                    section: sections[index],
                    message: `Section ${sections[index]} not found`
                };
            }
            return {
                section: mvaData.section,
                title: mvaData.title,
                desc: mvaData.desc
            };
        });

        return res.status(200).json({
            message: "MVA sections data retrieved successfully",
            lawData: formattedResults
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports ={
    othersLawsRouter
}