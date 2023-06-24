const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const Plant = require('./models/plantSchema');


const app = express();
const PORT = process.env.PORT || 3000;

// app.listen(PORT, ()=>console.log(`Server is running and listening to ${PORT}`));

// connect to mongodb
const dbURI = 'mongodb+srv://mohamedsallam:bearit@cluster0.tfx7rbv.mongodb.net/gardenapp?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result)=> app.listen(PORT, ()=>console.log(`Connected to db & Server is running and listening to ${PORT}`)))
    .catch((err)=> console.log(err));


// middleware
app.use(express.static('public'));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');

//dummy route to save to db and display on /get-all-plants page
app.get('/get-all-plants', (req, res)=>{
    const plant = new Plant({
    common_name: "Summer Lilac",
    cientific_name: "Buddleja davidii",
    img_url: "https://www.gardensonline.com.au/Uploads/Plant/962/buddleja-davidii-magenta-2Main.jpg",
    hardiness: "5-9",
    lighting: "Full sun",
    description: "Sturdy flowering shrub with pink or purple blooms that attract pollinators. Drought-tolerant and blooms all season long.",
    blooming_period: "Summer",
    });
    plant.save()
      .then((result)=>{
        res.send(result)
      })
      .catch((err)=>{
        console.log(err);
      })
});

//Routes
app.get('/', (req, res)=>{
    res.render('home', { title: 'Home' });
});

app.get('/plant-details/:id', (req, res)=>{
    const plantId = req.params.id;
    Plant.findById(plantId)
    .then((result) => {
        if(result){
            res.render('plant-details', { title: 'Plant Details', result, plantId });
        }else{
            // res.status(404).render('404', { title: '404' });
        }
    })
    .catch((err) => {
      console.log(err);
      res.render('error', { title: 'Error' }); // Render the error page
    });
});

app.get('/plants-list', (req, res)=>{
    Plant.find()
    .then((result)=>{
            res.render('plants-list', { title: 'Plants List', result });//
        })
        .catch((err)=>{
            console.log(err);
        })
});






// 404 page
app.use((req, res)=>{
    res.status(404).render('404', { title: '404' });
});
