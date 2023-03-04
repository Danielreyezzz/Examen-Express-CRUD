const express = require("express");
const router = express.Router();
const Bar = require("../models/Bar");

router.get("/", async (req, res) => {
  try {
    const arrayBar = await Bar.find();
    console.log(arrayBar);
    res.render("bar", { arrayBar: arrayBar });
  } catch (error) {
    console.log(error);
  }
});

router.get('/crear', (req, res)=>{
  res.render('crear')
});

router.post('/', async (req, res)=>{
  const body = req.body;
  console.log(body);
  try {
    const barDB = new Bar(body)
    await barDB.save()
    res.redirect('/bar')
  } catch (error) {
    console.log('error', error)
  }
});

router.get('/:id', async(req, res) => {
  const id = req.params.id
  try {
    const barDB = await Bar.findOne({_id: id})

    console.log(barDB)
    res.render('detalle', {
      bar: barDB,
      error:false
    })
  } catch (error) {
    console.log('Se ha producido una WEA')
    res.render('detalle', {
      error: true,
      mensaje: 'Bar mal'
    })
  }
});

router.delete('/:id', async(req, res) => {
  const id = req.params.id;
  console.log('_id desde backend', id);
  try {
    const barDB = await Bar.findByIdAndDelete({_id: id});
    console.log(barDB);
    if (!barDB) {
      res.json({
        estado: false,
        mensaje: 'No se puede eliminar el bar'
      });
    } else {
      res.json({
        estado: true,
        mensaje: 'Bar eliminado'
      });
    };
  } catch (error) {
    console.log(error);
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  console.log(id);
  console.log('body', body);
  try {
    const barDB = await Bar.findByIdAndUpdate(
      id, body, {useFindAndModify: false}
    )
    console.log(barDB)
    res.json({
      estado: true,
      mensaje: 'Bar editado'
    })
  } catch (error) {
    console.log(error);
    res.json({
      estado: false,
      mensaje: 'Problema al editar el bar'
    })
  }
})

module.exports = router;