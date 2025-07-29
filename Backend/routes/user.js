const { Router } = require("express");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User_Model, UserSave_Model, UserReadLater_Model } = require("../DataBase/userDB");
const userRouter = Router();
const hashRound = parseInt(process.env.HASHROUND, 10);
const JWT_USER_KEY = process.env.JWT_USER_KEY;
const userAuth = require("../middlewares/userAuth")
const { IPC_Model, CPC_Model, CRPC_Model, IDA_Model, IEA_Model, MVA_Model } = require("../DataBase/lawDB");

const validBody = z.object({
    username: z
        .string()
        .min(2, { message: "Username too short" })
        .max(20, { message: "Max 20 characters" }),
    password: z
        .string()
        .min(6, { message: "Password too short" })
        .max(25, { message: "Max 25 characters" })
        .refine((password) => /[A-Z]/.test(password), {
            message: "Add an uppercase letter"
        })
        .refine((password) => /[a-z]/.test(password), {
            message: "Add a lowercase letter"
        })
        .refine((password) => /[0-9]/.test(password), {
            message: "Add a number"
        })
        .refine((password) => /[!@#$%^&*]/.test(password), {
            message: "Add a special character"
        }),
    confirmPassword: z.string()
}).refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ['confirmPassword']
});



userRouter.post("/signup", async function (req, res) {
    const validBodyCheck = validBody.safeParse(req.body);
    if (!validBodyCheck.success) {
        const errorMessages = validBodyCheck.error.issues[0]?.message || "An error occurred";
        return res.status(404).send({ message: `Invalid Input: ${errorMessages}` });
    }

    const { username, password } = validBodyCheck.data;

    try {
        const existingUser = await User_Model.findOne({ username });
        if (existingUser) {
            res.status(400).send({ message: "Username already exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, hashRound);
        const newUser = await User_Model.create({
            username: username,
            password: hashedPassword
        })
        const userId = newUser._id;
        await UserSave_Model.create({
            userId: userId
        })
        await UserReadLater_Model.create({
            userId: userId
        })
        res.status(201).send({ message: "Signup Complete" });
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }

});

userRouter.post("/login", async function (req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(404).send({
            message: "Username and password are required"
        });
        return;
    }

    try {
        const user = await User_Model.findOne({
            username: username
        });
        if (!user) {
            res.status(400).send({
                message: "Invalid credentials"
            });
            return;
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            const token = jwt.sign({
                userId: user._id.toString()
            }, JWT_USER_KEY)

            res.status(200).send({
                message: "Login complete",
                token: token
            })
            return;
        } else {
            res.status(400).send({
                message: "Invalid credentials"
            });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});


userRouter.post("/save", userAuth, async function (req, res) {
    const userId = req.userId;
    const { sectionNo, law } = req.body;

    try {
        const userExist = await UserSave_Model.findOne({ userId });

        if (userExist) {
            const result = await addSection(userExist, sectionNo, law);

            if (!result.success) {
                return res.status(400).send({ message: result.message });
            }

            await userExist.save();

            return res.status(200).send({ message: "Section number saved successfully" });
        } else {
            return res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        return res.status(500).send({ message: "Internal server error" });
    }
});


userRouter.post("/readLater", userAuth, async function (req, res) {
    const userId = req.userId;
    const { sectionNo, law } = req.body;

    try {
        const userExist = await UserReadLater_Model.findOne({ userId });

        if (userExist) {
            const result = await addSection(userExist, sectionNo, law);

            if (!result.success) {
                return res.status(400).send({ message: result.message });
            }

            await userExist.save();

            return res.status(200).send({ message: "Section number saved in Read Later" });
        } else {
            return res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        return res.status(500).send({ message: "Internal server error" });
    }
});

userRouter.get("/laws/saved", userAuth, async (req, res) => {
    const userId = req.userId;

    try {
        const user = await UserSave_Model.findOne({ userId });

        if (!user) {
            return res.status(404).json({ message: "No saved laws found for this user" });
        }

        const savedLawsData = {};
        savedLawsData.ipc = await IPC_Model.find(
            { section: { $in: user.ipcSec } },
            { _id: 0, __v: 0 }
        );
        savedLawsData.crpc = await CRPC_Model.find(
            { section: { $in: user.crpcSec } },
            { _id: 0, __v: 0 }
        );
        savedLawsData.cpc = await CPC_Model.find(
            { section: { $in: user.cpcSec } },
            { _id: 0, __v: 0 }
        );
        savedLawsData.ida = await IDA_Model.find(
            { section: { $in: user.idaSec } },
            { _id: 0, __v: 0 }
        );
        savedLawsData.iea = await IEA_Model.find(
            { section: { $in: user.ieaSec } },
            { _id: 0, __v: 0 }
        );
        savedLawsData.mva = await MVA_Model.find(
            { section: { $in: user.mvaSec } },
            { _id: 0, __v: 0 }
        );

        return res.status(200).json({
            message: "User's saved laws retrieved successfully",
            data: savedLawsData
        });

    } catch (error) {
        return res.status(500).json({ message: "An error occurred while retrieving saved laws" });
    }
});


userRouter.get("/laws/readLater", userAuth, async function (req, res) {
    const userId = req.userId;

    try {
        const user = await UserReadLater_Model.findOne({ userId });

        if (!user) {
            return res.status(404).json({ message: "No saved laws found for this user" });
        }
        const readLaterLawsData = {};
        readLaterLawsData.ipc = await IPC_Model.find(
            { section: { $in: user.ipcSec } },
            { _id: 0, __v: 0 }
        );
        readLaterLawsData.crpc = await CRPC_Model.find(
            { section: { $in: user.crpcSec } },
            { _id: 0, __v: 0 }
        );
        readLaterLawsData.cpc = await CPC_Model.find(
            { section: { $in: user.cpcSec } },
            { _id: 0, __v: 0 }
        );
        readLaterLawsData.ida = await IDA_Model.find(
            { section: { $in: user.idaSec } },
            { _id: 0, __v: 0 }
        );
        readLaterLawsData.iea = await IEA_Model.find(
            { section: { $in: user.ieaSec } },
            { _id: 0, __v: 0 }
        );
        readLaterLawsData.mva = await MVA_Model.find(
            { section: { $in: user.mvaSec } },
            { _id: 0, __v: 0 }
        );

        return res.status(200).json({
            message: "User's saved laws retrieved successfully",
            data: readLaterLawsData
        });

    } catch (error) {
        return res.status(500).json({ message: "An error occurred while retrieving saved laws" });
    }

})

userRouter.delete("/save/delete", userAuth, async (req, res) => {
    const userId = req.userId;
    const { law, lawSection } = req.body;


    if (!law || !lawSection) {
        return res.status(400).json({ message: "Law type and section are required" });
    }

    const allowedFields = ["ipc", "crpc", "cpc", "ida", "iea", "mva"];
    
    if (!allowedFields.includes(law)) {
        return res.status(400).json({ message: "Invalid law type" });
    }
    const newLaw = `${law}Sec`
    try {
        const user = await UserSave_Model.findOneAndUpdate(
            { userId },
            { $pull: { [newLaw]: lawSection } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "No saved laws found for this user" });
        }

        return res.status(200).json({
            message: `Section ${lawSection} removed from ${law}`,
            updatedUser: user
        });

    } catch (error) {
        return res.status(500).json({ message: "An error occurred while deleting the law section" });
    }
});


userRouter.delete("/readLater/delete", userAuth, async function (req, res) {
    const userId = req.userId;
    const { law, lawSection } = req.body;


    if (!law || !lawSection) {
        return res.status(400).json({ message: "Law type and section are required" });
    }

    const allowedFields = ["ipc", "crpc", "cpc", "ida", "iea", "mva"];
    if (!allowedFields.includes(law)) {
        return res.status(400).json({ message: "Invalid law type" });
    }

    const newLaw = `${law}Sec`
    try {
        const user = await UserReadLater_Model.findOneAndUpdate(
            { userId },
            { $pull: { [newLaw]: lawSection } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "No saved laws found for this user" });
        }

        return res.status(200).json({
            message: `Section ${lawSection} removed from ${law}`,
            updatedUser: user
        });

    } catch (error) {
        return res.status(500).json({ message: "An error occurred while deleting the law section" });
    }
});

async function addSection(userExist, sectionNo, law) {
    switch (law) {
        case "ipc":
            if (userExist.ipcSec.includes(sectionNo)) {
                return { success: false, message: "IPC section number already exists" };
            }
            userExist.ipcSec.push(sectionNo);
            break;

        case "crpc":
            if (userExist.crpcSec.includes(sectionNo)) {
                return { success: false, message: "CRPC section number already exists" };
            }
            userExist.crpcSec.push(sectionNo);
            break;

        case "cpc":
            if (userExist.cpcSec.includes(sectionNo)) {
                return { success: false, message: "CPC section number already exists" };
            }
            userExist.cpcSec.push(sectionNo);
            break;

        case "ida":
            if (userExist.idaSec.includes(sectionNo)) {
                return { success: false, message: "IDA section number already exists" };
            }
            userExist.idaSec.push(sectionNo);
            break;

        case "iea":
            if (userExist.ieaSec.includes(sectionNo)) {
                return { success: false, message: "IEA section number already exists" };
            }
            userExist.ieaSec.push(sectionNo);
            break;

        case "mva":
            if (userExist.mvaSec.includes(sectionNo)) {
                return { success: false, message: "MVA section number already exists" };
            }
            userExist.mvaSec.push(sectionNo);
            break;

        default:
            return { success: false, message: "Invalid law type provided" };
    }
    return { success: true };
}

module.exports = {
    userRouter
}