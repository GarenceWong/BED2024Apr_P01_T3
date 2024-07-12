const PersonalDetails = require("../models/personalDetailsModel"); 
 
async function addPersonalDetails(req, res) { 
  try { 
    const details = req.body; 
    console.log("Details received:", details); 
 
    const newDetails = await PersonalDetails.createPersonalDetails(details); 
    if (newDetails) { 
      console.log("Details to be sent:", newDetails); // Log the response data 
      res.status(200).json(newDetails); 
    } else { 
      res.status(500).json({ message: "Error creating personal details." }); 
    } 
  } catch (err) { 
    console.error("Error adding personal details:", err.message); 
    res.status(500).json({ message: "Error adding personal details: " + err.message }); 
  } 
} 
 
async function fetchPersonalDetails(req, res) { 
  try { 
    const { id } = req.params; 
    const details = await PersonalDetails.getPersonalDetailsById(id); 
    if (details) { 
      res.json(details); 
    } else { 
      res.status(404).json({ message: "Personal details not found." }); 
    } 
  } catch (err) { 
    console.error("Error fetching personal details:", err.message); 
    res.status(500).json({ message: "Error fetching personal details: " + err.message }); 
  } 
} 
 
module.exports = { 
  addPersonalDetails, 
  fetchPersonalDetails 
};





