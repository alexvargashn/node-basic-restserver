const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const Role = require('../models/role');
const { uploadFile } = require('../helpers/upload-file');


/**
 * Sends all users in database in paginated way. You could send a 
 * 'limit' parameter that says to the query what is the maximum 
 * number of users to get and a 'since' parameter for the initial 
 * point at index.
 * @param {request} req 
 * @param {response} res 
 */
const getAll = async (req = request, res = response) => {
    const { limit = 5, since = 0 } = req.query;
    const query = { state : true };

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .populate('role', 'role')
            .skip(Number(since))
            .limit(Number(limit))
    ]);

    res.json({
        ok: true,
        total,
        users
    });
 }

 const getOne = async (req = request, res = response) => {
    const { id } = req.params;

    const user = User.findById(id);
    if(user) {
        res.json({
            ok: true,
            user
        })
    } else {
        res.status(404).json({
            ok: false,
            msg: 'There is no one user with this id: ' + id
        })
    }
 }

 const updateUser = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, email, ...other } = req.body;

    if(password) {
        const salt = bcryptjs.genSaltSync(10); 
        other.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, other);

    res.json({
        ok: true,
        user
    });

 }

 const createUser = async (req = request, res = response) => {
    const {name, password, email, role} = req.body;
    const { _id } = await Role.findOne({role});
    const user = new User({name, password, email, role: _id});
    

    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.json({
        ok: true,
        msg: 'All ok',
        user
    })
 }

 const uploadImageUser = async (req = request, res = response) => {
    if(!req.files  || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).json({
            ok: false,
            msg: 'There is not files on request.'
        });
        return;
    } 
    
    try {
        const { id } = req.params;
        const { _id, password, email, ...other } = req.body;
    
        if(password) {
            const salt = bcryptjs.genSaltSync(10); 
            other.password = bcryptjs.hashSync(password, salt);
        }
    
        res.json({
            ok: true,
            user
        });
        const name = await uploadFile(req.files, undefined, 'users');
        const user = await User.findByIdAndUpdate(id, {image: name});
        res.json({
            ok: true,
            name
        })
    } catch (error) {
        res.status(400).json({error});
    }
 }

 const deleteUser = async (req, res = response) => {
    const { id } = req.params;
    const uid = req.uid;

   // const usuario = await Usuario.findByIdAndDelete( id );
    const user = await User.findByIdAndUpdate(id, {state: false});

    res.json({ user });
 }

 module.exports = {
    getAll,
    getOne,
    createUser,
    updateUser,
    uploadImageUser,
    deleteUser
 }