const Bus = require("../models/busSchema")
// Get Bus by Id
const getBus = async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.bsid); // Fixed line

        if (!bus) {
            res.status(404);
            throw new Error("Bus not found");
        }

        res.status(200).json({
            msg: "Bus has been fetched successfully",
            data: bus
        });
    } catch (err) {
        res.status(500).json({ msg: err.message }); // Better error handling
    }
};

// Get all buses
const getAllBuses = async (req, res) => {
    try {
        const allBuses = await Bus.find();

        if (!allBuses) {
            res.status(404)
            throw new Error("No buses found")
        }

        res.status(200).json({
            msg: "All buses fetched successfully",
            data: allBuses
        })
    }
    catch (err) {
        throw new Error("No buses found");
    }
}


module.exports = { getBus, getAllBuses }