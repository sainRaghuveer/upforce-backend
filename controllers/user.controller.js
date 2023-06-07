const { userModel } = require("../models/user.model")


/*-------------- New user post --------------*/
exports.postUser = async (req, res) => {
    const { email } = req.body;
    try {
        const userAlreadyExist = await userModel.find({ email });
        if (userAlreadyExist.length > 0) {
            return res.status(409).send({ "msg": "user already exists" });
        } else {
            const user = new userModel(req.body);
            await user.save();
            res.status(200).send({ "msg": "User saved successful", "status": true });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ "msg": "Something went wrong", "error": error.message });
    }
};



/*-------------- All user get route with pagination --------------*/
exports.getUser = async (req, res) => {
    const page = req.params.page;
    const searchTerm = req.query.q || "" 
    try {
        const data = await userModel.find({$or: [
            { firstName: { $regex: searchTerm, $options: "i" } },
            { lastName: { $regex: searchTerm, $options: "i" } },
            { email: { $regex: searchTerm, $options: "i" } }
        ]}).skip((page - 1) * 5).limit(5);
        const totalData = await userModel.find();
        const totalPage = Math.ceil((totalData.length)/5)
        res.status(200).send({ "msg": "user data", "data": data, "Pages": totalPage});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ "msg": "Something went wrong", "error": error.message });
    }
};



/*-------------- Single user get route --------- --------------*/
exports.getSingleUser = async (req, res) => {
    const Id = req.params.id;
    try {
        const data = await userModel.findOne({ _id: Id });
        res.status(200).send({ "msg": "Single user data", "data": data });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ "msg": "Something went wrong", "error": error.message });
    }
};



/*----------------------- User update route -------------------------*/
exports.updateUser = async (req, res) => {
    const Id = req.params.id;
    try {
        const user = await userModel.findByIdAndUpdate(Id, req.body);
        res.status(200).send({ "msg": "user data updated successfully", "user": user });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ "msg": "Something went wrong", "error": error.message });
    }
};



/*----------------------- User delete route -------------------------*/
exports.deleteUser = async (req, res) => {
    const Id = req.params.id;
    try {
        const user = await userModel.findByIdAndDelete(Id);
        res.status(200).send({ "msg": "user deleted successfully", "user": user });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ "msg": "Something went wrong", "error": error.message });
    }
};

