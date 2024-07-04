const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/Resume-Builder').then(() => {
  console.log("connected")
}).catch((err) => {
  console.log(err)
})
const UserSchema = new mongoose.Schema({
  name: { type: String },
  ps: { type: String },
  ph: { type: String },
  email: { type: String }
})
const User = mongoose.model('User', UserSchema)
app.post("/loginUser", async (req, res) => {
  const u_pss = req.body.ps1;
  const u_email = req.body.em_id1;
  try {
    const user = await User.findOne({ email: u_email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found....." });
    }
    if (u_pss === user.ps) {
      return res.json({ message: "User Logged in Successfully" });
    } else {
      return res.status(401).json({ message: "Password Mismatch" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to find User" });
  }
});
app.post("/user-register", async (req, res) => {
  const u_name = req.body.uname;
  const u_pss = req.body.ps;
  const u_ph = req.body.ph;
  const u_email = req.body.em_id;
  try {
    const data1 = await User.findOne({ email: u_email });
    if (data1 == null) {
      const result = await User.create({ name: u_name, ps: u_pss, ph: u_ph, email: u_email });
      res.json({ statusCode: 200, message: "Successfully Registered" })
      //res.render('login');
    }
    else {
      res.json({ message: "User Already Exists" })
    }
  }
  catch (error) {
    res.json({ message: "Registration Failed" })
    console.log(error)
  }
})

const RecruSchema = new mongoose.Schema({
  name: { type: String }, 
  email: { type: String },
  ps: { type: String },
  ph: { type: String },
  company: { type: String }
})

const Recr = mongoose.model('Recruiter', RecruSchema)
app.post("/loginRecru", async (req, res) => {
  const u_pss = req.body.ps2;
  const u_email = req.body.em_id2;
  console.log(u_pss)
  console.log(u_email)
  try {
    const rec = await Recr.findOne({ email: u_email });
    if (!rec) {
      return res.status(404).json({ message: "Recruiter Not Found" });
    }
    if (u_pss === rec.ps) {
      return res.json({ message: "Recruiter Logged in Successfully" });
    } else {
      return res.status(401).json({ message: "Password Mismatch" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to find Recruiter" });
  }
});

const jobSchema = new mongoose.Schema({
  jobid: { type: String },
  jobName: { type: String },
  company: { type: String },
  location: { type: String },
  posType: { type: String },
  jobdescr: { type: String },
  jobqualif: { type: String },
  ldate: { type: String },
});
const Job = mongoose.model('JobDet', jobSchema);

app.post('/post-jobdet', async (req, res) => {
  const jd = req.body;
  try {
    console.log(jd);

    const jid = jd.jobid;
    const jName = jd.jobname;
    const comp = jd.comp;
    const loc = jd.loc;
    const pos = jd.postyp;
    const descr = jd.jdescr;
    const qf = jd.jqlf;
    const ld = jd.ldt;

    console.log(jName);
    console.log(descr);
    const newjob = await Job.create({ jobid: jid, jobName: jName, company: comp, location: loc, posType: pos, jobdescr: descr, jobqualif: qf, ldate:ld });
    console.log(newjob);
    res.status(201).json(newjob);
  } catch (error) {
    console.error('Error creating Job:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/jobdets', async (req, res) => {
  //const staffName = req.query.u_name;
  try {
    const jobdet = await Job.find();
    console.log(jobdet);
    res.status(200).json(jobdet);
  } catch (error) {
    console.error('Error retrieving Jobdetails:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const resumeData = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  summary: { type: String },
  exp: [{ type: String, required: true }],
  education: [{ type: String, required: true }],
  cert: [{ type: String, required: true }],
  proj: [{ type: String, required: true }]
});

const ResumeData = mongoose.model('ResumeData', resumeData)
app.post('/res-details', async (req, res) => {
  const resData = req.body;
  const { name, email, phone, summary, exp, education, cert, proj } = resData;
  //console.log(resData)
  try {
    const ns = new ResumeData({  name, email, phone, summary, exp, education, cert, proj });
    //console.log(ns)
    await ns.save();
    res.status(201).json({ message: 'Data Inserted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to insert Data', details: err.message });
  }
});

app.get('/res-data', async (req, res) => {
  const emailid = req.query.email;
  try {
    const resdet = await ResumeData.find({  email: emailid }).exec();
    res.json(resdet);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).send('Internal server error');
  }
});

app.post("/updatepassword", async (req, res) => {
  const { email, newPassword } = req.body;
console.log(email,newPassword)
  try {
    const updatedUser = await Recr.findOneAndUpdate({ email: email }, { ps: newPassword }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/remove/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)

    const group = await Job.findOneAndDelete({ jobid:id });

    if (!group) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(4000, () => {
  console.log("Listening at http://localhost:4000")
})

