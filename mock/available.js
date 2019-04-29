module.exports = (req, res, next) => {
  const hasTopping = /toppings\/\d/.test(req.url);
  if(hasTopping) {
    res.send({
      available: Math.random() > .5
    })
    return;
  }
  next()
}
