const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require('../../Members');


//Gets all members
router.get('/', (req, res) => {
    res.json(members)
})

//Get single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({msg: `No member with id:${req.params.id}`})
    }    
})

//Create member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        ...req.body,
        status: 'active',
    }

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please include name and email'})
    }
    members.push(newMember);
    // res.json(members);
    res.redirect('/');
})

//Update member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        const updMember = req.body;
        members.forEach(member => {
            if (member => member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email? updMember.email : member.email;

                res.json({msg: 'Member updated', member})
            }

        })
    } else {
        res.status(400).json({msg: `No member with id:${req.params.id}`})
    }    
})

//Delete member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id !== parseInt(req.params.id));

    if (found) {
        res.json({msg: "Member delted" ,members: members.filter(member => member.id === parseInt(req.params.id))})
    } else {
        res.status(400).json({msg: `No member with id:${req.params.id}`})
    }    
})



module.exports = router