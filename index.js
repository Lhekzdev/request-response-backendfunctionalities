const express = require("express")
const app = express()

// middleware
// body parser
app.use(express.json())
// or const app require("express")
const PORT = process.env.PORT || 5000
app.listen(5000, () => {
    console.log(`"app listening  at port ${PORT} "`);

})


const drugs = [

    {
        id: 1, name: "Amoxicillin", category: "Antibiotic", dosageMg: 500, isPrescriptionOnly: true, stock: 120,
        manufacturer: "Pfizer"
    },

    {
        id: 2, name: "Paracetamol", category: "Analgesic", dosageMg: 1000, isPrescriptionOnly: false, stock: 200,
        manufacturer: "GSK"
    },

    {
        id: 3, name: "Ibuprofen", category: "Analgesic", dosageMg: 400, isPrescriptionOnly: false, stock: 150,
        manufacturer: "Bayer"
    },

    {
        id: 4, name: "Chloroquine", category: "Antimalarial", dosageMg: 250, isPrescriptionOnly: true, stock: 80,
        manufacturer: "Sanofi"
    },

    {
        id: 5, name: "Ciprofloxacin", category: "Antibiotic", dosageMg: 500, isPrescriptionOnly: true, stock: 70,
        manufacturer: "Pfizer"
    },

    {
        id: 6, name: "Loratadine", category: "Antihistamine", dosageMg: 10, isPrescriptionOnly: false, stock: 160,
        manufacturer: "Novartis"
    },

    {
        id: 7, name: "Metformin", category: "Antidiabetic", dosageMg: 850, isPrescriptionOnly: true, stock: 140,
        manufacturer: "Teva"
    },

    {
        id: 8, name: "Artemether", category: "Antimalarial", dosageMg: 20, isPrescriptionOnly: true, stock: 60,
        manufacturer: "Roche"
    },

    {
        id: 9, name: "Aspirin", category: "Analgesic", dosageMg: 300, isPrescriptionOnly: false, stock: 180, manufacturer:
            "Bayer"
    },

    {
        id: 10, name: "Omeprazole", category: "Antacid", dosageMg: 20, isPrescriptionOnly: true, stock: 90, manufacturer:
            "AstraZeneca"
    },

    {
        id: 11, name: "Azithromycin", category: "Antibiotic", dosageMg: 250, isPrescriptionOnly: true, stock: 50,
        manufacturer: "Pfizer"
    },

    {
        id: 12, name: "Cetirizine", category: "Antihistamine", dosageMg: 10, isPrescriptionOnly: false, stock: 110,
        manufacturer: "Novartis"
    },

    {
        id: 13, name: "Insulin", category: "Antidiabetic", dosageMg: 100, isPrescriptionOnly: true, stock: 30,
        manufacturer: "Novo Nordisk"
    },

    {
        id: 14, name: "Artemisinin", category: "Antimalarial", dosageMg: 100, isPrescriptionOnly: true, stock: 50,
        manufacturer: "GSK"
    },

    {
        id: 15, name: "Codeine", category: "Analgesic", dosageMg: 30, isPrescriptionOnly: true, stock: 20, manufacturer:
            "Teva"
    },

    {
        id: 16, name: "Vitamin C", category: "Supplement", dosageMg: 500, isPrescriptionOnly: false, stock: 300,
        manufacturer: "Nature’s Bounty"
    },

    {
        id: 17, name: "Ranitidine", category: "Antacid", dosageMg: 150, isPrescriptionOnly: false, stock: 90,
        manufacturer: "Sanofi"
    },

    {
        id: 18, name: "Doxycycline", category: "Antibiotic", dosageMg: 100, isPrescriptionOnly: true, stock: 40,
        manufacturer: "Pfizer"
    },

    {
        id: 19, name: "Tramadol", category: "Analgesic", dosageMg: 50, isPrescriptionOnly: true, stock: 45, manufacturer:
            "Teva"
    },

    {
        id: 20, name: "Folic Acid", category: "Supplement", dosageMg: 5, isPrescriptionOnly: false, stock: 250,
        manufacturer: "Nature’s Bounty"
    }

];


// Instructions:

// You are going to build simple APIs using Node.js and Express.
// Use the drugs array given below as your "database" inside the server.

// Important:
// Use express.json() to handle incoming POST request bodies.
// Test all your APIs using Postman.



// 1. GET /drugs/antibiotics
// Return all drugs where category is "Antibiotic".
app.get('/drugs/antibiotics', (req, res) => {


    const antibioticsDrugs = drugs.filter((each) => {
        return each.category == "Antibiotic";
    })

    console.log("Filtered Antibiotics:", antibioticsDrugs); // <-- log result to terminal
    res.json(antibioticsDrugs)

})


// 2.GET /drugs/names
// Return an array of all drug names converted to lowercase.
app.get('/drugs/names', (req, res) => {
    const lowerCaseName = drugs.map((each) => {
        return each.name.toLowerCase()

    })
    console.log("drug names in lower Case:", lowerCaseName); // <-- log result to terminal
    res.json(lowerCaseName)
})

// 3.POST /drugs/by-category
//     Accept a category in the body and return all drugs under that category.
//     Example body: { "category": "Antibiotic" }

app.post('/drugs/by-category', (req, res) => {

    const category = req.body.category
    console.log(category);

    if (!category) {
        console.log("No category provided.");

        return (res.json({ error: "not available" }))
    }


    const accepetedCategory = drugs.filter((each) => { return each.category === category });


    if (accepetedCategory.length > 0) {
        console.log("Matched drugs:", accepetedCategory);
        return res.status(200).json({ mesaage: "Accepted", drugs: accepetedCategory })
    }

    else {

        console.log("No matching drugs found for category:", category);
        return res.status(400).json({ error: "Denied , please check that name specified is part of the drug category", })
    }

})


// 4.GET /drugs/names-manufacturers
//     Return an array of objects showing each drug’s name and manufacturer.

app.get('/drugs/names-manufacturers', (req, res) => {

    const drugName = drugs.map((drug) => {
        console.log(` ${drug.id} Drug name : ${drug.name}, manufacturer is   ${drug.manufacturer}`);
        return {
            id: drug.id,
            name: drug.name,
            manufacturer: drug.manufacturer
        };
    })

    res.json(drugName)
})


// 5.GET /drugs/prescription
// Return all drugs where isPrescriptionOnly is true.


app.get('/drugs/prescription', (req, res) => {

    const prescribedDrugs = drugs.filter((drug) => drug.isPrescriptionOnly === true)
        .map((drug) => ({
            name: drug.name
        }))

    if (prescribedDrugs.length === 0) { return res.status(404).json({ mesaage: "Not a prescribed drug" }) }

    console.log('These are prescribed drugs ', prescribedDrugs);

    res.json(prescribedDrugs)

})

//    6. GET /drugs/formatted
//    Return a new array where each item is a string like:
//    "Drug: [name] - [dosageMg]mg"

app.get('/drugs/formatted', (req, res) => {
    const newArray = drugs.map((drug) => {
        return (`Drug: [${drug.name}] - [${drug.dosageMg}]mg`);
    })
    console.log('item is a string like', newArray);

    res.json(newArray)

})

// 7.GET /drugs/low-stock
// Return all drugs where stock is less than 50.

app.get('/drugs/low-stock', (req, res) => {

    const stockCheck = drugs.filter((drug) => { return drug.stock < 50 }).map((drug) => ({
        id:drug.id,
        name: drug.name
    }))


    if (stockCheck.length === 0) { return res.status(404).json({ mesaage: "Not drug stock lesser than 50" }) }
    console.log('stocks lesser than 50', stockCheck);

    res.json(stockCheck)
});


// 8.GET /drugs/non-prescription
// Return all drugs where isPrescriptionOnly is false.

app.get('/drugs/non-prescription', (req, res) => {
    const notPrescribed = drugs.filter((drug) => { return drug.isPrescriptionOnly === false; }).map((drug) => ({ name: drug.name }))


    if (notPrescribed.length === 0) {  res.status(404).res.json({ message: "No drug which PrescriptionOnly is not false" }) }
    console.log('There are all drugs where isPrescriptionOnly is false', notPrescribed);
    
    res.json(notPrescribed)

})


// 9.POST /drugs/manufacturer-count
// Accept a manufacturer in the body and return how many drugs are produced by that manufacturer.
// Example body: { "manufacturer": "Pfizer" }


app.post('/drugs/manufacturer-count', (req, res) => {

    const manufacturer = req.body.manufacturer

    if (!manufacturer) return res.status(400).json({ message: "Manufacturer not provided." })

    const manufacturerDrugs = drugs.filter((drug) =>
        drug.manufacturer === manufacturer).map((drug) => (
            { name: drug.name, dosage: drug.dosageMg, }))

    const count = manufacturerDrugs.length;
    if (count === 0)
        return res.status(404).json({ message: "No drugs found for this manufacturer.", manufacturer })
    console.log(`manufacturer: ${manufacturer}, count: ${count} `);
    
    res.status(200).json( { message: 'Manufacturer Accepted', 
      
        manufacturer: manufacturer,
        count: count,
       
    })
})



// 10. GET /drugs/count-analgesics
// Count and return how many drugs have the category "Analgesic".

app.get('/drugs/count-analgesics', (req, res) => {


    const analgesics = drugs.filter(drug => (
        drug.category === "Analgesic")).map((drug) => ({
            name: drug.name
             
        }))
    const count = analgesics.length
    if (analgesics.length === 0) { return res.status(400).json({ message: 'This is not an analgesics drug' }) }


console.log( `These are analgesics drugs, count: ${count}, analgesics: ${JSON.stringify(analgesics, null, 2)} ` );


    res.json(
   {count:count,
    analgesics:analgesics


   }
        

    )

}

)













// GET POST PUT PATCH DELETE
// Endpoints

app.get('/', (request, response) => {
    response.send("Welcome to my portal")
})

app.get('/users', (req, res) => {
    const users = [
        {
            firstName: "David",
        },
        {
            firstName: "David",
        }


    ]
    // respond.send("list of users")
    // res.send(users)
    res.json(users)
})

// put as Body, params, querry
app.post("/add-user", (req, res) => {
    const newUser = (req.body);


    res.json({
        message: "user saved successfully",
        newUser
    })
})