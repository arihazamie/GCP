const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)

    const allowedOrigins = [
      /^https?:\/\/(localhost|127\.0\.0\.1)(:[0-9]+)?$/,
      process.env.FRONT_END_URL
    ]

    const isAllowed = allowedOrigins.some((allowedOrigin) => {
      if (allowedOrigin instanceof RegExp) return allowedOrigin.test(origin)

      return allowedOrigin === origin
    })

    if (isAllowed) callback(null, true)
    else callback(new Error('Not allowed by CORS'))
  },
  credentials: true
}

module.exports = corsOptions
