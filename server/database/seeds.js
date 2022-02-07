const db = require('./connection');
const {Industry, Member, MentorGroup} = require('../models');
const {faker} = require('@faker-js/faker');
const bcrypt = require('bcrypt');

//once the database opens, run the script in the callback
db.once('open', async () => {

    //clear all of the models in the mongo database
    await MentorGroup.deleteMany();
    await Member.deleteMany();
    await Industry.deleteMany();

    //industry seed data
    var industryArray = [
        {name: 'programming'},
        {name: 'compsci'},
        {name: 'physics'},
        {name: 'math'},
        {name: 'engineering'},
        {name: 'business'},
        {name: 'finance'},
        {name: 'entrepreneurship'},
        {name: 'banking'},
        {name: 'language'},
    ];

    //Insert all industries and save into a variable
    const industries = await Industry.insertMany(industryArray);

    //member seed array
    var memberArray = [];

    //add 20 members to the member array
    for(var i = 0; i < 20; i++){
        //create a member with faked data
        member = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(), 
            username: faker.internet.userName(),
            industry: industries[Math.floor(Math.random() * 10)]._id,
            description: faker.hacker.phrase(),
            password: await bcrypt.hash('password', 10)
        }

        //add the member to the array
        memberArray.push(member);
    }

    //Insert all of the industries and members to the DB
    await Member.insertMany(memberArray);

    console.log("Database has been seeded.")

    //exit the function
    process.exit();
});