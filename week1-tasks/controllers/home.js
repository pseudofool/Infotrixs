const home = (req, res) =>{
    // console.log(req.cookies);
    res.render('home', {
        title: 'Home',
        user: null
    });
}

module.exports = {
    home
}