const isLoggedIn = (req, res, next) => {
  console.log('Middleware', req.session)  
  if (req.session.loggedInUser) {
      //calls whatever is to be executed after the isLoggedIn function is over
      next()
  }
  else {
      res.status(401).json({
          message: 'Unauthorized user',
          code: 401,
      })
  };
};


module.exports = {
    isLoggedIn,
}