function isAuthenticated(req, res, next) {
  // If there is a logged in user, we continue on the route.
  if (req.user) {
    next()
  } else {
    // If there is no user, we send an error and cut the response from the server.
    const error = new Error('You need to be logged in!')
    error.code = 401
    return next(error)
  }
}

function isAdminRole(req, res, next) {
  // If there is a user with role 'admin', we continue on the route.
  if (req.user.role === 'admin') {
    next()
  } else {
    // If there is no user with role admin, we send an error and cut the server response.
    const error = new Error('Forbidden route! You need to be an admin user!')
    error.code = 401
    return next(error)
  }
}

module.exports = {
  isAuthenticated,
  isAdminRole,
}
